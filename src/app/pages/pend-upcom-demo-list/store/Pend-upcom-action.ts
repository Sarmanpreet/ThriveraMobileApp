import { createAction, props } from '@ngrx/store';

export const resetPendingDemoState = createAction(
  '[Pending Any Clients Related Source] Reset the  Pending Clients reducer state',
  props<{ payload: any }>()
);

export const loadPendingDemo = createAction(
  '[Load Pending Demo Page] Load Pending Demo List',
  props<{ payload: any }>()
);

export const loadPendingDemoSuccess = createAction(
  '[Pending Demo Effects] Load Pending Demo Success Response',
  props<{ payload: any }>()
);

export const loadPendingDemoError = createAction(
  '[Pending Demo Effects] Load Pending Demo Error Response',
  props<{ payload: any }>()
);
export const loadUpcomingDemo = createAction(
  '[Load Upcoming Demo Page] Load Upcoming Demo List',
  props<{ payload: any }>()
);

export const loadUpcomingSuccess = createAction(
  '[Upcoming Demo Effects] Load Upcoming Demo Success Response',
  props<{ payload: any }>()
);

export const loadUpcomingError = createAction(
  '[Upcoming Demo Effects] Load Upcoming Demo Error Response',
  props<{ payload: any }>()
);
