import { createAction, props } from '@ngrx/store';

export const GetRFCPendingList = createAction(
  '[GetRFCPendingList Page] GetRFCPendingList Button',
  props<{ payload: any }>()
);

export const GetRFCPendingListSuccess = createAction(
  '[GetRFCPendingList Effects] GetRFCPendingList Success Response',
  props<{ payload: any }>()
);
export const ResetGetRFCPendingList = createAction(
  '[ResetGetRFCPendingList Effects] ResetGetRFCPendingList Success Response',
  props<{ payload: any }>()
);
export const GetRFCPendingListError = createAction(
  '[GetRFCPendingList Effects] GetRFCPendingList Error Response',
  props<{ payload: any }>()
);
export const GetRFCApprovedList = createAction(
  '[GetRFCApprovedList Page] GetRFCApprovedList Button',
  props<{ payload: any }>()
);

export const GetRFCApprovedListSuccess = createAction(
  '[GetRFCApprovedList Effects] GetRFCApprovedList Success Response',
  props<{ payload: any }>()
);
export const ResetGetRFCApprovedList = createAction(
  '[ResetGetRFCApprovedList Effects] ResetGetRFCApprovedList Success Response',
  props<{ payload: any }>()
);
export const GetRFCApprovedListError = createAction(
  '[GetRFCApprovedList Effects] GetRFCApprovedList Error Response',
  props<{ payload: any }>()
);
export const GetRFCRejectedList = createAction(
  '[GetRFCRejectedList Page] GetRFCRejectedList Button',
  props<{ payload: any }>()
);

export const GetRFCRejectedListSuccess = createAction(
  '[GetRFCRejectedList Effects] GetRFCRejectedList Success Response',
  props<{ payload: any }>()
);
export const ResetGetRFCRejectedList = createAction(
  '[ResetGetRFCRejectedList Effects] ResetGetRFCRejectedList Success Response',
  props<{ payload: any }>()
);
export const GetRFCRejectedListError = createAction(
  '[GetRFCRejectedList Effects] GetRFCRejectedList Error Response',
  props<{ payload: any }>()
);

export const GetOldAttandenceStatus = createAction(
  '[GetOldAttandenceStatus Page] GetOldAttandenceStatus Button',
  props<{ payload: any }>()
);

export const GetOldAttandenceStatusSuccess = createAction(
  '[GetOldAttandenceStatus Effects] GetOldAttandenceStatus Success Response',
  props<{ payload: any }>()
);

export const GetOldAttandenceStatusError = createAction(
  '[GetOldAttandenceStatus Effects] GetOldAttandenceStatus Error Response',
  props<{ payload: any }>()
);
export const GetNewttandenceStatus = createAction(
  '[GetNewttandenceStatus Page] GetNewttandenceStatus Button',
  props<{ payload: any }>()
);

export const GetNewttandenceStatusSuccess = createAction(
  '[GetNewttandenceStatus Effects] GetNewttandenceStatus Success Response',
  props<{ payload: any }>()
);

export const GetNewttandenceStatusError = createAction(
  '[GetNewttandenceStatus Effects] GetNewttandenceStatus Error Response',
  props<{ payload: any }>()
);
export const GetLeaveattandenceStatus = createAction(
  '[GetLeaveattandenceStatus Page] GetLeaveattandenceStatus Button',
  props<{ payload: any }>()
);

export const GetLeaveattandenceStatusSuccess = createAction(
  '[GetLeaveattandenceStatus Effects] GetLeaveattandenceStatus Success Response',
  props<{ payload: any }>()
);

export const GetLeaveattandenceStatusError = createAction(
  '[GetLeaveattandenceStatus Effects] GetLeaveattandenceStatus Error Response',
  props<{ payload: any }>()
);
export const saveRFCEntry = createAction(
  '[saveRFCEntry Page] saveRFCEntry Button',
  props<{ payload: any }>()
);

export const saveRFCEntrySuccess = createAction(
  '[saveRFCEntry Effects] saveRFCEntry Success Response',
  props<{ payload: any }>()
);

export const saveRFCEntryError = createAction(
  '[saveRFCEntry Effects] saveRFCEntry Error Response',
  props<{ payload: any }>()
);
export const resetsaveRFCEntry = createAction(
  '[resetsaveRFCEntry Page] resetsaveRFCEntry Button',
  props<{ payload: any }>()
);



