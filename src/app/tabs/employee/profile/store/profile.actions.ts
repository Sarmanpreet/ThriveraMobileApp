import { createAction, props } from '@ngrx/store';

export const resetprofileState = createAction(
  '[From Any profile Related Source] Reset the profile reducer state',
  props<{ payload: any }>()
);

export const loadprofile = createAction(
  '[Load profile Page] Load profile List',
  props<{ payload: any }>()
);

export const loadprofileSuccess = createAction(
  '[profile Effects] Load profile Success Response',
  props<{ payload: any }>()
);

export const loadprofileError = createAction(
  '[profile Effects] Load profile Error Response',
  props<{ payload: any }>()
);

export const saveprofile = createAction(
  '[Load profile Page] save profile ',
  props<{ payload: any }>()
);

export const saveprofileSuccess = createAction(
  '[profile Effects] save profile Success Response',
  props<{ payload: any }>()
);

export const saveprofileError = createAction(
  '[profile Effects] save profile Error Response',
  props<{ payload: any }>()
);


