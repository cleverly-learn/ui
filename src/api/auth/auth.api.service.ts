import { ApiService } from 'api/api.service';
import { TokenPair } from 'api/auth/types/token-pair.interface';

class AuthApiService extends ApiService {
  constructor() {
    super('auth');
  }

  login(payload: { login: string; password: string }): Promise<TokenPair> {
    return this.api.post<TokenPair>('login', payload).then(({ data }) => data);
  }

  refreshTokenPair(payload: { refreshToken: string }): Promise<TokenPair> {
    return this.api
      .post<TokenPair>('refresh', payload)
      .then(({ data }) => data);
  }

  async revokeRefreshToken(payload: { refreshToken: string }): Promise<void> {
    await this.api.post('revoke', payload);
  }
}

export const authApiService = new AuthApiService();
