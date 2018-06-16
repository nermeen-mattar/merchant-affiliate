import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { TeamsComponent } from './teams.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [{
  path: '',
  component: TeamsComponent,
  children: [{
      path: '',
      pathMatch: 'full',
      redirectTo: 'list'
    },
    {
      path: 'list',
      component: TeamsListComponent
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
export class TeamsRoutingModule {}
