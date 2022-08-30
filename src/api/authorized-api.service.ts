import { ApiService } from 'api/api.service';
import { authApiService } from 'api/auth/auth.api.service';
import { decodeJwt } from 'jose';
import { differenceInSeconds, subSeconds } from 'date-fns';
import { localStorage } from 'utils/local-storage';

export class AuthorizedApiService extends ApiService {
  constructor(path: string) {
    super(path);

    this.api.interceptors.request.use(async (config) => {
      const accessToken = await this.refreshTokenIfNeededAndGet();

      if (config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  }

  private async refreshTokenIfNeededAndGet(): Promise<string> {
    const { accessToken, refreshToken } = localStorage;

    if (!accessToken || !refreshToken) {
      throw new Error('No tokens inside local storage');
    }

    const { exp } = decodeJwt(accessToken);

    if (exp && this.isTokenNotExpired(subSeconds(new Date(exp * 1000), 15))) {
      return accessToken;
    }

    const pair = await authApiService.refreshTokenPair({ refreshToken });

    localStorage.accessToken = pair.accessToken;
    localStorage.refreshToken = pair.refreshToken;

    return pair.accessToken;
  }

  private isTokenNotExpired(expiresAt: Date): boolean {
    return differenceInSeconds(expiresAt, new Date()) > 0;
  }
}
