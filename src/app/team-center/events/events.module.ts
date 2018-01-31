import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsComponent } from './events.component';
import { eventsRouting } from './events.routing';

@NgModule({
  imports: [
    CommonModule,
    eventsRouting
  ],
  declarations: [EventsListComponent, EventsComponent]
})
export class EventsModule { }
