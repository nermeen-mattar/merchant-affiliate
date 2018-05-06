import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnderMaintenanceComponent } from './components/under-maintenance/under-maintenance.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [ConfirmDialogComponent, PageNotFoundComponent, UnderMaintenanceComponent],
  entryComponents: [ConfirmDialogComponent],
  exports: [
    MaterialModule,
    ConfirmDialogComponent,
    PageNotFoundComponent,
    UnderMaintenanceComponent
  ]
})
export class SharedModule { }
