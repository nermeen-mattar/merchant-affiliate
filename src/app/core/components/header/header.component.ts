import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { UserService } from './../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'tc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  $isUserLoggedIn: Observable<boolean>;
  $isUserAdmin: Observable<boolean>;
  menuOpened = false;
  @Output() menuClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.$isUserLoggedIn = this.authService.$userLoggedIn;
    this.$isUserAdmin =  this.userService.$userAdmin;
  }

  /**
   * @author Nermeen Mattar
   * @description logging out the logged in user
   */
  logout() {
    this.authService.logout();
  }

  /**
   * @author Nermeen Mattar
   * @description informs the parent component (app component) that the sidebar menu (small devices menu) is clicked and should be opened.
   * @param {Event} $event
   */
  onMenuClick($event: Event) {
    this.menuClicked.emit();
  }
}
