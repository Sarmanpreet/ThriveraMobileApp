import { NgModule } from '@angular/core';

import { ClientDtlPageRoutingModule } from './client-dtl-routing.module';

import { ClientDtlPage } from './client-dtl.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentModalComponent } from 'src/app/components/comment-modal/comment-modal.component';
import { CommentsModalComponentModule } from 'src/app/components/comment-modal/comment-modal.module';
import { DemoFeedbackModalComponentModule } from 'src/app/components/demo-feedback-modal/demo-feedback-modal.module';

@NgModule({
  imports: [
    ClientDtlPageRoutingModule,
    SharedModule,
    CommentsModalComponentModule,
    DemoFeedbackModalComponentModule
  ],
  declarations: [ClientDtlPage],
  entryComponents: [CommentModalComponent]
})
export class ClientDtlPageModule {}
