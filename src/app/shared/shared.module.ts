import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnderMaintenanceComponent } from './components/under-maintenance/under-maintenance.component';
import { StringNormalizerPipe } from './pipes/string-normalizer/string-normalizer.pipe';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { LocalizedTextModifierPipe } from './pipes/localized-text-modifier/localized-text-modifier.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    ConfirmDialogComponent,
    PageNotFoundComponent,
    UnderMaintenanceComponent,
    StringNormalizerPipe,
    LocalizedTextModifierPipe,
    NewPasswordComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [
    MaterialModule,
    ConfirmDialogComponent,
    PageNotFoundComponent,
    UnderMaintenanceComponent,
    LocalizedTextModifierPipe,
    StringNormalizerPipe,
    NewPasswordComponent
  ]
})
export class SharedModule { }