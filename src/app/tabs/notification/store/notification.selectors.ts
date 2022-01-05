import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectnotificationState } from '../../../shared/shared.state';
import { InotificationState } from './notification.reducers';

export const selectnotificationList = createSelector(
    selectnotificationState,
    (state: InotificationState) => state.notificationList
);

export const selectnotificationError = createSelector(
    selectnotificationState,
    (state: InotificationState) => state.error
);

export const arenotificationLoaded = createSelector(
    selectnotificationState,
    (state: InotificationState) => state.loading
);

export const getServerResponse = createSelector(
    selectnotificationState,
    (state: InotificationState) => state.serverResponse
);
