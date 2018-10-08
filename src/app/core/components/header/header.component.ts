import { MembersService } from './../../../members/services/members.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { availableLanguages } from './../../constants/i18n.constants';
import { AvailableLanguageInfo } from '../../models/available-language-info.model';
import { TeamsService } from '../../services/teams.service';
import { LoginStatusService } from '../../../auth/services/login-status.service';

@Component({
  selector: 'tc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  $isUserLoggedIn: Observable<boolean>;
  menuOpened = false;
  appLanguages: AvailableLanguageInfo[];
  selectedLanguageCode: string;
  hasAdminRole: boolean;
  @Output() menuClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(public translate: TranslateService, private loginStatusService: LoginStatusService,
    private membersService: MembersService,
    teamService: TeamsService) {
      this.appLanguages = availableLanguages;
    this.$isUserLoggedIn = this.loginStatusService.$userLoginState;
    this.$isUserLoggedIn.subscribe( isLoggedIn => {
      if (isLoggedIn) {
        this.hasAdminRole = teamService.hasAdminRole();
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
    this.loginStatusService.logout();
  }

  /**
   * @author Nermeen Mattar
   * @description uses the translate service to update the language and updates the language in the local storage
   * @param {string} langCode
   */
  languageSelected(langCode: string) {
    this.selectedLanguageCode = langCode;
    this.translate.use(langCode);
    if (this.loginStatusService.getCurrentUserLoginState()) {
      this.membersService.updateMemberLanguage(langCode);
    }
    localStorage.setItem('lang', langCode);
  }

  /**
   * @author Nermeen Mattar
   * @description informs the parent component (app component) that the sidebar menu (small devices menu) is clicked and should be opened.
   * @param {Event} $event
   */
  onMenuClick() {
    this.menuClicked.emit();
  }

  /**
   * @author Nermeen Mattar
   * @description resets the class variables
   */
  resetData() {
    this.hasAdminRole = null;
  }
}
