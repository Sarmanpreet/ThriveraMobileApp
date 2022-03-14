import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,


    SharedModule,
    FormsModule
  ],
  declarations: []
})
export class ProfilePageModule { }
