import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MenuController, Config } from "@ionic/angular";
import { FakerService } from "src/app/shared/faker/faker.service";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/interfaces/app-states.interface";
import { CommonService } from "src/app/shared/services/common.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionCheck } from "src/app/shared/session/sessioncheck.service";
import { saveprofileResponse, selectprofileList } from './store/profile.selectors';
import * as profileActions from "./store/profile.actions"
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { format, parseISO } from 'date-fns';
@Component({
  selector: "app-profile",
  templateUrl: "profile.page.html",
  styleUrls: ["profile.page.scss"],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit, OnDestroy {

  dateValue: any;
  user = {
    full_name: "",
    nickname: "",
    image: "",
    status: "",
    online: false,
    isMobileOnline: true
  };
  attandanceForm: FormGroup;
  isIos: boolean;

  subscription = new Subscription();
  ProfileList: any;
  allProfileData: any;
  profile: any;

  profilePic: any;
  userInfo: any;
  Male: boolean = true;
  Female: boolean = false;

  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private sessionCall: SessionCheck,
    private store: Store<IAppState>,
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fakerService: FakerService,
    public config: Config,
    private ref: ChangeDetectorRef
  ) {
    // ref.markForCheck();
  }

  ngOnInit(): void {
    this.isIos = this.config.get("mode") === "ios";
    this.attandanceForm = this.formBuilder.group({
      EMPName: this.formBuilder.control('', [Validators.required]),
      EmailID: this.formBuilder.control(''),
      Gender: this.formBuilder.control(''),
      Phone: this.formBuilder.control(''),
      DOB: this.formBuilder.control('')
    });
    this.userInfo = JSON.parse(this.sessionCall.getlocalStorage('UserInfo'));
    console.log(this.userInfo)
    this.getprofileList();

    const sub1 = this.store.pipe(select(selectprofileList))
      .subscribe((resp) => {
        if (resp.length > 0) {
          debugger;
          this.profile = resp[0];
          this.initForm(this.profile);
          // console.log(this.profile)
          // if(this.profile && this.profile.ProfilePic){
          //   this.profilePic = 'data:image/jpeg;base64,' + this.profile.ProfilePic;
          // }
        }
      });

    this.subscription.add(sub1);
    const sub2 = this.store.pipe(select(saveprofileResponse))
      .subscribe((resp) => {

        if (resp && resp.length > 0) {
          this.commonService.toastAlert(
            resp[0].Response,
            "success"
          );
          this.store.dispatch(
            profileActions.resetprofileState({
              payload: {
                saveprofile: undefined
              }
            })
          );


        }
      });

    this.subscription.add(sub2);
  }

  toggleMenu() {
    this.menu.toggle("menuBar");
    if (this.menu.isEnabled("menuBar")) {
      this.menu.enable(true, "menuBar");
    } else {
      this.menu.enable(false, "menuBar");
    }
  }
  initForm(data: any) {
    debugger
    // const form = {
    //   StatusID: ['', Validators.required],
    //   Notes: ['']
    // };

    this.attandanceForm = this.formBuilder.group({
      EMPName: this.formBuilder.control(data.EMPName ? data.EMPName : '', [Validators.required]),
      EmailID: this.formBuilder.control(data.EmailID ? data.EmailID : ''),
      Gender: this.formBuilder.control(data.Gender ? data.Gender : ''),
      Phone: this.formBuilder.control(data.Phone ? data.Phone : ''),
      DOB: this.formBuilder.control(data.DOB ? data.DOB : '')
    });

    this.Male = (this.attandanceForm.value.Gender == "Male") ? true : false;
    this.Female = (this.attandanceForm.value.Gender == "Female") ? true : false;
    // setTimeout(() => {

    //   this.ref.detach();
    // }, 500);

    //this.feedbackForm = this.formBuilder.group(form);

  }

  Submit() {
    const form = this.attandanceForm;
    if (form.valid) {
      this.store.dispatch(
        profileActions.saveprofile({
          payload: {
            LoginId: this.userInfo.EMPID,
            ...form.value
          }
        })
      );
    } else {
      const invalid = [];
      const controls = form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }

      // this.commonService.toastAlert(invalid, 'danger');



      this.commonService.toastAlert('Please fill ' + invalid, 'danger');

    }

  }
  // doRefresh(event) {
  //   setTimeout(() => {
  //     this.getUser();
  //     event.target.complete();
  //   }, 500);
  // }

  // getUser() {
  //   this.fakerService.getFaker().then((faker) => {
  //     this.user.full_name = faker.name.findName();
  //     this.user.image = faker.internet.avatar();
  //     this.user.status = faker.lorem.word();
  //     this.user.online = faker.random.boolean();
  //     this.user.isMobileOnline = faker.random.boolean();
  //     this.user.nickname = this.user.full_name.toLocaleLowerCase().split(' ').join('_');
  //   });
  // }
  // Getchecked(val, Sex) {

  //   let v = (val == Sex) ? 'Checked' : false;
  //   return v;
  // }
  change(val, Sex) {
    debugger


    this.Male = (Sex == "Male") ? true : false;

    this.attandanceForm.patchValue({ Gender: Sex });




  }


  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getprofileList();
      event.target.complete();
    }, 2000);
  }
  formatDate(value: string) {
    this.attandanceForm.patchValue({ DOB: format(parseISO(value), 'MMM dd yyyy') });

    return format(parseISO(value), 'MMM dd yyyy');
  }
  getprofileList() {

    if (this.userInfo.EMPID) {
      this.store.dispatch(
        profileActions.loadprofile({
          payload: {
            LoginId: this.userInfo.EMPID
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