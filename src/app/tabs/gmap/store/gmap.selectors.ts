import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectgmapState } from '../../../shared/shared.state';
import {IGmapsState } from './gmap.reducers';

//  export const selectGMapPage = createSelector(
//     selectgmapState,
//      (state: IGmapsState) => state.GMapPage
//  );

export const selectgmapError = createSelector(
    selectgmapState,
    (state: IGmapsState) => state.error
);

export const aregmapLoaded = createSelector(
    selectgmapState,
    (state: IGmapsState) => state.loading
);

export const getGMapServerResponse = createSelector(
    selectgmapState,
    (state: IGmapsState) => state.serverResponse
);
