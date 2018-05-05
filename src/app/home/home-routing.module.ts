import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
const routes: Routes = [{
    path: '',
    component: HomeComponent,
    // will be uncommented if confirmed that about component goes in the same module with home
    // component, if yes then maybe we should rename HomeModule to something like PublicModule
    // children: [
    //     {
    //         path: '',
    //         pathMatch: 'full',
    //         redirectTo: 'home'
    //      },
    //     {
    //         path: 'about',
    //         component: AboutComponent
    //     }
    // ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
