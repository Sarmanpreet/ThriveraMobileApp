import { createAction, props } from '@ngrx/store';

export const GetCDEditList = createAction(
  '[GetCDEditList Page] GetCDEditList Button',
  props<{ payload: any }>()
);

export const GetCDEditListSuccess = createAction(
  '[GetCDEditList Effects] GetCDEditList Success Response',
  props<{ payload: any }>()
);
export const ResetCDEditList = createAction(
  '[ResetCDEditList Effects] ResetCDEditList Success Response',
  props<{ payload: any }>()
);
export const GetCDEditListError = createAction(
  '[GetCDEditList Effects] GetCDEditList Error Response',
  props<{ payload: any }>()
);
export const saveCounterDisplay = createAction(
  '[saveCounterDisplay Page] saveCounterDisplay Button',
  props<{ payload: any }>()
);

export const saveCounterDisplaySuccess = createAction(
  '[saveCounterDisplay Effects] saveCounterDisplay Success Response',
  props<{ payload: any }>()
);

export const saveCounterDisplayError = createAction(
  '[saveCounterDisplay Effects] saveCounterDisplay Error Response',
  props<{ payload: any }>()
);
export const resetCounterDisplay = createAction(
  '[resetCounterDisplay Page] resetCounterDisplay Button',
  props<{ payload: any }>()
);

export const GetCDList = createAction(
  '[GetCDList Page] GetCDList Button',
  props<{ payload: any }>()
);

export const GetCDListSuccess = createAction(
  '[GetCDList Effects] GetCDList Success Response',
  props<{ payload: any }>()
);

export const GetCDListError = createAction(
  '[GetCDList Effects] GetCDList Error Response',
  props<{ payload: any }>()
);



