import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatFormFieldModule,
   MatInputModule,  MatButtonModule, MatButtonToggleModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule,
   MatSidenavModule,
   MatListModule,
   MatMenuModule} from '@angular/material';

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
    MatIconModule,
  ]
})
export class MaterialModule { }
