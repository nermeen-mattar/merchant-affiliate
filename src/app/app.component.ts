import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';

import { UserService } from './core/services/user.service';
import { availableLanguages, defaultLanguage, sysOptions } from './core/constants/i18n.constants';
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
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.$isUserLoggedIn = this.authService.$userLoggedIn;
    this.$isUserAdmin =  this.userService.$userAdmin;
    const browserLanguage = this.translate.getBrowserLang() || defaultLanguage;
    this.appLanguage = this.getSuitableLanguage(browserLanguage);
    this.translate.use(this.appLanguage);
    sysOptions.systemLanguage = this.appLanguage;
    this.resetScrollOnRouteChange();
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

    return availableLanguages.some(lang => (lang.code === language)) ? language : defaultLanguage;
  }

  /**
   * @author Nermeen Mattar
   * @description Logs the user out of the system
   */
  logout() {
    this.authService.logout();
  }
}
