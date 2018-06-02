import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberFormComponent } from './components/member-form/member-form.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersComponent } from './members.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { MembersStatisticsComponent } from './components/members-statistics/members-statistics.component';
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
    }
    /* The member form component will be used for creating and form editing, creation if the path was /new, edit otherwise */
    , {
      path: 'list/:memberId',
      component: MemberFormComponent
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
