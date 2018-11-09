import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'data-privacy',
    component: DataPrivacyComponent
  },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamCenterInfoRoutingModule { }
