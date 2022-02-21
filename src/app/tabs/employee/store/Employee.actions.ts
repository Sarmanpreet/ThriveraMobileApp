import { createAction, props } from '@ngrx/store';

export const resetAuthState = createAction(
  '[From Any Login/Register Related Source] Reset the Auth reducer state',
  props<{ payload: any }>()
);

export const GetSSRDashBoard = createAction(
  '[GetSSRDashBoard Page] GetSSRDashBoard Button',
  props<{ payload: any }>()
);

export const GetSSRDashBoardSuccess = createAction(
  '[GetSSRDashBoard Effects] GetSSRDashBoard Success Response',
  props<{ payload: any }>()
);

export const GetSSRDashBoardError = createAction(
  '[GetSSRDashBoard Effects] GetSSRDashBoard Error Response',
  props<{ payload: any }>()
);
export const GetCalender = createAction(
  '[GetCalender Page] GetCalender Button',
  props<{ payload: any }>()
);

export const GetCalenderSuccess = createAction(
  '[GetCalender Effects] GetCalender Success Response',
  props<{ payload: any }>()
);

export const GetCalenderError = createAction(
  '[GetCalender Effects] GetCalender Error Response',
  props<{ payload: any }>()
);
export const GetAttandenceDDL = createAction(
  '[GetAttandenceDDL Page] GetAttandenceDDL Button',
  props<{ payload: any }>()
);

export const GetAttandenceDDLSuccess = createAction(
  '[GetAttandenceDDL Effects] GetAttandenceDDL Success Response',
  props<{ payload: any }>()
);

export const GetAttandenceDDLError = createAction(
  '[GetAttandenceDDL Effects] GetAttandenceDDL Error Response',
  props<{ payload: any }>()
);
export const SaveAttachementImage = createAction(
  '[SaveAttachementImage Page] SaveAttachementImage Button',
  props<{ payload: any }>()
);

export const SaveAttachementImageSuccess = createAction(
  '[SaveAttachementImage Effects] SaveAttachementImage Success Response',
  props<{ payload: any }>()
);

export const SaveAttachementImageError = createAction(
  '[SaveAttachementImage Effects] SaveAttachementImage Error Response',
  props<{ payload: any }>()
);
export const resetAttachementImage = createAction(
  '[resetAttachementImage Effects] resetAttachementImage Error Response',
  props<{ payload: any }>()
);
export const SaveAttandence = createAction(
  '[SaveAttandence Page] SaveAttandence Button',
  props<{ payload: any }>()
);

export const SaveAttandenceSuccess = createAction(
  '[SaveAttandence Effects] SaveAttandence Success Response',
  props<{ payload: any }>()
);

export const SaveAttandenceError = createAction(
  '[SaveAttandence Effects] SaveAttandence Error Response',
  props<{ payload: any }>()
);
export const resetAttandence = createAction(
  '[resetAttandence Page] resetAttandence Button',
  props<{ payload: any }>()
);

export const GetSaleEntryList = createAction(
  '[GetSaleEntryList Page] GetSaleEntryList Button',
  props<{ payload: any }>()
);

export const GetSaleEntryListPendingSuccess = createAction(
  '[GetSaleEntryList Effects] GetSaleEntryList Success Response',
  props<{ payload: any }>()
);
export const GetSaleEntryListApprovedSuccess = createAction(
  '[GetSaleEntryListApprovedSuccess Effects] GetSaleEntryListApprovedSuccess Success Response',
  props<{ payload: any }>()
);
export const GetSaleEntryListRejectedSuccess = createAction(
  '[GetSaleEntryListRejectedSuccess Effects] GetSaleEntryListRejectedSuccess Success Response',
  props<{ payload: any }>()
);
export const GetSaleEntryListError = createAction(
  '[GetSaleEntryList Effects] GetSaleEntryList Error Response',
  props<{ payload: any }>()
);
export const resetGetSaleEntryList = createAction(
  '[GetSaleEntryList Page] resetGetSaleEntryList Button',
  props<{ payload: any }>()
);
export const GetSalesEntryDDL = createAction(
  '[GetSalesEntryDDL Page] GetSalesEntryDDL Button',
  props<{ payload: any }>()
);

export const GetSalesEntryDDLSuccess = createAction(
  '[GetSalesEntryDDL Effects] GetSalesEntryDDL Success Response',
  props<{ payload: any }>()
);

