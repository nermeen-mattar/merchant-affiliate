import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ParallaxModule } from 'ngx-parallax';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild(),
    ParallaxModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
