import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private sessionCall: SessionCheck,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    if (this.sessionCall.getlocalStorage('token')) {
      this.commonService.startLocation();
      this.router.navigate(['/tabs']);
      // this.router.navigate(['/employee/employeedashboard']);
    }
    else {
      this.router.navigate(['/login']);

    }
  }

}
