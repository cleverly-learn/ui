/* eslint-disable @typescript-eslint/dot-notation */
import * as jose from 'jose';
import { AuthorizedApiService } from 'api/authorized-api.service';
import { authApiService } from 'api/auth/auth.api.service';
import { localStorage } from 'utils/local-storage';
import axios from 'axios';

describe('AuthorizedApiService', () => {
  const authorizedApiService = new AuthorizedApiService('');

  beforeEach(() => {
    axios.create = jest.fn();
  });

  describe('isTokenNotExpired', () => {
    it('When: Expired date greater than now. Expected: true', () => {
      jest.useFakeTimers().setSystemTime(new Date('2000-01-01 12:00:00'));

      const actual = authorizedApiService['isTokenNotExpired'](
        new Date('2000-01-01 12:00:01'),
      );

      expect(actual).toBe(true);
    });

    it('When: Expired date less than now. Expected: false', () => {
      jest.useFakeTimers().setSystemTime(new Date('2000-01-01 12:00:00'));

      const actual = authorizedApiService['isTokenNotExpired'](
        new Date('2000-01-01 11:59:59'),
      );

      expect(actual).toBe(false);
    });

    it('When: Expired date equals to now. Expected: false', () => {
      jest.useFakeTimers().setSystemTime(new Date('2000-01-01 12:00:00'));

      const actual = authorizedApiService['isTokenNotExpired'](
        new Date('2000-01-01 12:00:00'),
      );

      expect(actual).toBe(false);
    });
  });

  describe('refreshTokenIfNeededAndGet', () => {
    it('When: No accessToken in local storage. Expected: Error', async () => {
      jest.spyOn(localStorage, 'accessToken', 'get').mockReturnValue(null);
      jest.spyOn(localStorage, 'refreshToken', 'get').mockReturnValue('test');
      const decodeSpy = jest.spyOn(jose, 'decodeJwt');

      await expect(
        authorizedApiService['refreshTokenIfNeededAndGet'](),
      ).rejects.toThrow();
      expect(decodeSpy).not.toBeCalled();
    });

    it('When: No refreshToken in local storage. Expected: Error', async () => {
      jest.spyOn(localStorage, 'accessToken', 'get').mockReturnValue('test');
      jest.spyOn(localStorage, 'refreshToken', 'get').mockReturnValue(null);
      const decodeSpy = jest.spyOn(jose, 'decodeJwt');

      await expect(
        authorizedApiService['refreshTokenIfNeededAndGet'](),
      ).rejects.toThrow();
      expect(decodeSpy).not.toBeCalled();
    });

    it('When: No exp value inside token. Expected: Error', async () => {
      jest.spyOn(localStorage, 'accessToken', 'get').mockReturnValue('test');
      jest.spyOn(localStorage, 'refreshToken', 'get').mockReturnValue('test');
      const decodeSpy = jest.spyOn(jose, 'decodeJwt').mockReturnValue({});

      await expect(
        authorizedApiService['refreshTokenIfNeededAndGet'](),
      ).rejects.toThrow();
      expect(decodeSpy).toBeCalled();
    });

    it('When: Exp value provided and token is more than 15s to expire. Expected: accessToken, do not refresh', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2000-01-01 12:00:00'));
      jest.spyOn(localStorage, 'accessToken', 'get').mockReturnValue('test');
      jest.spyOn(localStorage, 'refreshToken', 'get').mockReturnValue('test');
      jest.spyOn(jose, 'decodeJwt').mockReturnValue({
        exp: new Date('2000-01-01 12:00:16').getTime() / 1000,
      });
      const refreshSpy = jest.spyOn(authApiService, 'refreshTokenPair');

      const actual = await authorizedApiService['refreshTokenIfNeededAndGet']();

      expect(actual).toBe('test');
      expect(refreshSpy).not.toBeCalled();
    });

    it('When: Exp value provided and token is less than 15s to expire. Expected: Refresh', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2000-01-01 12:00:00'));
      const accessSetSpy = jest
        .spyOn(localStorage, 'accessToken', 'set')
        .mockImplementation();
      const refreshSetSpy = jest
        .spyOn(localStorage, 'refreshToken', 'set')
        .mockImplementation();
      jest.spyOn(localStorage, 'accessToken', 'get').mockReturnValue('test');
      jest
        .spyOn(localStorage, 'refreshToken', 'get')
        .mockReturnValue('testRefresh');
      jest.spyOn(jose, 'decodeJwt').mockReturnValue({
        exp: new Date('2000-01-01 12:00:14').getTime() / 1000,
      });
      const refreshSpy = jest
        .spyOn(authApiService, 'refreshTokenPair')
        .mockResolvedValue({
          accessToken: 'newTest',
          refreshToken: 'newRefresh',
        });

      const actual = await authorizedApiService['refreshTokenIfNeededAndGet']();

      expect(actual).toBe('newTest');
      expect(refreshSpy).toBeCalledWith({ refreshToken: 'testRefresh' });
      expect(accessSetSpy).toBeCalledWith('newTest');
      expect(refreshSetSpy).toBeCalledWith('newRefresh');
    });
  });
});
