import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';

import { AvailableLanguageInfo } from './core/models/available-language-info.model';
import { availableLanguages, defaultLanguage, sysOptions } from './core/constants/i18n.constants';
import { UserService } from './core/services/user.service';
import { AuthService } from './auth/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'tc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appLanguage: string;
  $isUserLoggedIn: Observable < boolean > ;
  $isUserAdmin: Observable < boolean > ;
  menuOpened = false;
  appLanguages: AvailableLanguageInfo[];
  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.$isUserLoggedIn = this.authService.$userLoggedIn;
    this.$isUserAdmin =  this.userService.$userAdmin;
    this.initLanguageRelatedVariables();
    this.resetScrollOnRouteChange();
  }

  /**
   * @author Nermeen Mattar
   * @description sets the app languages property to a copy of the available languages. And gets the user preferable language for this
   * the priorites in order are: 1- local storage 2- browser language 3- default language from the code.
   */
  initLanguageRelatedVariables() {
    this.appLanguages = JSON.parse(JSON.stringify(availableLanguages)); // copying available languages object
    this.appLanguage = localStorage.getItem('lang');
    if (!this.appLanguage) {
      this.appLanguage = this.translate.getBrowserLang() || defaultLanguage;
    }
    this.appLanguage = this.getSuitableLanguage(this.appLanguage);
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
    this.translate.use(langCode);
    localStorage.setItem('lang', langCode);
  }

  /**
   * @author Nermeen Mattar
   * @description Logs the user out of the system
   */
  logout() {
    this.authService.logout();
  }
}
