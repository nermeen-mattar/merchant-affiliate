import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnderMaintenanceComponent } from './components/under-maintenance/under-maintenance.component';
import { StringNormalizerPipe } from './pipes/string-normalizer/string-normalizer.pipe';
import { LocalizedTextModifierPipe } from './pipes/localized-text-modifier/localized-text-modifier.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [ConfirmDialogComponent, PageNotFoundComponent, UnderMaintenanceComponent, StringNormalizerPipe, LocalizedTextModifierPipe],
  entryComponents: [ConfirmDialogComponent], /* why !!! */
  exports: [
    MaterialModule,
    ConfirmDialogComponent,
    PageNotFoundComponent,
    UnderMaintenanceComponent,
    LocalizedTextModifierPipe,
    StringNormalizerPipe
  ]
})
export class SharedModule { }
