import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'tc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  $isUserLoggedIn: Observable<boolean>;
  menuOpened = false;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.$isUserLoggedIn = this.authService.$userLoggedIn;
  }
  logout() {
    this.authService.logout();
  }
  changeMenuDisplay($event) {
    this.menuOpened = $event.target.className.indexOf('app-header__toggle__button') ? !this.menuOpened : false;
  }
}
