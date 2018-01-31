import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams/teams.component';
import { TeamCenterComponent } from './team-center.component';
import { teamCenterRouting } from './team-center.routing';

@NgModule({
  imports: [
    CommonModule,
    teamCenterRouting
  ],
  declarations: [TeamsComponent, TeamCenterComponent]
})
export class TeamCenterModule { }
