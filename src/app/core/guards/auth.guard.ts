import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';

/**
 *
 * @author Nermeen Mattar
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 * @description If the user is authenticated it prevents visiting auth or home module and if not authenticated prevents
 *  visiting account based pages. Moreover, it navigates to the correct module in case the user is manually changing the
 *  route and can activate is false.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
    if (this.authService.isAuthenticated()) { // if the user is logged in
      if (state.url.indexOf('home') > -1  || state.url.indexOf('auth') > -1 ) {
        if (this.router.routerState.snapshot.url === '') {
          this.router.navigateByUrl('events'); // when manually changing the route to a wrong route or to a non account based page.
        }
        return false;
      } else {
        return true;
      }
    } else {  // if the user is not logged in
      if (state.url.indexOf('home') > -1  || state.url.indexOf('auth') > -1 ) {
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
