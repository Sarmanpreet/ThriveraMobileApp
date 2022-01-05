import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedLocationsPage } from './saved-locations.page';

const routes: Routes = [
  {
    path: '',
    component: SavedLocationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedLocationsPageRoutingModule {}
