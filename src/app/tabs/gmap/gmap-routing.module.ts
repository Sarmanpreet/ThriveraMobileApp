import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GMapPage } from './gmap.page';

const routes: Routes = [
  {
    path: '',
    component: GMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GMapPageRoutingModule {}
