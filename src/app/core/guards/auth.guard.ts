import { LoginStatusService } from './../../auth/services/login-status.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../auth/services/auth.service';

/**
 *
 * @author Nermeen Mattar
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 * @description If the user is authenticated it prevents visiting auth module and if not authenticated prevents visiting account
 * based pages. It also navigates to the correct module in case the user is manually changing the route and can activate is false.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private loginStatusService: LoginStatusService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
    if (this.loginStatusService.isAuthenticated()) { // when the user is logged in
      if (state.url.indexOf('auth') > -1 ) {
        if (this.router.routerState.snapshot.url === '') {
          this.router.navigateByUrl('events'); // when manually changing the route to a wrong route or to a non account based page.
        }
        return false;
      } else {
        return true;
      }
    } else {  // when the user is not logged in
      if (state.url.indexOf('auth') > -1 ) {
        return true;
      } else {
        if (this.router.routerState.snapshot.url === '') {
          this.router.navigateByUrl('home'); // when manually changing the route to a wrong route or to an account based page.
        }
        return false;
      }
    }
  }
}
