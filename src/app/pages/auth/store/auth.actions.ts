import { createAction, props } from '@ngrx/store';

export const resetAuthState = createAction(
  '[From Any Login/Register Related Source] Reset the Auth reducer state',
  props<{ payload: any }>()
);

export const login = createAction(
  '[Login Page] Submit Button',
  props<{ payload: any }>()
);

export const loginSuccess = createAction(
  '[Auth Effects] Login Success Response',
  props<{ payload: any }>()
);

export const loginError = createAction(
  '[Auth Effects] Login Error Response',
  props<{ payload: any }>()
);
export const loginReset = createAction(
  '[Auth Effects] loginReset Success Response',
  props<{ payload: any }>()
);

export const checkSession = createAction(
  '[CheckSession Page] CheckSession a new client',
  props<{ payload: any }>()
);

export const checkSessionSuccess = createAction(
  '[CheckSession Page] CheckSession Success Response',
  props<{ payload: any }>()
);


export const checkSessionError = createAction(
  '[Register Page] Register Error Response',
  props<{ payload: any }>()
);

export const register = createAction(
  '[Register Page] Register a new client',
  props<{ payload: any }>()
);

export const registerSuccess = createAction(
  '[Register Page] Register Success Response',
  props<{ payload: any }>()
);


export const registerError = createAction(
  '[Register Page] Register Error Response',
  props<{ payload: any }>()
);


export const Menusettings = createAction(
  '[Menusettings Page] Menusettings Submit ',
  props<{ payload: any }>()
);

export const MenusettingsSuccess = createAction(
  '[Menusettings Effects] Menusettings Success Response',
  props<{ payload: any }>()
);

export const MenusettingsError = createAction(
  '[Menusettings Effects] Menusettings Error Response',
  props<{ payload: any }>()
);


