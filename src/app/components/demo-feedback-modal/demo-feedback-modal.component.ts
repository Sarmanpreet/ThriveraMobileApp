import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { getServerResponse } from 'src/app/pages/auth/store/auth.selectors';
import { addClientComments, loadFeedBackStatus, onStopDemo } from 'src/app/pages/client-dtl/store/clientDtl.actions';
import {  selectClientDemoStatus, selectStatus } from 'src/app/pages/client-dtl/store/clientDtl.selectors';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Component({
  selector: 'app-demo-feedback-modal',
  templateUrl: './demo-feedback-modal.component.html',
  styleUrls: ['./demo-feedback-modal.component.scss'],
})
export class DemoFeedbackModalComponent implements OnInit, OnDestroy {

  feedbackForm: FormGroup;
  DemoData: any = {};
  feedbacks: any=[];
  subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toaster: ToastController,
    private commonService: CommonService,
    private navParams: NavParams,
    private sessionCall: SessionCheck
  ) {
    
  }
  ngOnInit() {
    debugger;
    this.initForm();
    this.DemoData = this.navParams.data;
   
  //  this.store.dispatch(loadFeedBackStatus());
    // const sub2 = this.store.pipe(select(selectStatus))
    // .subscribe((resp) => {
    //   debugger;
    //   if (resp && resp.length>0 &&  this.feedbacks.length==0)
    //   {
    //     this.feedbacks=resp;
    //   }
   
    // });
    //this.subscription.add(sub2);

    const sub1 = this.store.pipe(select(selectClientDemoStatus))
      .subscribe((resp) => {
        debugger;
        if (resp ==false)
        {
        this.commonService.toastAlert('Thankyou! \n Your demo feedback saved successfuly', 'success');
        this.modalController.dismiss();
        }
        // if (resp) {
        //  this.modalController.dismiss();
        //   this.store.dispatch(loadClientComments({ payload: this.client.COMP_CODE }));
        //   this.commonService.toastAlert('Comment posted Successfuly', 'success');
        // } else if (resp !== null && resp === false) {
        //   this.commonService.toastAlert('Your comment does not post', 'danger');
        // }
      });
      
    this.subscription.add(sub1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  initForm() {
    const form = {
      OTP: ['', Validators.required],
      Status: ['', Validators.required],
      reminderDate: [''],
      Remarks: ['']
    };

    this.feedbackForm = this.formBuilder.group({
      OTP: this.formBuilder.control('', [
        Validators.required
      ]),
      Status: this.formBuilder.control('', [
        Validators.required
      ]),
      reminderDate: [''],
      Remarks: ['']
    });

    //this.feedbackForm = this.formBuilder.group(form);

  }

  saveComment() {
    debugger;
    const form = this.feedbackForm;
    if (form.valid) {
      if(this.DemoData.OTP==form.controls["OTP"].value)
      {
      const data = {
        Userid: this.sessionCall.getlocalStorage('userid')        
        ,Remarks:form.value.Remarks
        ,MeetingCustId:this.DemoData.custid
        ,SetOn:form.value.reminderDate
        ,MeetingEndOn:new Date()
        ,Demoid:this.DemoData.demoid
        ,DemoStatus :form.controls["Status"].value
      }
      this.store.dispatch(onStopDemo({ payload: data }));
    }
    else{
      this.commonService.toastAlert('Incorrect OTP. \nPlease fill correct OTP which sent to customer mobile', 'danger');
    }
    } else {
      this.commonService.toastAlert('Please fill all the options of form', 'danger');
    }
  }
}

