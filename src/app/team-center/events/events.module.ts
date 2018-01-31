import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule
  ],
  declarations: [EventsListComponent, EventsComponent]
})
export class EventsModule { }


