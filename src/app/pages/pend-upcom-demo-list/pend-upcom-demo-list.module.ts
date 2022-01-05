import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendUpcomDemoListPageRoutingModule } from './pend-upcom-demo-list-routing.module';

import { PendUpcomDemoListPage } from './pend-upcom-demo-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendUpcomDemoListPageRoutingModule
  ],
  declarations: [PendUpcomDemoListPage]
})
export class PendUpcomDemoListPageModule {}
