import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit } from '@angular/core';
import { ActionButtonType, IDynamicTabColumn, IDynamicTblColumn } from '../../../shared/interface/Dynamic-tab'
@Component({
  selector: 'dynamic-tab',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
})
export class TabHeaderComponent implements OnInit {

  @Input() _Default = '';
  @Input() _ColunmForGrid: IDynamicTblColumn[] = [];

  @Input() formName: string = '';

  @Input() _Tabs: IDynamicTabColumn[] = [];
  DefaultTab: string;


  constructor() { }

  ngOnInit() {
  }

}
