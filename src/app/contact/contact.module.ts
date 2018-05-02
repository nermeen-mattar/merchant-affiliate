import { ContactComponent } from './contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxModule } from 'ngx-parallax';
import { FormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactRoutingModule,
    MaterialModule,
    TranslateModule.forChild(),
    ParallaxModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
