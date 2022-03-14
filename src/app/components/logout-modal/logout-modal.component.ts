import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { addClientComments, loadClientComments } from 'src/app/pages/client-dtl/store/clientDtl.actions';
import { selectClientCommentsIsSuccess } from 'src/app/pages/client-dtl/store/clientDtl.selectors';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { CommonService } from '../../shared/services/common.service';


@Component({
  selector: 'app-comment-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
})

export class LogoutModalComponent implements OnInit, OnDestroy {

  commentForm: FormGroup;
  client: any = {};
  subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
    public popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private toaster: ToastController,
    public commonService: CommonService,
    private navParams: NavParams,
    private sessionCall: SessionCheck
  ) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dismissModal() {
    this.popoverController.dismiss();
    //this.modalController.dismiss();
  }

}
