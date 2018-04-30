import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { TeamsComponent } from './teams.component';

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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
