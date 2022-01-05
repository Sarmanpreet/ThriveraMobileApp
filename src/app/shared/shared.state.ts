
import { profile } from 'src/app/interfaces/profile.interface';

import { savedlocations } from './../interfaces/savedlocations.interface';
import { reducer } from './../pages/client-dtl/store/clientDtl.reducers';
// import { SavedLocationsPage } from './../tabs/saved-locations/saved-locations.page';
import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  INIT,
  UPDATE
} from '@ngrx/store';

import { LocalStorageService } from './local-storage/local-storage.service';

// Settings
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.model';

// Music
import { MusicState } from './music/music.model';
import { musicReducer } from './music/music.reducer';
import { authReducer, IAuthState } from '../pages/auth/store/auth.reducers';
import { clientsReducer, IClientsState } from '../tabs/clients/store/clients.reducers';
import { clientDtlReducer, IClientDtlState } from '../pages/client-dtl/store/clientDtl.reducers';
import { savedlocationsReducer, IsavedlocationsState } from '../tabs/saved-locations/store/savedlocations.reducers';
import { gmapReducer, IGmapsState } from '../tabs/gmap/store/gmap.reducers';
import { InotificationState, notificationReducer } from '../tabs/notification/store/notification.reducers';
import { profileReducer, IprofileState } from '../tabs/profile/store/profile.reducers';
import { IRoutesState, routeReducer } from '../tabs/routes/store/route.reducers';
import { DemoReducer, IDemoState } from '../pages/pend-upcom-demo-list/store/Pend-upcom-reducers';
import { employeeReducer, IEmployee } from '../tabs/employee/store/Employee.reducers';



export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer,
  music: musicReducer,
  auth: authReducer,
  routes: routeReducer,
  clients: clientsReducer,
  clientDtl: clientDtlReducer,
  gmap: gmapReducer,
  savedlocations: savedlocationsReducer,
  notification: notificationReducer,
  profile: profileReducer,
  demo: DemoReducer,
  Upcomingdemo: DemoReducer,
  employee: employeeReducer
};

export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export interface AppState {
  settings: SettingsState;
  employee: IEmployee;
  music: MusicState;
  auth: IAuthState;
  clients: IClientsState;
  routes: IRoutesState;
  clientDtl: IClientDtlState;
  gmap: IGmapsState;
  savedlocations: IsavedlocationsState;
  notification: InotificationState;
  profile: IprofileState;
  demo: IDemoState,
  Upcomingdemo: IDemoState
}

export const selectMusicState = createFeatureSelector<
  AppState,
  MusicState
>('music');

export const selectAuthState = createFeatureSelector<
  AppState,
  IAuthState
>('auth');
export const selectEmployeeState = createFeatureSelector<
  AppState,
  IEmployee
>('employee');

export const selectClientsState = createFeatureSelector<
  AppState,
  IClientsState
>('clients');

export const selectPendDemoState = createFeatureSelector<
  AppState,
  IDemoState
>('demo');
export const selectUpcomingState = createFeatureSelector<
  AppState,
  IDemoState
>('Upcomingdemo');
export const selectRoutesState = createFeatureSelector<
  AppState,
  IRoutesState
>('routes');

export const selectClientDtlState = createFeatureSelector<
  AppState,
  IClientDtlState
>('clientDtl');


export const selectgmapState = createFeatureSelector<
  AppState,
  IGmapsState
>('gmap');


export const selectsavedlocationsState = createFeatureSelector<
  AppState,
  IsavedlocationsState
>('savedlocations');


export const selectprofileState = createFeatureSelector<
  AppState,
  IprofileState
>('profile');



export const selectnotificationState = createFeatureSelector<
  AppState
//InotificationState
>('notification');


export function initStateFromLocalStorage(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}
