
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { Action, createReducer, on } from '@ngrx/store';
import { DayConfig } from 'ion2-calendar';
import * as counterActions from './Counterdisplay.actions';

export interface ICounterdisplay {
  loading: boolean;
  CalenderResponse: DayConfig[];
  error: any;

  CDList: any;
  GetCDEditList: any;
  SaveCounterDisplay: any;
}

export const initialAuthState: ICounterdisplay = {
  loading: false,
  CalenderResponse: null,
  error: null,

  CDList: null,
  GetCDEditList: null,
  SaveCounterDisplay: null
};


export const reducer = createReducer(

  initialAuthState,


  on(counterActions.GetCDEditList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(counterActions.GetCDEditListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        GetCDEditList: action.payload
      };
    }),

  on(counterActions.GetCDEditListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),

  on(counterActions.ResetCDEditList,
    (state, action) => {

      return {
        ...state,
        loading: false,
        GetCDEditList: null
      };
    }),
  on(counterActions.saveCounterDisplay,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(counterActions.saveCounterDisplaySuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveCounterDisplay: action.payload
      };
    }),

  on(counterActions.saveCounterDisplayError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(counterActions.resetCounterDisplay,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveCounterDisplay: null
      };
    }),
  on(counterActions.GetCDList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(counterActions.GetCDListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        CDList: action.payload
      };
    }),

  on(counterActions.GetCDListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    })
);

export function counterdisplayReducer(
  state: ICounterdisplay | undefined,
  action: Action
) {
  return reducer(state, action);
}





