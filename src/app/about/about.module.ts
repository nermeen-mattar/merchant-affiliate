import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxModule } from 'ngx-parallax';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from '../about/about.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    MaterialModule,
    TranslateModule.forChild(),
    ParallaxModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
