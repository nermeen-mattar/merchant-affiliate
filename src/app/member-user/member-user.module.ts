import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { MemberUserRoutingModule } from './member-user-routing.module';
import { MemberUserComponent } from './member-user.component';

@NgModule({
  imports: [
    CommonModule,
    MemberUserRoutingModule,
    TranslateModule,
    FormsModule,
    SharedModule
  ],
  declarations: [MemberUserComponent]
})
export class MemberUserModule { }