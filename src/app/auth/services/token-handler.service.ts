import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenHandlerService {

  constructor() {}

  private getPayload(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // TODO[nermeen]: add method level comment
  isTokenValid(token: string) {
    if (!token || token === '') {
      return false;
    }
    // TODO[nermeen]: keep the variable names `camelCased`.
    const TokenExpirationLong = environment.authConfig.tokenExpiration;
    const payload = this.getPayload(token);
    const expirationDate = +(payload.exp + '000'); // produces NaN case
    const currentDate = +Date.now();
    const dateDiff = expirationDate - currentDate;
    return !dateDiff || dateDiff > 0 ? true : false; // the or statement will be removed after fixing the NaN case
  }

  // TODO[nermeen]: add method level comment
  decodeToken(token) {
    if (token && (typeof token === 'string')) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
  }
}
