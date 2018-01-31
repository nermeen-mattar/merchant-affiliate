import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ParallaxModule } from 'ngx-parallax';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MaterialModule,
    TranslateModule.forChild(),
    ParallaxModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
