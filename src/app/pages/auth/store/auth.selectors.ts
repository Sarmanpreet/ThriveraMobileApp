import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthState } from '../store/auth.reducers';
import { selectAuthState } from '../../../shared/shared.state';


export const selectAuthError = createSelector(
    selectAuthState,
    (state: IAuthState) => state.error
);

export const areAuthLoaded = createSelector(
    selectAuthState,
    (state: IAuthState) => state.loading
);

export const getServerResponse = createSelector(
    selectAuthState,
    (state: IAuthState) => state.serverResponse
);

export const getMenusettings = createSelector(
    selectAuthState,
    (state: IAuthState) => state.Menusettings
);
export const getcheckSession = createSelector(
    selectAuthState,
    (state: IAuthState) => state.Checksession
);


