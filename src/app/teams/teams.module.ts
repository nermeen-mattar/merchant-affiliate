import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    TranslateModule,
    FormsModule,
    SharedModule
  ],
  declarations: [TeamsComponent, TeamsListComponent]
})
export class TeamsModule { }
