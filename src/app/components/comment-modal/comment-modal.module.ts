import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { CommentModalComponent } from './comment-modal.component';
  
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [CommentModalComponent],
  exports: [CommentModalComponent]
})
export class CommentsModalComponentModule { }
