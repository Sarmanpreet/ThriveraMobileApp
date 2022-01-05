import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectPendDemoState, selectUpcomingState } from '../../../shared/shared.state';
import { IDemoState } from './Pend-upcom-reducers';

export const selectPendDemoList = createSelector(
    selectPendDemoState,
    (state: IDemoState) => state.PenDemoList
);

export const sselectPendDemoError = createSelector(
    selectPendDemoState,
    (state: IDemoState) => state.error
);

export const selectPendDemoLoaded = createSelector(
    selectPendDemoState,
    (state: IDemoState) => state.loading
);
export const selectUpcomDemoList =createSelector(
    selectUpcomingState,
    (state: IDemoState) => state.UpcomDemoList
);
export const getServerResponse = createSelector(
    selectPendDemoState,
    (state: IDemoState) => state.serverResponse
);
