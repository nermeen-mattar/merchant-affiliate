import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { NewDealComponent } from './new-deal/new-deal.component';
import { NgxDealDetailsComponent } from '../ngx-deal-details/ngx-deal-details.component';
// Services
import { DealApi } from '../../sdk';

const PAGES_COMPONENTS = [
  PagesComponent,
  NewDealComponent,
  NgxDealDetailsComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    FormsModule,
    ReactiveFormsModule,
    // NbSelectModule
    // NbButtonModule,
  ],
  providers: [DealApi],
  declarations: [...PAGES_COMPONENTS],
})
export class PagesModule {}
