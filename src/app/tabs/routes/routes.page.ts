import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Config, NavController, MenuController } from "@ionic/angular";
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { Routes } from 'src/app/interfaces/routes.interface';
import { FakerService } from 'src/app/shared/faker/faker.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { selectRoutesList } from '../routes/store/route.selectors';
import { getGMapServerResponse } from '../gmap/store/gmap.selectors';
import * as RoutesActions from "./store/route.actions";
import * as GMapActions from "../../tabs/gmap/store/gmap.actions";
import { NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from "@ionic/angular";
import { debugOutputAstAsTypeScript } from '@angular/compiler';



@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit, OnDestroy {
  messagesList: any = [];
  RouteList: any[];
  allRouteData: any = [];

  searchMessageList: FormControl = new FormControl("");
  showSearchbar = false;
  isIos = false;
  title = "Routes";

  address: any;
  lat: any;
  lng: any;

  public searchControl: FormControl;
  subscription = new Subscription();
  nativeGeocoder: any;

  constructor(
    public config: Config,
    private store: Store<IAppState>,
    private sessionCall: SessionCheck,
    private toaster: ToastController,
    public commonService: CommonService,
    private router: Router,
    private menu: MenuController,
    private fakerService: FakerService
  ) {
    this.searchControl = new FormControl();
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

    this.getClientList();

    const sub1 = this.store.pipe(select(selectRoutesList)).subscribe(resp => {
      if (resp) {

        this.RouteList = resp;
        this.allRouteData = resp;
      }
    });

    this.subscription.add(sub1);

    const checkInSub = this.store.pipe(select(getGMapServerResponse)).subscribe(resp => {
      debugger;
      if (resp && resp.Status) {

        this.commonService.toastAlert(resp.ResponseMessage, "success");
      }
    });
    debugger;
    this.subscription.add(checkInSub);

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
    }, 100);
  }

  getClientList() {
    setTimeout(() => {
      if (this.sessionCall.getlocalStorage("userid")) {
        this.store.dispatch(
          RoutesActions.loadRoutes({
            payload: {

              EmpCode: this.sessionCall.getlocalStorage("userid")
            }
          })
        );
      } else {
        this.commonService.toastAlert(
          "Could not found User ID. Please re-login",
          "danger"
        );
      }
    }, 500);


  }

  async onItemClick(val: Routes) {
    // this.commonService.toastAlert("Comp Name: " + val.COMP_NAME, "danger");

    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectedClientData: JSON.stringify(val)
      }
    };

    this.router.navigate(["/client-list"], navigationExtras);
  }

  async onCheckinClick(val: Routes) {


    if (this.sessionCall.getlocalStorage("userid") && this.lat && this.lng) {
      const data = {
        // EmpCode: this.sessionCall.getlocalStorage("userid"),
        CompCode: val.RouteId,
        CompName: val.RouteName,
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
      this.RouteList = this.allRouteData.filter(item => {
        return (
          item.RouteName.route.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
        );
      });
    } else {
      this.RouteList = [];
      this.RouteList = this.allRouteData;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
