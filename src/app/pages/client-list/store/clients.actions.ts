import { createAction, props } from '@ngrx/store';

export const resetClientsState = createAction(
  '[From Any Clients Related Source] Reset the Clients reducer state',
  props<{ payload: any }>()
);

export const loadClients = createAction(
  '[Load Clients Page] Load Client List',
  props<{ payload: any }>()
);

export const loadClientsSuccess = createAction(
  '[Clients Effects] Load Clients Success Response',
  props<{ payload: any }>()
);

export const loadClientsError = createAction(
  '[Clients Effects] Load Clients Error Response',
  props<{ payload: any }>()
);
  

