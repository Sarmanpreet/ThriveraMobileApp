import { createAction, props } from '@ngrx/store';

export const resetRouteState = createAction(
  '[From Any Route Related Source] Reset the Clients reducer state',
  props<{ payload: any }>()
);

export const loadRoutes= createAction(
  '[Load Route Page] Load Client List',
  props<{ payload: any }>()
);

export const loadRoutesSuccess = createAction(
  '[Route Effects] Load Clients Success Response',
  props<{ payload: any }>()
);

export const loadRoutesError = createAction(
  '[Route Effects] Load Clients Error Response',
  props<{ payload: any }>()
);
  

