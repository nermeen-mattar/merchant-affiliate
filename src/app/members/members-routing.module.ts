import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersStatisticsComponent } from './components/members-statistics/members-statistics.component';
import { AddMemberFormComponent } from './components/add-member-form/add-member-form.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersComponent } from './members.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { MemberStatisticsDetailsComponent } from './components/member-statistics-details/member-statistics-details.component';

const routes: Routes = [{
  path: '',
  component: MembersComponent,
  children: [{
      path: '',
      pathMatch: 'full',
      redirectTo: 'list'
    },
    {
      path: 'list',
      component: MembersListComponent
    },
    {
      path: 'statistics',
      component: MembersStatisticsComponent
    },
    {
      path: 'statistics/details/:memberId/:action-type',
      component: MemberStatisticsDetailsComponent
    },
    /* The member form component will be used for creating and form editing, creation if the path was /new, edit otherwise */
    {
      path: 'list/add-member',
      component: AddMemberFormComponent
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {}
