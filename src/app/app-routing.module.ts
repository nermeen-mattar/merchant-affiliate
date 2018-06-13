import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { TeamsComponent } from './teams/teams.component';
import { DirectLinksComponent } from './components/direct-links/direct-links.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UnderMaintenanceComponent } from './shared/components/under-maintenance/under-maintenance.component';
import { EmailActivationComponent } from './components/email-activation/email-activation.component';

/* The default route is the team center module but if the user is not logged in auth gaurd will redirect the user to the home */
const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    loadChildren: './events/events.module#EventsModule'
  },
  {
    path: 'members',
    canActivate: [AuthGuard],
    loadChildren: './members/members.module#MembersModule'
  },
  {
    path: 'teams',
    canActivate: [AuthGuard],
    loadChildren: './teams/teams.module#TeamsModule'
  },
  {
    path: 'member-user',
    canActivate: [AuthGuard],
    loadChildren: './member-user/member-user.module#MemberUserModule'
  },
  {
    path: 'admin-user',
    canActivate: [AuthGuard],
    loadChildren: './admin-user/admin-user.module#AdminUserModule'
  },
  {
    path: 'under-maintenance',
    component: UnderMaintenanceComponent
  },
  {
    path: 'activation',
    component: EmailActivationComponent
  },
  {
    path: 'team/:hash',
    component: DirectLinksComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
