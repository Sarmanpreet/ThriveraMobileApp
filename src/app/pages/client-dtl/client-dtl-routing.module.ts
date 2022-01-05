import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDtlPage } from './client-dtl.page';

const routes: Routes = [
  {
    path: '',
    component: ClientDtlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDtlPageRoutingModule {}
