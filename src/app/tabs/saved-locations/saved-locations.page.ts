import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Config, NavController, MenuController, ModalController } from '@ionic/angular';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import * as savedlocationsActions from './store/savedlocations.actions';
import { CommonService } from 'src/app/shared/services/common.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import {
  NativeGeocoderOptions,
  NativeGeocoderResult
} from '@ionic-native/native-geocoder/ngx';
import { getGMapServerResponse } from '../gmap/store/gmap.selectors';
import { selectsavedlocationsState } from 'src/app/shared/shared.state';
import { savedlocations } from 'src/app/interfaces/savedlocations.interface';
import { MapModalComponent } from 'src/app/components/map-modal/map-modal.component';


@Component({
  selector: 'app-saved-locations',
  templateUrl: './saved-locations.page.html',
  styleUrls: ['./saved-locations.page.scss'],
})
export class SavedLocationsPage implements OnInit, OnDestroy {
  savedlocationsList: any;

  searchsavedlocationsList: FormControl = new FormControl('');
  showSearchbar = false;
  isIos = false;
  title = 'Saved Locations';

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
    public commonService: CommonService,
    private router: Router,
    private menu: MenuController,
    private modalController: ModalController
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

    this.isIos = this.config.get('mode') === 'ios';

    //this.locate();

    this.getsavedlocationsList();

    const sub1 = this.store.pipe(select(selectsavedlocationsState)).subscribe(resp => {
      if (resp) {

        this.savedlocationsList = resp.savedlocationsList;
      }
    });

    this.subscription.add(sub1);

  }

  getsavedlocationsList() {
    if (this.sessionCall.getlocalStorage('userid')) {
      this.store.dispatch(
        savedlocationsActions.loadsavedlocations({
          payload: {
            EmpCode: this.sessionCall.getlocalStorage('userid')
          }
        })
      );
    } else {
      this.commonService.toastAlert(
        'Could not found location. Please try again',
        'danger'
      );
    }
  }



  viewInMap(mapData: savedlocations) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        mapData: JSON.stringify(mapData)
      }
    };

    this.router.navigate(['/tabs/gmap'], navigationExtras);
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

  async openMapModal(mapData: any) {

    const modal = await this.modalController.create({
      component: MapModalComponent,
      swipeToClose: true,
      componentProps: mapData
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getsavedlocationsList();
      event.target.complete();
    }, 500);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
