import axios, { AxiosInstance } from 'axios';

export class ApiService {
  protected api: AxiosInstance;

  constructor(path: string) {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL ?? ''}/api/${path}`,
    });
  }
}
