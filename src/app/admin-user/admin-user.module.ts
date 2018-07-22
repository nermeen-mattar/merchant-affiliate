import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { AdminUserRoutingModule } from './admin-user-routing.module';
import { AdminUserComponent } from '../admin-user/admin-user.component';
import { MemberSettingsComponent } from './components/member-settings/member-settings.component';

@NgModule({
  imports: [
    CommonModule,
    AdminUserRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [AdminUserComponent, MemberSettingsComponent]
})
export class AdminUserModule { }
