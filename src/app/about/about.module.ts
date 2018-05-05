import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxModule } from 'ngx-parallax';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from '../about/about.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    ParallaxModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
