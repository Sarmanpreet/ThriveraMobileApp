
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

export interface IAuthState {
  loading: boolean;
  serverResponse: any;
  error: any;
  Menusettings: any;
  Checksession: any;
  WebUrl: any;
}

export const initialAuthState: IAuthState = {
  loading: false,
  serverResponse: null,
  error: null,
  Menusettings: [],
  Checksession: null,
  WebUrl: null
};


export const reducer = createReducer(

  initialAuthState,

  on(AuthActions.resetAuthState,
    (state, action) => {
      return {
        ...state,

        ...action.payload
      };
    }),

  on(AuthActions.login,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(AuthActions.loginSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        serverResponse: action.payload
      };
    }),
  on(AuthActions.loginReset,
    (state, action) => {
      return {
        ...state,
        loading: false,
        serverResponse: null
      };
    }),
  on(AuthActions.loginError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),

  on(AuthActions.register,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),

  on(AuthActions.registerSuccess,
    (state, action) => {
      debugger;
      return {
        ...state,
        loading: false,
        serverResponse: action.payload
      };
    }),

  on(AuthActions.registerError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(AuthActions.checkSession,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),

  on(AuthActions.checkSessionSuccess,
    (state, action) => {
      debugger;
      return {
        ...state,
        loading: false,
        Checksession: action.payload
      };
    }),

  on(AuthActions.checkSessionError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(AuthActions.Menusettings,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(AuthActions.MenusettingsSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        Menusettings: action.payload
      };
    }),

  on(AuthActions.MenusettingsError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(AuthActions.config,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(AuthActions.configSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        WebUrl: action.payload
      };
    }),

  on(AuthActions.configError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),


);

export function authReducer(
  state: IAuthState | undefined,
  action: Action
) {
  return reducer(state, action);
}





