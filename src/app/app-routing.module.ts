import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UnderMaintenanceComponent } from './shared/components/under-maintenance/under-maintenance.component';
import { EmailActivationComponent } from './components/email-activation/email-activation.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MemberActivationFormComponent } from './components/member-activation-form/member-activation-form.component';

/* The default route is the team center module but if the user is not logged in auth gaurd will redirect the user to the home */
const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule'
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
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
    path: 'my-giveaways',
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
  /* the route for the three following component should be followed by ?h=the-hash-value
  else the page not found component will be displayed */
  {
    path: 'activation',
    component: EmailActivationComponent
  },
  {
    path: 'setuppassword',
    component: MemberActivationFormComponent
  },
  {
    path: 'invitation',
    component: MemberActivationFormComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
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
