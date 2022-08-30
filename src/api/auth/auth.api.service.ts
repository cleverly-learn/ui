import { ApiService } from 'api/api.service';
import { TokenPair } from 'api/auth/types/token-pair.interface';

class AuthApiService extends ApiService {
  constructor() {
    super('auth');
  }

  login(payload: { login: string; password: string }): Promise<TokenPair> {
    return this.api.post<TokenPair>('login', payload).then(({ data }) => data);
  }
}

export const authApiService = new AuthApiService();
