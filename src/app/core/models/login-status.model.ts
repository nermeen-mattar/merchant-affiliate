import { LoginResponse } from './../../auth/models/login-response.model';

export interface LoginStatus {
  isAuthorized: boolean;
  loginResponse?: LoginResponse;
}
