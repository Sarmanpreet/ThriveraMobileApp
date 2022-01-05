import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { addClientComments, loadClientComments } from 'src/app/pages/client-dtl/store/clientDtl.actions';
import { selectClientCommentsIsSuccess } from 'src/app/pages/client-dtl/store/clientDtl.selectors';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { CommonService } from '../../shared/services/common.service';


@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss'],
})

export class CommentModalComponent implements OnInit, OnDestroy {

  commentForm: FormGroup;
  client: any = {};
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
    this.initForm();
    this.client = this.navParams.data;
    debugger;
    const sub1 = this.store.pipe(select(selectClientCommentsIsSuccess))
      .subscribe((resp) => {
        debugger;
        if (resp !== null)
        {
        this.commonService.toastAlert('Comment posted Successfuly', 'success');
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
      debugger;
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
      reminderDate: ['', Validators.required],
      comment: ['', Validators.required]
    };
    this.commentForm = this.formBuilder.group({
      reminderDate: this.formBuilder.control('', [
        Validators.required
      ]),
      comment: this.formBuilder.control('', [
        Validators.required
      ])
    });

    //this.commentForm = this.formBuilder.group(form);

  }

  saveComment() {
    debugger;
    const form = this.commentForm;
    if (form.valid) {
      const data = {
        CustId: this.sessionCall.getlocalStorage('userid')        
        ,Comment:form.value.comment
        ,ComntBy:this.client.custid
        ,SetOn:form.value.reminderDate
        ,AssignTo:this.sessionCall.getlocalStorage('userid')
        ,RefCAid:this.client.Demoid
      }
      this.store.dispatch(addClientComments({ payload: data }));
    } else {
      this.commonService.toastAlert('Please fill all the options of form', 'danger');
    }
  }
}

