import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUserComponent } from './admin-user.component';
import { MemberSettingsComponent } from './components/member-settings/member-settings.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: AdminUserComponent,
    children: [
      {
          path: '',
          pathMatch: 'full',
          redirectTo: 'settings'
      },
      {
          path: 'settings',
          component: MemberSettingsComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule { }
