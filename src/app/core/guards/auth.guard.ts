import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
      console.log(this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      return true;
    }
    // not logged in so redirect to login page
    // this.router.navigate(['/']); // login
    return false;

  }
}
