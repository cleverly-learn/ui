class LocalStorage {
  private static ACCESS_TOKEN = 'accessToken';

  private static REFRESH_TOKEN = 'refreshToken';

  get accessToken() {
    return window.localStorage.getItem(LocalStorage.ACCESS_TOKEN);
  }

  set accessToken(value: string | null) {
    if (value) {
      window.localStorage.setItem(LocalStorage.ACCESS_TOKEN, value);
    }
  }

  get refreshToken() {
    return window.localStorage.getItem(LocalStorage.REFRESH_TOKEN);
  }

  set refreshToken(value: string | null) {
    if (value) {
      window.localStorage.setItem(LocalStorage.REFRESH_TOKEN, value);
    }
  }
}

export const localStorage = new LocalStorage();
