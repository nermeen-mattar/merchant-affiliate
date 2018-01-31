import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersComponent } from './members.component';
import { memberRouting } from './members.routing';

@NgModule({
  imports: [
    CommonModule,
    memberRouting
  ],
  declarations: [MembersListComponent, MembersComponent]
})
export class MembersModule { }
