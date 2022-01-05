import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectClientsState } from '../../../shared/shared.state';
import { IClientsState } from './clients.reducers';

export const selectClientsList = createSelector(
    selectClientsState,
    (state: IClientsState) => state.clientList
);

export const selectClientsError = createSelector(
    selectClientsState,
    (state: IClientsState) => state.error
);

export const areClientsLoaded = createSelector(
    selectClientsState,
    (state: IClientsState) => state.loading
);

export const getServerResponse = createSelector(
    selectClientsState,
    (state: IClientsState) => state.serverResponse
);
