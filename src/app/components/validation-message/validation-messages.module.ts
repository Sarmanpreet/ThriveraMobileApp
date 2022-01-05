
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ValidationMessageComponent } from './validation-message.component';

@NgModule({
    imports: [
        CommonModule,
        /* angular google map (agm/core) plugin */        
        SharedModule
    ],
    declarations: [ValidationMessageComponent],
    exports: [ValidationMessageComponent]
})
export class ValidationMessagesModule { }
