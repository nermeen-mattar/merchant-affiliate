import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* The default route is the team center module but if the user is not logged in auth gaurd will redirect the user to the home */
const routes: Routes = [
  {
    path: '',
    loadChildren: './team-center/team-center.module#TeamCenterModule',
    // canActivate: [AuthGuard] to be implemented
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
