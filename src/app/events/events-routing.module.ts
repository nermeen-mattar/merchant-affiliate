import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsComponent } from './events.component';


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
              path: 'list',
              component: EventsListComponent
          }
          /* The event form component will be used for creating and form editing, creation if the path was /new, edit otherwise */
          // , {
          //     path: '/:id',
          //     component: EventFormComponent
          // }
      ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
