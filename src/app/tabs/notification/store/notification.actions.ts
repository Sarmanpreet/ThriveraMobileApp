import { createAction, props } from '@ngrx/store';

export const resetnotificationState = createAction(
  '[From Any notification Related Source] Reset the notification reducer state',
  props<{ payload: any }>()
);

export const loadnotification = createAction(
  '[Load notification Page] Load notification List',
  props<{ payload: any }>()
);

export const loadnotificationSuccess = createAction(
  '[notification Effects] Load notification Success Response',
  props<{ payload: any }>()
);

export const loadnotificationError = createAction(
  '[notification Effects] Load notification Error Response',
  props<{ payload: any }>()
);
  

