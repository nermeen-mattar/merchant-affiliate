import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
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
  @Output() menuClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.$isUserLoggedIn = this.authService.$userLoggedIn;
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
