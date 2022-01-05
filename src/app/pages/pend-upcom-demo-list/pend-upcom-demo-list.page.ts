
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Config, NavController, MenuController } from "@ionic/angular";
import * as DemoActions from "./store/Pend-upcom-action";
import * as GMapActions from "../../tabs/gmap/store/gmap.actions";
import { FakerService } from "../../shared/faker/faker.service";
import { SessionCheck } from "src/app/shared/session/sessioncheck.service";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/interfaces/app-states.interface";
import { ToastController } from "@ionic/angular";
import { CommonService } from "src/app/shared/services/common.service";
import { selectPendDemoList, selectUpcomDemoList } from "./store/Pend-upcom-selectors";
import { Subscription } from "rxjs";
import { Clients } from "src/app/interfaces/clients.interface";
import { debounceTime } from "rxjs/operators";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Geolocation } from "@capacitor/Geolocation";
import {
  NativeGeocoderOptions,
  NativeGeocoderResult
} from "@ionic-native/native-geocoder/ngx";
import { getGMapServerResponse } from "src/app/tabs/gmap/store/gmap.selectors";
// import { getGMapServerResponse } from '../gmap/store/gmap.selectors';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pend-upcom-demo-list',
  templateUrl: './pend-upcom-demo-list.page.html',
  styleUrls: ['./pend-upcom-demo-list.page.scss'],
})
export class PendUpcomDemoListPage implements OnInit, OnDestroy {
  messagesList: any[];
  DemoPendingList: any[];
  DemoUpcomingList: any[];
  allClientData: any[];

  searchMessageList: FormControl = new FormControl("");
  showSearchbar = false;
  isIos = false;
  title = "Pending Demo";
  activeSegment: FormControl = new FormControl('Pending');
  address: any;
  lat: any;
  lng: any;
  Tab: any = "Pending";
  public searchControl: FormControl;
  subscription = new Subscription();
  nativeGeocoder: any;
  client: any;
  constructor(
    public config: Config,
    private store: Store<IAppState>,
    private sessionCall: SessionCheck,
    private toaster: ToastController,
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private menu: MenuController,
    private fakerService: FakerService,
    private location: Location,
  ) {
    // debugger;
    // this.route.queryParams.subscribe(params => {
    //   if (params && params.selectedClientData) {
    //     debugger;
    //     this.client = JSON.parse(params.selectedClientData);
    //     console.log(this.client.RouteId);
    //   }
    // });
    this.searchControl = new FormControl();
  }
  Tabchange(value) {
    this.Tab = value;

  }
  goBack() {
    this.location.back();
  }
  toggleMenu() {
    this.menu.toggle('menuBar');
    if (this.menu.isEnabled('menuBar')) {
      this.menu.enable(true, 'menuBar');
    } else {
      this.menu.enable(false, 'menuBar');
    }
  }
  ngOnInit(): void {
    // this.isIos = this.config.get("mode") === "ios";

    // this.locate();
    debugger;
    this.getPendingDemoList();

    const sub1 = this.store.pipe(select(selectPendDemoList)).subscribe(resp => {
      if (resp) {
        debugger;
        this.DemoPendingList = resp;

      }
    });

    this.subscription.add(sub1);
    this.getUpcomingDemoList();
    const sub2 = this.store.pipe(select(selectUpcomDemoList)).subscribe(resp => {
      if (resp) {
        debugger;
        this.DemoUpcomingList = resp;

      }
    });

    this.subscription.add(sub2);
    // const checkInSub = this.store.pipe(select(getGMapServerResponse)).subscribe(resp => {

    //   if (resp && resp.Status) {
    //     this.commonService.toastAlert(resp.ResponseMessage, "success");
    //   }
    // });

    // this.subscription.add(checkInSub);

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.setFilteredItems(search);
      });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getPendingDemoList();
      event.target.complete();
    }, 500);
  }

  getPendingDemoList() {
    debugger;
    if (this.sessionCall.getlocalStorage("userid")) {
      const parm = {
        custid: this.sessionCall.getlocalStorage('userid')
      }
      this.store.dispatch(

        DemoActions.loadPendingDemo({
          payload: parm
        })
      );
    } else {
      this.commonService.toastAlert(
        "Could not found User ID. Please re-login",
        "danger"
      );
    }
  }
  getUpcomingDemoList() {
    debugger;
    if (this.sessionCall.getlocalStorage("userid")) {
      const parm = {
        custid: this.sessionCall.getlocalStorage('userid')
      }
      this.store.dispatch(

        DemoActions.loadUpcomingDemo({
          payload: parm
        })
      );
    } else {
      this.commonService.toastAlert(
        "Could not found User ID. Please re-login",
        "danger"
      );
    }
  }
  async onItemClick(val: Clients) {
    debugger;
    // this.commonService.toastAlert("Comp Name: " + val.COMP_NAME, "danger");
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectedClientData: JSON.stringify(val)
      }
    };

    this.router.navigate(["/client-dtl"], navigationExtras);
  }

  async onCheckinClick(val: Clients) {


    if (this.sessionCall.getlocalStorage("userid") && this.lat && this.lng) {
      const data = {
        EmpCode: this.sessionCall.getlocalStorage("userid"),
        CompCode: val.COMP_CODE,
        CompName: val.COMP_NAME,
        Location: this.address ? this.address : 'Location not found',
        Latitude: this.lat,
        Longitude: this.lng
      };
      this.store.dispatch(
        GMapActions.addCheckIn({
          payload: data
        })
      );
    } else {
      this.commonService.toastAlert(
        "Could not found Location information. Please try again",
        "danger"
      );
    }
  }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.lat = coordinates.coords.latitude;
      this.lng = coordinates.coords.longitude;

      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      this.nativeGeocoder
        .reverseGeocode(this.lat, this.lng, options)
        .then(
          (result: NativeGeocoderResult[]) =>
            (this.address = JSON.stringify(result[0]))
        )
        .catch((error: any) => console.log(error));
    }
  }

  setFilteredItems(searchTerms) {
    if (searchTerms) {
      this.DemoPendingList = this.allClientData.filter(item => {
        return (
          item.COMP_NAME.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
        );
      });
    } else {
      this.DemoPendingList = [];
      this.DemoPendingList = this.allClientData;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}