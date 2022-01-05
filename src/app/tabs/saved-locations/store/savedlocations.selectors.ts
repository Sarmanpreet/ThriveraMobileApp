
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectsavedlocationsState } from '../../../shared/shared.state';
import { IsavedlocationsState } from './savedlocations.reducers';


export const selectsavedlocationsList = createSelector(
    selectsavedlocationsState,
    (state: IsavedlocationsState) => state.savedlocationsList
);

export const selectsavedlocationsError = createSelector(
    selectsavedlocationsState,
    (state: IsavedlocationsState) => state.error
);

export const aresavedlocationsLoaded = createSelector(
    selectsavedlocationsState,
    (state: IsavedlocationsState) => state.loading
);

export const getServerResponse = createSelector(
    selectsavedlocationsState,
    (state: IsavedlocationsState) => state.serverResponse
);
