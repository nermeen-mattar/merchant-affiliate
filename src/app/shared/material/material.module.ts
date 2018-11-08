import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatOptionModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatDialogModule,
  MatStepperModule,
  MatExpansionModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatTabsModule,
  DateAdapter,
  NativeDateAdapter, 
  // MAT_DATE_FORMATS,
  // MAT_DATE_LOCALE
} from '@angular/material';
import { TcDateAdapter } from '../classes/tc-date-adapter';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDialogModule,
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  providers: [ 
    {provide: DateAdapter, useClass: TcDateAdapter}, 
    // {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    // {provide: MAT_DATE_LOCALE, useValue: 'ar-SA'},


  ]
})
export class MaterialModule {}
