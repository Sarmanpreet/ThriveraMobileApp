
import * as notificationActions from "./store/notification.actions"
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Config, MenuController, ToastController } from '@ionic/angular';
import { selectnotificationList } from './store/notification.selectors';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { ActivatedRoute } from '@angular/router';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss']
})
export class NotificationPage implements OnInit, OnDestroy {
 
  activeSegment: FormControl = new FormControl('feedback');
  segments: any[] = [
    { title: 'Feedback', value: 'feedback' },
    { title: 'Comments', value: 'comments' }
  ];

  isIos: boolean;
  subscription = new Subscription();
  notifications: any;
  

  constructor(
    private sessionCall: SessionCheck,
    private toaster: ToastController,
    public commonService: CommonService,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private menu: MenuController,
    public config: Config
  ){}
   


  toggleMenu(){
    this.menu.toggle('menuBar');
    if(this.menu.isEnabled('menuBar')){
      this.menu.enable(true,'menuBar');
    }else{
      this.menu.enable(false,'menuBar');
    }
  }

  ngOnInit(): void {
    this.isIos = this.config.get('mode') === 'ios';
   
    this.getnotificationList();

    const sub1 = this.store.pipe(select(selectnotificationList))
    .subscribe((resp) => {
      debugger;
      if (resp) {
       
        this.notifications = resp;
      
      }
    });

  this.subscription.add(sub1);

  }
  
  
  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getnotificationList();
      event.target.complete();
    }, 2000);
  }

  getnotificationList() {
    if (this.sessionCall.getlocalStorage("userid")) {
      this.store.dispatch(
      notificationActions.loadnotification({
          payload: {
            EmpCode: this.sessionCall.getlocalStorage("userid")
          }
        })
      );
    } else {
      this.commonService.toastAlert(
        "Could not found User ID. Please Try-again",
        "danger"
      );
    }
 }

 ngOnDestroy() {
  this.subscription.unsubscribe();
}
 
}
