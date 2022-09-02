class LocalStorage {
  private static ACCESS_TOKEN = 'accessToken';

  private static REFRESH_TOKEN = 'refreshToken';

  private setValue(key: string, value: string | null): void {
    if (value) {
      window.localStorage.setItem(key, value);
      return;
    }
    if (value === null) {
      window.localStorage.removeItem(key);
    }
  }

  get accessToken() {
    return window.localStorage.getItem(LocalStorage.ACCESS_TOKEN);
  }

  set accessToken(value: string | null) {
    this.setValue(LocalStorage.ACCESS_TOKEN, value);
  }

  get refreshToken() {
    return window.localStorage.getItem(LocalStorage.REFRESH_TOKEN);
  }

  set refreshToken(value: string | null) {
    this.setValue(LocalStorage.REFRESH_TOKEN, value);
  }
}

export const localStorage = new LocalStorage();
