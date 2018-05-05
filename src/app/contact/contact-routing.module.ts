import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component:  ContactComponent
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
export class ContactRoutingModule { }

