import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,

    TranslateModule
  ],
  declarations: [ConfirmDialogComponent],
  exports: [
    MaterialModule,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
