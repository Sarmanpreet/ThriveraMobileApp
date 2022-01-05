import { createAction, props } from '@ngrx/store';

export const resetsavedlocationsState = createAction(
  '[From Any savedlocations Related Source] Reset the savedlocations reducer state',
  props<{ payload: any }>()
);

export const loadsavedlocations = createAction(
  '[Load savedlocations Page] Load savedlocations List',
  props<{ payload: any }>()
);

export const loadsavedlocationsSuccess = createAction( 
  '[savedlocations Effects] Load savedlocations Success Response',
  props<{ payload: any }>()
);

export const loadsavedlocationsError = createAction(
  '[savedlocations Effects] Load savedlocations Error Response',
  props<{ payload: any }>()
); 
 

