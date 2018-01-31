import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams/teams.component';
import { TeamCenterComponent } from './team-center.component';
import { TeamCenterRoutingModule } from './team-center-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TeamCenterRoutingModule
  ],
  declarations: [TeamsComponent, TeamCenterComponent]
})
export class TeamCenterModule { }


