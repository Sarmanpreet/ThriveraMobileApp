import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { GMapPageRoutingModule } from './gmap-routing.module';

import { GMapPage } from './gmap.page';
import { MenuIconComponentModule } from 'src/app/components/menu-icon/menu-icon.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuIconComponentModule,
    GMapPageRoutingModule,
    /* angular google map (agm/core) plugin */
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSkijnsnCVWqaNxwjSROoB0cpJM8Nv0TI',
      libraries: ['places']
    }),
  ],
  declarations: [GMapPage]
})
export class GMapPageModule {}
