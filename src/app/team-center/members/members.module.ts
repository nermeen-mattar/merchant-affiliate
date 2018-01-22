import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersComponent } from './components/members.component';
import { memberRouting } from './members.routing';

@NgModule({
  imports: [
    CommonModule,
    memberRouting
  ],
  declarations: [MembersListComponent, MembersComponent]
})
export class MembersModule { }
