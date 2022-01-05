import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController, LoadingController, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { Store, select } from '@ngrx/store';
import { selectTheme } from './shared/settings/settings.selectors';

import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { actionSettingsChangeTheme } from './shared/settings/settings.actions';
import { FakerService } from './shared/faker/faker.service';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthGuard } from './shared/services/auth-guard.service';
import { getMenusettings, getServerResponse } from './pages/auth/store/auth.selectors';
import { SessionCheck } from './shared/session/sessioncheck.service';
import { CommonService } from './shared/services/common.service';

import * as AuthActions from '../app/pages/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  theme$: Observable<boolean>;


  isDarkTheme = false;
  isCameraStart = false;
  isCameraFront = false;
  isCameraFlashMode = true;
  cameraFocusPosition = {
    top: 0,
    left: 0,
    show: false
  };

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: false,
    tapFocus: false,
    previewDrag: false,
    toBack: true,
    alpha: 1
  };

  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 50
  };

  private subscriptions: SubscriptionLike[] = [];
  loading: false;
  Menu: any;
  groupArr: any;

  subscription = new Subscription();
  InitMenu: any;
  expendedlist: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cameraPreview: CameraPreview,
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private translate: TranslateService,
    private store: Store,
    private fakerService: FakerService,
    private menu: MenuController,
    public loadingController: LoadingController,
    private auth: AuthGuard,
    private sessionCall: SessionCheck,
    private toaster: ToastController,
    private commonService: CommonService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.setDefaultLang('en');
    this.fakerService.setLang('en');
    this.theme$ = this.store.pipe(select(selectTheme));
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      this.screenOrientation.unlock();
    });
  }

  logOut() {
    this.auth.logOut();
  }

  toggleMenu() {
    this.menu.toggle('menuBar');
    if (this.menu.isEnabled('menuBar')) {
      this.menu.enable(true, 'menuBar');
    } else {
      this.menu.enable(false, 'menuBar');
    }
  }


  toggleDarkTheme() {
    this.store.dispatch(actionSettingsChangeTheme({ isDark: !this.isDarkTheme }));
  }

  async goToSettings() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menu.close().then(() => {
        this.router.navigateByUrl('/tabs/profile/settings').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  closeCameraSide(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.menu.close('camera');
  }

  onOpenCameraMenu() {
    this.isCameraStart = true;
    this.cameraPreviewOpts = { ...this.cameraPreviewOpts, camera: 'rear', width: window.screen.width, height: window.screen.height };

    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(async (res) => {
      await this.cameraPreview.setFlashMode(this.isCameraFlashMode ? this.cameraPreview.FLASH_MODE.ON : this.cameraPreview.FLASH_MODE.OFF);
      console.log(res)
    },
      (err) => {
        console.log(err)
      });
  }

  onCloseCameraMenu() {
    this.isCameraStart = false;
    this.cameraPreview.stopCamera();
  }

  switchCamera(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    console.log('switchCamera');
    this.cameraPreview.switchCamera().then(async () => {
      this.isCameraFront = !this.isCameraFront;
      if (!this.isCameraFront) {
        await this.cameraPreview.setFlashMode(this.isCameraFlashMode ? this.cameraPreview.FLASH_MODE.ON : this.cameraPreview.FLASH_MODE.OFF);
      }
    });
  }

  takePicture(event: Event) {
    // event.stopPropagation();
    // event.preventDefault();

    // console.log('takePicture');
    // // take a picture
    // this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
    //   const img = 'data:image/jpeg;base64,' + imageData;
    //   // console.log(img);
    // }, (err) => {
    //   console.log(err);
    // });
  }

  switchFlashMode(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    console.log('switchFlashMode');
    this.isCameraFlashMode = !this.isCameraFlashMode;
    this.cameraPreview.setFlashMode(this.isCameraFlashMode ? this.cameraPreview.FLASH_MODE.ON : this.cameraPreview.FLASH_MODE.OFF);
  }

  getCameraFocusCoordinates(event) {
    this.cameraFocusPosition.top = event.clientY;
    this.cameraFocusPosition.left = event.clientX;
    this.cameraFocusPosition.show = false;
    this.cameraFocusPosition.show = true;

    console.log(this.cameraFocusPosition);

    this.cameraPreview.tapToFocus(event.clientX || 0, event.clientY || 0).finally(() => {
      setTimeout(() => {
        this.cameraFocusPosition.show = false;
      }, 400);
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.theme$.subscribe((isDark) => {
        this.isDarkTheme = isDark;
      })
    );
    this.getmeusettings();
    const loginSubscriptions = this.store.pipe(select(getMenusettings))
      .subscribe(
        (serverResponse) => {
          debugger;
          if (serverResponse && serverResponse.length > 0) {
            this.Menu = serverResponse;
            this.sessionCall.setlocalStorage('Menusetting', JSON.stringify(serverResponse));
            this.InitMenu = serverResponse;
            this.commonService.MenuSetting = serverResponse;
            const arr = this.InitMenu.map(p => p.ModuleName); // [17, 17, 35]
            const s = new Set(arr); // {17, 35} a set removes duplications, but it's still a set
            const unique = [...s]; // [17, 35] Use the spread operator to transform a set into an Array
            // or use Array.from to transform a set into an array
            const unique2 = Array.from(s); // [17, 35]
            this.InitMenu = unique2;
            console.log(this.InitMenu);
          }
        }
      );

    this.subscription.add(loginSubscriptions);
    // this.subscriptions.push(
    //   this.screenOrientation.onChange().subscribe(async () => {
    //     await this.cameraPreview.stopCamera();
    //     this.cameraPreviewOpts = { ...this.cameraPreviewOpts, width: window.screen.width, height: window.screen.height };

    //     this.cameraPreview.startCamera(this.cameraPreviewOpts).then(async (res) => {
    //       await this.cameraPreview.setFlashMode(this.isCameraFlashMode ? this.cameraPreview.FLASH_MODE.ON : this.cameraPreview.FLASH_MODE.OFF);
    //       console.log(res)
    //     },
    //       (err) => {
    //         console.log(err)
    //       });
    //   })
    // );
  }
  getmeusettings() {
    this.store.dispatch(AuthActions.Menusettings({
      payload: {
        RoleID: this.sessionCall.getlocalStorage('RoleID')
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }
  extractSubmenu(Mid) {

    return this.Menu.filter(x => x.ModuleName === Mid);
  }
  Expandlist(item) {

    if (this.expendedlist === item) {
      this.expendedlist = '';
    }
    else {
      this.expendedlist = item;
    }
  }
}
