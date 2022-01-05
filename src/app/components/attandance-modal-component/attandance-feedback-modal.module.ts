import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { AttandanceModalComponentComponent } from './attandance-modal-component.component';
import { ModalHeaderComponent } from 'src/app/shared/modal-header/modal-header.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [],
  exports: []
})
export class AttandanceModalComponentModule { }