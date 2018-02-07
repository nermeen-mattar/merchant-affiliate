import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLoggedIn: Boolean;
  userStateSubscription: Subscription;
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.isUserLoggedIn = this.authService.isAuthenticated();
    this.userStateSubscription = this.authService.userStateChanges().subscribe((res) => {
      this.isUserLoggedIn = res;
    });
  }
  logout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userStateSubscription.unsubscribe();
  }
}
