import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [TeamsComponent, TeamsListComponent, ManageTeamComponent]
})
export class TeamsModule { }
