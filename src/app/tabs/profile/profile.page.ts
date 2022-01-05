import { Component, OnInit, OnDestroy } from "@angular/core";
import { MenuController, Config } from "@ionic/angular";
import { FakerService } from "src/app/shared/faker/faker.service";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/interfaces/app-states.interface";
import { CommonService } from "src/app/shared/services/common.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionCheck } from "src/app/shared/session/sessioncheck.service";
import { selectprofileList } from './store/profile.selectors';
import * as profileActions from "./store/profile.actions"
@Component({
  selector: "app-profile",
  templateUrl: "profile.page.html",
  styleUrls: ["profile.page.scss"]
})
export class ProfilePage implements OnInit,OnDestroy {
   user = {
     full_name: "",
     nickname: "",
    image: "",
    status: "",
   online: false,
     isMobileOnline: true
   };
  
  isIos: boolean;

  subscription = new Subscription();
  ProfileList: any;
  allProfileData: any;
  profile: any;

  profilePic:any;

  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private sessionCall: SessionCheck,
    private store: Store<IAppState>,
    public commonService: CommonService,
    private router: Router,
    private fakerService: FakerService,
    public config: Config
  ) 
  {}

  toggleMenu() {
    this.menu.toggle("menuBar");
    if (this.menu.isEnabled("menuBar")) {
      this.menu.enable(true, "menuBar");
    } else {
      this.menu.enable(false, "menuBar");
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

  ngOnInit(): void {
    this.isIos = this.config.get("mode") === "ios";

    this.getprofileList();

    const sub1 = this.store.pipe(select(selectprofileList))
    .subscribe((resp) => {
      if (resp) {   
        debugger;     
        this.profile = resp[0];
        // if(this.profile && this.profile.ProfilePic){
        //   this.profilePic = 'data:image/jpeg;base64,' + this.profile.ProfilePic;
        // }
      }
    });

  this.subscription.add(sub1);

  }
  
  
  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getprofileList();
      event.target.complete();
    }, 2000);
  }

  getprofileList() {
    if (this.sessionCall.getlocalStorage("userid")) {
      this.store.dispatch(
      profileActions.loadprofile({
          payload: {
            custid: this.sessionCall.getlocalStorage("userid")
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