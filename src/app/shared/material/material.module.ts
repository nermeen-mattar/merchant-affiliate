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
  NativeDateAdapter
} from '@angular/material';

export class MyDateAdapter extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
}

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
  providers: [ {provide: DateAdapter, useClass: MyDateAdapter}]
})
export class MaterialModule {}
