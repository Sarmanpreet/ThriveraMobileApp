
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Config, NavController, MenuController } from "@ionic/angular";
import * as ClientsActions from "./store/clients.actions";
import { FakerService } from "../../shared/faker/faker.service";
import { SessionCheck } from "src/app/shared/session/sessioncheck.service";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/interfaces/app-states.interface";
import { ToastController } from "@ionic/angular";
import { CommonService } from "src/app/shared/services/common.service";
import { selectClientsList } from "./store/clients.selectors";
import { Subscription } from "rxjs";
import { Clients } from "src/app/interfaces/clients.interface";
import { debounceTime } from "rxjs/operators";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Geolocation } from "@capacitor/Geolocation";
import {
  NativeGeocoderOptions,
  NativeGeocoderResult
} from "@ionic-native/native-geocoder/ngx";
// import { getGMapServerResponse } from '../gmap/store/gmap.selectors';
import { Location } from '@angular/common';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
})


export class ClientListPage implements OnInit, OnDestroy {
  messagesList: any[];
  clientList: any[];
  allClientData: any[];

  searchMessageList: FormControl = new FormControl("");
  showSearchbar = false;
  isIos = false;
  title = "Clients";

  address: any;
  lat: any;
  lng: any;

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
    debugger;
    this.route.queryParams.subscribe(params => {
      if (params && params.selectedClientData) {
        debugger;
        this.client = JSON.parse(params.selectedClientData);
        console.log(this.client.RouteId);
      }
    });
    this.searchControl = new FormControl();
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
    this.getClientList();

    const sub1 = this.store.pipe(select(selectClientsList)).subscribe(resp => {
      if (resp) {
        this.clientList = resp;

      }
    });

    this.subscription.add(sub1);



    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.setFilteredItems(search);
      });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getClientList();
      event.target.complete();
    }, 500);
  }

  getClientList() {
    debugger;
    if (this.sessionCall.getlocalStorage("userid")) {
      const parm = {
        id: this.client.RouteId,
        custid: this.sessionCall.getlocalStorage('userid')
      }
      this.store.dispatch(

        ClientsActions.loadClients({
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
      // this.store.dispatch(
      //   GMapActions.addCheckIn({
      //     payload: data
      //   })
      // );
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

      // this.nativeGeocoder
      //   .reverseGeocode(this.lat, this.lng, options)
      //   .then(
      //     (result: NativeGeocoderResult[]) =>
      //       (this.address = JSON.stringify(result[0]))
      //   )
      //   .catch((error: any) => console.log(error));
    }
  }

  setFilteredItems(searchTerms) {
    if (searchTerms) {
      this.clientList = this.allClientData.filter(item => {
        return (
          item.COMP_NAME.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
        );
      });
    } else {
      this.clientList = [];
      this.clientList = this.allClientData;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
