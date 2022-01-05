import { Component, Input, OnInit } from '@angular/core';
import { IDynamicTblColumn } from 'src/app/shared/interface/Dynamic-tab';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  public _dataSource: any[];
  @Input() _formName: string = '';
  @Input() _colunms: IDynamicTblColumn[] = [];
  @Input() _isDelbtnflag: boolean = false;

  @Input() set dataSource(val: any[]) {

    this._dataSource = val;
  }
  constructor() { }

  ngOnInit() { }

}
