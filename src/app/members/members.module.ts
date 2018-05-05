import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MembersService } from './services/members.service';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersComponent } from './members.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MembersRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [MembersService],
  declarations: [MembersListComponent, MembersComponent, MemberFormComponent]
})
export class MembersModule { }


