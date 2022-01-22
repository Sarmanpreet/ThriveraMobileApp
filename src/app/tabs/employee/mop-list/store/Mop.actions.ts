import { createAction, props } from '@ngrx/store';

export const GetMOPProductList = createAction(
  '[GetMOPProductList Page] GetMOPProductList Button',
  props<{ payload: any }>()
);

export const GetMOPProductListSuccess = createAction(
  '[GetMOPProductList Effects] GetMOPProductList Success Response',
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



