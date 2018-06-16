import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUserComponent } from './admin-user.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
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
          component: AdminSettingsComponent
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
