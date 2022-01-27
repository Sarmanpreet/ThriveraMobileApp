import { createAction, props } from '@ngrx/store';

export const GetMOPProductList = createAction(
  '[GetMOPProductList Page] GetMOPProductList Button',
  props<{ payload: any }>()
);

export const GetMOPProductListSuccess = createAction(
  '[GetMOPProductList Effects] GetMOPProductList Success Response',
  props<{ payload: any }>()
);
export const ResetMOPProductList = createAction(
  '[ResetMOPProductList Effects] ResetMOPProductList Success Response',
  props<{ payload: any }>()
);
export const GetMOPProductListError = createAction(
  '[GetMOPProductList Effects] GetMOPProductList Error Response',
  props<{ payload: any }>()
);
export const saveMOPEntry = createAction(
  '[saveMOPEntry Page] saveMOPEntry Button',
  props<{ payload: any }>()
);

export const saveMOPEntrySuccess = createAction(
  '[saveMOPEntry Effects] saveMOPEntry Success Response',
  props<{ payload: any }>()
);

export const saveMOPEntryError = createAction(
  '[saveMOPEntry Effects] saveMOPEntry Error Response',
  props<{ payload: any }>()
);
export const resetMOP = createAction(
  '[resetMOP Page] resetMOP Button',
  props<{ payload: any }>()
);

export const GetCompetitionList = createAction(
  '[GetCompetitionList Page] GetCompetitionList Button',
  props<{ payload: any }>()
);

export const GetCompetitionListSuccess = createAction(
  '[GetCompetitionList Effects] GetCompetitionList Success Response',
  props<{ payload: any }>()
);
export const ResetGetCompetitionList = createAction(
  '[ResetGetCompetitionList Effects] ResetGetCompetitionList Success Response',
  props<{ payload: any }>()
);
export const GetCompetitionListError = createAction(
  '[GetCompetitionList Effects] GetCompetitionList Error Response',
  props<{ payload: any }>()
);
export const saveCompetitionEntry = createAction(
  '[saveCompetitionEntry Page] saveCompetitionEntry Button',
  props<{ payload: any }>()
);

export const saveCompetitionEntrySuccess = createAction(
  '[saveCompetitionEntry Effects] saveCompetitionEntry Success Response',
  props<{ payload: any }>()
);

export const saveCompetitionEntryError = createAction(
  '[saveCompetitionEntry Effects] saveCompetitionEntry Error Response',
  props<{ payload: any }>()
);
export const resetsaveCompetitionEntry = createAction(
  '[resetsaveCompetitionEntry Page] resetsaveCompetitionEntry Button',
  props<{ payload: any }>()
);
export const GetLeavePendingList = createAction(
  '[GetLeavePendingList Page] GetLeavePendingList Button',
  props<{ payload: any }>()
);

export const GetLeavePendingListSuccess = createAction(
  '[GetLeavePendingList Effects] GetLeavePendingList Success Response',
  props<{ payload: any }>()
);
export const ResetGetLeavePendingList = createAction(
  '[ResetGetLeavePendingList Effects] ResetGetLeavePendingList Success Response',
  props<{ payload: any }>()
);
export const GetLeavePendingListError = createAction(
  '[GetLeavePendingList Effects] GetLeavePendingList Error Response',
  props<{ payload: any }>()
);
export const GetLeaveApprovedList = createAction(
  '[GetLeaveApprovedList Page] GetLeaveApprovedList Button',
  props<{ payload: any }>()
);

export const GetLeaveApprovedListSuccess = createAction(
  '[GetLeaveApprovedList Effects] GetLeaveApprovedList Success Response',
  props<{ payload: any }>()
);
export const ResetGetLeaveApprovedList = createAction(
  '[ResetGetLeaveApprovedList Effects] ResetGetLeaveApprovedList Success Response',
  props<{ payload: any }>()
);
export const GetLeaveApprovedListError = createAction(
  '[GetLeaveApprovedList Effects] GetLeaveApprovedList Error Response',
  props<{ payload: any }>()
);
export const GetLeaveRejectedList = createAction(
  '[GetLeaveRejectedList Page] GetLeaveRejectedList Button',
  props<{ payload: any }>()
);

export const GetLeaveRejectedListSuccess = createAction(
  '[GetLeaveRejectedList Effects] GetLeaveRejectedList Success Response',
  props<{ payload: any }>()
);
export const ResetGetLeaveRejectedList = createAction(
  '[ResetGetLeaveRejectedList Effects] ResetGetLeaveRejectedList Success Response',
  props<{ payload: any }>()
);
export const GetLeaveRejectedListError = createAction(
  '[GetLeaveRejectedList Effects] GetLeaveRejectedList Error Response',
  props<{ payload: any }>()
);
export const saveLeaves = createAction(
  '[saveLeaves Page] saveLeaves Button',
  props<{ payload: any }>()
);

export const saveLeavesSuccess = createAction(
  '[saveLeaves Effects] saveLeaves Success Response',
  props<{ payload: any }>()
);

export const saveLeavesError = createAction(
  '[saveLeaves Effects] saveLeaves Error Response',
  props<{ payload: any }>()
);
export const resetLeave = createAction(
  '[resetLeave Effects] resetLeave Error Response',
  props<{ payload: any }>()
);



