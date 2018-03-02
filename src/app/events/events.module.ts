import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { EventsListComponent } from './events-list/events-list.component';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { MaterialModule } from './../shared/material/material.module';
import { EventsService } from './services/events.service';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventFormComponent } from './event-form/event-form.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EventsListComponent,
    EventsComponent,
    EventDetailsComponent,
    EventFormComponent
  ],
  providers: [EventsService]
})
export class EventsModule { }


