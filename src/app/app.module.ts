//import { profileEffects } from './tabs/profile/store/profile.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './shared/shared.state';
import { SettingsEffects } from './shared/settings/settings.effects';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './pages/auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { ClientDtlEffects } from './pages/client-dtl/store/clientDtl.effects';
// import { gmapEffects } from './tabs/gmap/store/gmap.effects';
// import { savedLocationsEffect } from './tabs/saved-locations/store/savedlocations.effects';
// import { notificationEffects } from './tabs/notification/store/notifications.effects';
import { DatePipe } from '@angular/common';
// import { RoutesEffects } from './tabs/routes/store/route.effects';
import { ClientsEffects } from './pages/client-list/store/clients.effects';
import { DemoEffects } from './pages/pend-upcom-demo-list/store/Pend-upcom-effects';

import { EmployeeEffects } from './pages/employee/store/Employee.effects';
import { EmpHeaderComponent } from './pages/employee/emp-header/emp-header.component';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    /* angular google map (agm/core) plugin */
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSkijnsnCVWqaNxwjSROoB0cpJM8Nv0TI',
      libraries: ['places']
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    /* NGX TRANSLATE */
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),

    AppRoutingModule,
    SharedModule,

    /* NGRX */
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      SettingsEffects,

      AuthEffects,
      EmployeeEffects,
      ClientsEffects,
      ClientDtlEffects,
      // gmapEffects,
      // savedLocationsEffect,
      //profileEffects,
      // RoutesEffects,
      DemoEffects,
      //notificationEffects,
    ])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    ScreenOrientation,
    NativeGeocoder,
    DatePipe,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
