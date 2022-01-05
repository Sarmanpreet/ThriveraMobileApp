import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

import { SharedModule } from '../../../shared/shared.module';
import { ValidationMessagesModule } from 'src/app/components/validation-message/validation-messages.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
ValidationMessagesModule,
    SharedModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
