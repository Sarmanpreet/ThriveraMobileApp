import { MenuIconComponent } from './menu-icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MenuIconComponent],
  exports: [MenuIconComponent]
})
export class MenuIconComponentModule { }
