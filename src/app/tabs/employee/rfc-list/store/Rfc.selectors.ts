import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRfc } from './Rfc.reducers';
import { selectRfcState } from '../../../../shared/shared.state';


export const getRFCPendingListResponse = createSelector(
    selectRfcState,
    (state: IRfc) => state.RFCPendingList
);
export const getRFCApprovedListResponse = createSelector(
    selectRfcState,
    (state: IRfc) => state.RFCApprovedList
);
export const getRFCRejectedListResponse = createSelector(
    selectRfcState,
    (state: IRfc) => state.RFCRejectedList
);
export const getOldAttnStatusResponse = createSelector(
    selectRfcState,
    (state: IRfc) => state.OldAttnStatus
);
export const getnewAttnStatusResponse = createSelector(
    selectRfcState,
    (state: IRfc) => state.NewAttnStatus
);
export const getSaveRFCResponse = createSelector(
    selectRfcState,
    (state: IRfc) => state.SaveRFC
);
export const getleaveDDLResponse = createSelector(
    selectRfcState,
    (state: IRfc) => state.LeaveAttnStatus
);




