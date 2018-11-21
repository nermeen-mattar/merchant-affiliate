import { DealFormComponent } from './components/deal-form/deal-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventsComponent } from './events.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'create',
        component: DealFormComponent
      },
      {
        path: 'list/details/:eventId',
        component: EventDetailsComponent
      },
      {
        path: ':eventId',
        component: EventFormComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
