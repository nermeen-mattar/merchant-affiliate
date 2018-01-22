import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsComponent } from './components/events.component';
import { eventsRouting } from './events.routing';

@NgModule({
  imports: [
    CommonModule,
    eventsRouting
  ],
  declarations: [EventsListComponent, EventsComponent]
})
export class EventsModule { }
