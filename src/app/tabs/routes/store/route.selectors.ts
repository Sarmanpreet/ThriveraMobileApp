import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRoutesState } from '../../../shared/shared.state';
import { IRoutesState } from './route.reducers';

export const selectRoutesList = createSelector(
    selectRoutesState,
    (state: IRoutesState) => state.RouteList
);

export const selectRoutesError = createSelector(
    selectRoutesState,
    (state: IRoutesState) => state.error
);

export const areRoutesLoaded = createSelector(
    selectRoutesState,
    (state: IRoutesState) => state.loading
);

export const getServerResponse = createSelector(
    selectRoutesState,
    (state: IRoutesState) => state.serverResponse
);

