import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectprofileState } from '../../../shared/shared.state';
import { IprofileState } from './profile.reducers';

export const selectprofileList = createSelector(
    selectprofileState,
    (state: IprofileState) => state.profileList
);

export const selectprofileError = createSelector(
    selectprofileState,
    (state: IprofileState) => state.error
);

export const areprofileLoaded = createSelector(
    selectprofileState,
    (state: IprofileState) => state.loading
);

export const getServerResponse = createSelector(
    selectprofileState,
    (state: IprofileState) => state.serverResponse
);
