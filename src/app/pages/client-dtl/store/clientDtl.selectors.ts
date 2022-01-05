import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectClientDtlState } from '../../../shared/shared.state';
import { IClientDtlState } from './clientDtl.reducers';

export const selectClientContactList = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.contacts
);

export const selectClientContactError = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.error
);

export const areClientDtlLoaded = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.loading
);

export const getServerResponse = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.serverResponse
);

export const selectClientCommentsLoaded = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.comments
);

export const selectClientCommentsIsSuccess = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.isSuccess
);
export const selectClientDemoStatus = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.demoStatus
);
export const selectMessage = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.Message
);
export const selectStatus = createSelector(
    selectClientDtlState,
    (state: IClientDtlState) => state.Status
);
