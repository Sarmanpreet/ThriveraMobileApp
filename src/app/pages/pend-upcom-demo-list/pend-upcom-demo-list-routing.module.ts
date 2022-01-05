import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendUpcomDemoListPage } from './pend-upcom-demo-list.page';

const routes: Routes = [
  {
    path: '',
    component: PendUpcomDemoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendUpcomDemoListPageRoutingModule {}
