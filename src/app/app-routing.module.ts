import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { TeamsComponent } from './teams/teams.component';

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
    path: 'teams',
    canActivate: [AuthGuard],
    loadChildren: './teams/teams.module#TeamsModule'
  }, {
    path: '**',
    redirectTo: 'events'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
