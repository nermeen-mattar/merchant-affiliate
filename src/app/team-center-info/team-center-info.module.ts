import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxModule } from 'ngx-parallax';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { TeamCenterInfoRoutingModule } from './team-center-info-routing.module';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  imports: [
    CommonModule,
    TeamCenterInfoRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    ParallaxModule
  ],
  declarations: [AboutComponent, TermsAndConditionsComponent]
})
export class TeamCenterInfoModule { }
