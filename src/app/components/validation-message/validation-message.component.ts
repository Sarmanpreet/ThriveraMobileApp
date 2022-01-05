import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent implements OnInit {

  _control: any;

  @Input() set control(val: any) {
    this._control = val;
  }
  @Input() validations: [] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
