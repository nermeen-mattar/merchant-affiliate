import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
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
export class AboutRoutingModule { }
