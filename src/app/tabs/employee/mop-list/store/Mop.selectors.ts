import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IMop } from './Mop.reducers';
import { selectMopState } from '../../../../shared/shared.state';


export const getMOPProductListResponse = createSelector(
    selectMopState,
    (state: IMop) => state.GetMOPList
);
export const getSaveMopResponse = createSelector(
    selectMopState,
    (state: IMop) => state.SaveMop
);
export const getCompetetitionListResponse = createSelector(
    selectMopState,
    (state: IMop) => state.GetCompetetitionList
);
export const getSaveCompetetitionResponse = createSelector(
    selectMopState,
    (state: IMop) => state.SaveCompetetition
);
export const getLeavePendingListResponse = createSelector(
    selectMopState,
    (state: IMop) => state.LeavePendinglist
);
export const getLeaveApprovedListResponse = createSelector(
    selectMopState,
    (state: IMop) => state.LeaveAprrovedList
);
export const getLeaveRejectedListResponse = createSelector(
    selectMopState,
    (state: IMop) => state.LeaveRejectedList
);
export const getSaveLeavesResponse = createSelector(
    selectMopState,
    (state: IMop) => state.SaveLeaves
);






