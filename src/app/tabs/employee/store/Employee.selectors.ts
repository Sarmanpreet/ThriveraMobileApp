import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IEmployee } from './Employee.reducers';
import { selectEmployeeState } from '../../../shared/shared.state';


export const selectAuthError = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.error
);

export const areAuthLoaded = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.loading
);

export const getCalenderResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.CalenderResponse
);
export const getAttandenceResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.AttandenceDDL
);
export const getAttachmentIdResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.AttachmentId
);
export const saveAttandencelogResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.AttandenceSave
);
export const SaleEntryPendingListResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.SaleEntryPendingList
);
export const getSaleEntryApprovedListResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.SaleEntryApprovedList
);
export const getSaleEntryDDLListResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.SalesEntryDDL
);
export const getCityDDLListResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.CityDDL
);
export const getProductDDLListResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.ProductDDL
);
export const getSubProductDDLListResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.SubProductDDL
);
export const getItemDDLListResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.ItemDDL
);
export const getSaveEntryResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.SaveEntry
);
export const getDeleteEntryResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.DeleteEntry
);
export const getMOPListResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.MOPList
);

export const getPunchTimeResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.PunchTime
);
export const getTargetResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.Target
);
export const getSSRDashBoardResponse = createSelector(
    selectEmployeeState,
    (state: IEmployee) => state.DashBoardSSR
);






