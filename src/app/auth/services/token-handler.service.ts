import { Injectable } from '@angular/core';
import { TokenAuthinitication } from '../../../environments/environment';

@Injectable()
export class TokenHandlerService {

  constructor() { }
  private getPayload(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  isTokenValid(token: string) {
    if (!token || token  === '' ) {
      return false;
    }
    const TokenExpirationLong = TokenAuthinitication.TokenExpirationDaysLong;
    const payload = this.getPayload(token);
    const expirationDate = +(payload.exp + '000'); // produces NaN case
    const currentDate = + Date.now();
    const dateDiff = expirationDate - currentDate;
    return !dateDiff || dateDiff > 0 ? true : false; // the or statement will be removed after fixing the NaN case

  }
}
