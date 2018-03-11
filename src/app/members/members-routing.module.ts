import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberFormComponent } from './member-form/member-form.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersComponent } from './members.component';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    children: [
      {
          path: '',
          pathMatch: 'full',
          redirectTo: 'list'
      },
      {
          path: 'list',
          component: MembersListComponent
      }
      /* The member form component will be used for creating and form editing, creation if the path was /new, edit otherwise */
      , {
          path: 'list/:memberId',
          component: MemberFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
