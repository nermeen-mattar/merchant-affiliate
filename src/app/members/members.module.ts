import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersComponent } from './members.component';
import { MembersRoutingModule } from './members-routing.module';
import { AddMemberFormComponent } from './components/add-member-form/add-member-form.component';
import { SharedModule } from '../shared/shared.module';
import { MembersStatisticsComponent } from './components/members-statistics/members-statistics.component';
import { MemberStatisticsDetailsComponent } from './components/member-statistics-details/member-statistics-details.component';

@NgModule({
  imports: [
    CommonModule,
    MembersRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [MembersListComponent, MembersComponent, AddMemberFormComponent, MembersStatisticsComponent, MemberStatisticsDetailsComponent]
})
export class MembersModule { }


