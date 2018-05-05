import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventsService } from './services/events.service';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { SharedModule } from '../shared/shared.module';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DeviceDetectorModule
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


