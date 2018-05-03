import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUserComponent } from './admin-user.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule { }
