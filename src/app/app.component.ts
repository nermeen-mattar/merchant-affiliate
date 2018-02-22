import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { availableLanguages, defaultLanguage, sysOptions } from './core/constants/i18n.constants';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'tc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appLanguage: string;
  $isUserLoggedIn: Observable<boolean>;
  menuOpened = false;
  constructor(private translate: TranslateService, private authService: AuthService) {}

  ngOnInit() {
    this.$isUserLoggedIn = this.authService.$userLoggedIn;
    const browserLanguage = this.translate.getBrowserLang() || defaultLanguage;
    this.appLanguage = this.getSuitableLanguage(browserLanguage);
    this.translate.use(this.appLanguage);
    sysOptions.systemLanguage = this.appLanguage;
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
