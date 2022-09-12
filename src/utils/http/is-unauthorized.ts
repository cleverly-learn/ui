import { AxiosError } from 'axios';
import { HttpStatus } from 'enums/http-status.enum';

export function isUnauthorized(error: AxiosError): boolean {
  return error?.response?.status === HttpStatus.UNAUTHORIZED;
}
