import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { TeamCenterComponent } from './team-center.component';

const teamCenterRoutes: Routes = [
    {
        path: '',
        component: TeamCenterComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'events'
            },
            /*Dividing into feature modules, each a cohesive block of code dedicated to an application domain or set of capabilities.*/
            {
                path: 'events',
               loadChildren: './events/events.module#EventsModule'
            },
            {
                path: 'members',
                loadChildren: './members/members.module#MembersModule'
            },
            {
                path: 'teams',
                component: TeamsComponent
            }
        ]
    }

];

export const teamCenterRouting = RouterModule.forChild(
    teamCenterRoutes
);
