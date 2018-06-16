import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { availableLanguages } from './../../constants/i18n.constants';
import { UserService } from './../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AvailableLanguageInfo } from '../../models/available-language-info.model';
import { TeamsService } from '../../services/teams.service';
import { roles } from '../../constants/roles.constants';

@Component({
  selector: 'tc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  $isUserLoggedIn: Observable<boolean>;
  isUserAdmin: boolean;
  menuOpened = false;
  appLanguages: AvailableLanguageInfo[];
  selectedLanguageCode: string;
  hasAdminRole: boolean;
  @Output() menuClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(public translate: TranslateService, private authService: AuthService, private userService: UserService,
    teamService: TeamsService) {
      this.appLanguages = availableLanguages;
    this.$isUserLoggedIn = this.authService.$userLoggedIn;
    this.$isUserLoggedIn.subscribe( loggedIn => {
      if (loggedIn) {
        this.hasAdminRole = teamService.hasAdminRole();
        this.isUserAdmin =  this.userService.userType === roles.admin;
      } else {
        this.resetData();
      }
    });
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
   * @description uses the translate service to update the language and updates the language in the local storage
   * @param {string} langCode
   */
  languageSelected(langCode: string) {
    this.selectedLanguageCode = langCode;
    this.translate.use(langCode);
    localStorage.setItem('lang', langCode);
  }

  /**
   * @author Nermeen Mattar
   * @description informs the parent component (app component) that the sidebar menu (small devices menu) is clicked and should be opened.
   * @param {Event} $event
   */
  onMenuClick($event: Event) {
    this.menuClicked.emit();
  }

  /**
   * @author Nermeen Mattar
   * @description resets the class variables
   */
  resetData() {
    this.hasAdminRole = null;
    this.isUserAdmin = null;
  }
}
