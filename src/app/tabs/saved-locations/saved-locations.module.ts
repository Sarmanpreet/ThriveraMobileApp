import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedLocationsPageRoutingModule } from './saved-locations-routing.module';

import { SavedLocationsPage } from './saved-locations.page';
import { MapModalComponentModule } from 'src/app/components/map-modal/map-modal.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedLocationsPageRoutingModule,
    MapModalComponentModule,
    SharedModule
  ],
  declarations: [SavedLocationsPage]
})
export class SavedLocationsPageModule {}