export const GetSalesEntryDDLError = createAction(
  '[GetSalesEntryDDL Effects] GetSalesEntryDDL Error Response',
  props<{ payload: any }>()
);

export const GetCityDDL = createAction(
  '[GetCityDDL Page] GetCityDDL Button',
  props<{ payload: any }>()
);

export const GetCityDDLSuccess = createAction(
  '[GetCityDDL Effects] GetCityDDL Success Response',
  props<{ payload: any }>()
);

export const GetCityDDLError = createAction(
  '[GetCityDDL Effects] GetCityDDL Error Response',
  props<{ payload: any }>()
);

export const GetProductDDL = createAction(
  '[GetProductDDL Page] GetProductDDL Button',
  props<{ payload: any }>()
);

export const GetProductDDLSuccess = createAction(
  '[GetProductDDL Effects] GetProductDDL Success Response',
  props<{ payload: any }>()
);

export const GetProductDDLError = createAction(
  '[GetProductDDL Effects] GetProductDDL Error Response',
  props<{ payload: any }>()
);
export const GetSubProductDDL = createAction(
  '[GetSubProductDDL Page] GetSubProductDDL Button',
  props<{ payload: any }>()
);

export const GetSubProductDDLSuccess = createAction(
  '[GetSubProductDDL Effects] GetSubProductDDL Success Response',
  props<{ payload: any }>()
);

export const GetSubProductDDLError = createAction(
  '[GetSubProductDDL Effects] GetSubProductDDL Error Response',
  props<{ payload: any }>()
);
export const GetItemDDL = createAction(
  '[GetItemDDL Page] GetItemDDL Button',
  props<{ payload: any }>()
);

export const GetItemDDLSuccess = createAction(
  '[GetItemDDL Effects] GetItemDDL Success Response',
  props<{ payload: any }>()
);

export const GetItemDDLError = createAction(
  '[GetItemDDL Effects] GetItemDDL Error Response',
  props<{ payload: any }>()
);
export const SaveSalesEntry = createAction(
  '[SaveSalesEntry Page] SaveSalesEntry Button',
  props<{ payload: any }>()
);

export const SaveSalesEntrySuccess = createAction(
  '[SaveSalesEntry Effects] SaveSalesEntry Success Response',
  props<{ payload: any }>()
);

export const SaveSalesEntryError = createAction(
  '[SaveSalesEntry Effects] SaveSalesEntry Error Response', props<{ payload: any }>()
);
export const resetSalesEntry = createAction(
  '[resetAttandence Page] resetAttandence Button',
  props<{ payload: any }>()
);
export const DeleteEntry = createAction(
  '[DeleteEntry Page] DeleteEntry Button',
  props<{ payload: any }>()
);

export const DeleteEntrySuccess = createAction(
  '[DeleteEntry Effects] DeleteEntry Success Response',
  props<{ payload: any }>()
);

export const DeleteEntryError = createAction(
  '[DeleteEntry Effects] DeleteEntry Error Response', props<{ payload: any }>()
);


export const GetMOPList = createAction(
  '[GetMOPList Page] GetMOPList Button',
  props<{ payload: any }>()
);

export const GetMOPListSuccess = createAction(
  '[GetMOPList Effects] GetMOPList Success Response',
  props<{ payload: any }>()
);

export const GetMOPListError = createAction(
  '[GetMOPList Effects] GetMOPList Error Response',
  props<{ payload: any }>()
);

export const GetPunchTime = createAction(
  '[GetPunchTime Page] GetPunchTime Button',
  props<{ payload: any }>()
);

export const GetPunchTimeSuccess = createAction(
  '[GetPunchTime Effects] GetPunchTime Success Response',
  props<{ payload: any }>()
);

export const GetPunchTimeError = createAction(
  '[GetPunchTime Effects] GetPunchTime Error Response',
  props<{ payload: any }>()
);

export const GetTargetAchieved = createAction(
  '[GetTargetAchieved Page] GetTargetAchieved Button',
  props<{ payload: any }>()
);

export const GetTargetAchievedSuccess = createAction(
  '[GetTargetAchieved Effects] GetTargetAchieved Success Response',
  props<{ payload: any }>()
);

export const GetTargetAchievedError = createAction(
  '[GetTargetAchieved Effects] GetTargetAchieved Error Response',
  props<{ payload: any }>()
);





