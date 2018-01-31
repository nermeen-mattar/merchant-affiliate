import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsComponent } from './events.component';

const eventsRoutes: Routes = [
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

export const eventsRouting = RouterModule.forChild(
    eventsRoutes
);
