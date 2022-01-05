import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { DemoFeedbackModalComponent } from './demo-feedback-modal.component';
  
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DemoFeedbackModalComponent],
  exports: [DemoFeedbackModalComponent]
})
export class DemoFeedbackModalComponentModule { }