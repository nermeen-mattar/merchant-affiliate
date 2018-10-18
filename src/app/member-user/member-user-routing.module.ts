import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberUserComponent } from './member-user.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MemberUserComponent,
    children: [
      {
          path: '',
          pathMatch: 'full',
          redirectTo: 'switch-to-admin'
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
export class MemberUserRoutingModule { }
