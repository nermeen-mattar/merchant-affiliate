import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


export class AuthServiceMock {
  isLoggedIn: BehaviorSubject < boolean > = new BehaviorSubject(false);
  $userLoggedIn: Observable < boolean > = this.isLoggedIn.asObservable();
  constructor(
  ) {
  }

  login(userCredentials) {
  }

  logout() {
  }

  isAuthenticated(): boolean {
    return true;
  }

  getLoginResponseFromStorage() {
    return JSON.parse(localStorage.getItem('login-response'));
  }

  private addTokenToHttpHeader() {
  }

  setLoggedInUserInfo(userInfo) {
  }
  clearLoggedInUserInfo() {}
}
