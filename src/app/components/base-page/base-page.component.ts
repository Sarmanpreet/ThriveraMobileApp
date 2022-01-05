import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getMenusettings } from 'src/app/pages/auth/store/auth.selectors';

import * as AuthActions from '../../pages/auth/store/auth.actions';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
})
export class BasePageComponent implements OnInit {

  subscription = new Subscription();
  Result: any;
  constructor(private router1: Router,
    private store1: Store, private session: SessionCheck) {


  }

  IsMenuAccess(str: string) {
    debugger;
    const path = this.router1.url.split('/employee')[1];

    //const path = this.router1.url.substring(lastIndex + 2);
    // const lastIndex = this.router1.url.lastIndexOf('/employee');
    // const path = this.router1.url.substring(lastIndex + 2);
    console.log(path);
    const serverResponse = JSON.parse(this.session.getlocalStorage('Menusetting'))
    this.Result = serverResponse.filter(model => model.MenuURL == path);
    if (this.Result != undefined && this.Result.length > 0) {
      // const Result = this.Result.filter(model => model.MenuURL == path);
      return this.Result[0][str];
    } else {
      return false;
    }

  }
  ngOnInit() { }

}
