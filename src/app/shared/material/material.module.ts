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
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material';

export class MyDateAdapter extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
  getDayOfWeekNames(): string[] {
    return ['M', 'D', 'M', 'D', 'F', 'S', 'S'];
  }
  getMonthNames(): string[] {
    return ['JAN', 'FEB', 'MÄR', 'APR', 'KANN', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'DEZ'];
  }
}
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


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
  providers: [ {provide: DateAdapter, useClass: MyDateAdapter}, 
    // {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'ar-SA'},


  ]
})
export class MaterialModule {}
