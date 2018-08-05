import { LoginStatus } from './core/models/login-status.model';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { MatIconRegistry } from '@angular/material';

import { AvailableLanguageInfo } from './core/models/available-language-info.model';
import { availableLanguages, defaultLanguage, sysOptions } from './core/constants/i18n.constants';
import { UserService } from './core/services/user.service';
import { LoginStatusService } from './auth/services/login-status.service';
import { Router, NavigationEnd } from '@angular/router';
import { TeamsService } from './core/services/teams.service';
import { roles } from './core/constants/roles.constants';
@Component({
  selector: 'tc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appLanguage: string;
  $isUserLoggedIn: Observable < LoginStatus > ;
  menuOpened = false;
  appLanguages: AvailableLanguageInfo[];
  selectedLanguageCode: string;
  hasAdminRole: boolean;
  constructor(
    teamsService: TeamsService,
    public translate: TranslateService,
    private loginStatusService: LoginStatusService,
    private router: Router,
    userService: UserService,
    public matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    this.resetScrollOnRouteChange();
    this.initLanguageRelatedVariables();
    this.$isUserLoggedIn = this.loginStatusService.$userLoginState;
    this.$isUserLoggedIn.subscribe(loggedIn => {
      if (loggedIn.isAuthorized) {
        this.hasAdminRole = teamsService.hasAdminRole();
      } else {
        this.resetData();
      }
    });
  }

  /**
   * @author Nermeen Mattar
   * @description sets the app languages property to a copy of the available languages. And gets the user preferable language for this
   * the priorites in order are: 1- local storage 2- browser language 3- default language from the code.
   */
  initLanguageRelatedVariables() {
    this.appLanguages = JSON.parse(JSON.stringify(availableLanguages)); // copying available languages object
    this.selectedLanguageCode = localStorage.getItem('lang');
    if (!this.selectedLanguageCode) {
      this.selectedLanguageCode = this.translate.getBrowserLang() || defaultLanguage;
    }
    this.appLanguage = this.getSuitableLanguage(this.selectedLanguageCode);
    this.translate.use(this.appLanguage);
    sysOptions.systemLanguage = this.appLanguage;
  }

  /**
   * @author Nermeen Mattar
   * @description Scrolls to top on Route Change
   */
  resetScrollOnRouteChange() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  /**
   * @author Ahsan Ayaz
   * @param language - two letter country code, e.g. 'en'
   * @return {String} the suitable language
   */
  getSuitableLanguage(language): string {
    language = language.substring(0, 2).toLowerCase();

    return this.appLanguages.some(lang => (lang.code === language)) ? language : defaultLanguage;
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
   * @description Logs the user out of the system
   */
  logout() {
    this.loginStatusService.loginState.next({ isAuthorized: false, logoutResponse: true});
  }
  /**
   * @author Nermeen Mattar
   * @description resets the class variables
   */
  resetData() {
    this.hasAdminRole = null;
  }
}
