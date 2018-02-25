import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { EventsListComponent } from './events-list/events-list.component';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { MaterialModule } from './../shared/material/material.module';
import { EventsService } from './services/events.service';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    EventsListComponent,
    EventsComponent,
    EventDetailsComponent
  ],
  providers: [EventsService]
})
export class EventsModule { }


