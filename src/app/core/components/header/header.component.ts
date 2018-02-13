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

  // TODO[nermeen]: add method level comment
  logout() {
    this.authService.logout();
  }

  // TODO[nermeen]: add method level comment
  onMenuClick($event) {
    $event.stopPropagation();
    this.menuClicked.emit();
  }

}
