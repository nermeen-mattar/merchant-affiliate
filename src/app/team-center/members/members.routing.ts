import { RouterModule, Routes } from '@angular/router';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersComponent } from './members.component';

const memberRoutes: Routes = [
    {
        path: '',
        component: MembersComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: MembersListComponent
            }
            /* The event form component will be used for creating and form editing, creation if the path was /new, edit otherwise */
            // , {
            //     path: '/:id',
            //     component: EventFormComponent
            // }
        ]
    }

];

export const memberRouting = RouterModule.forChild(
    memberRoutes
);
