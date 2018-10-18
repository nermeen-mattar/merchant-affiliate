import { ContactComponent } from './contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxModule } from 'ngx-parallax';
import { FormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactService } from './contact.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    ParallaxModule
  ],
  providers: [ContactService],
  declarations: [ContactComponent]
})
export class ContactModule { }
