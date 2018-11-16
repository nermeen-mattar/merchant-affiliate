
import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, themeService: NbThemeService) {
    themeService.changeTheme('default');
  }

  ngOnInit() {
    
    this.analytics.trackPageViews();
  }
}
