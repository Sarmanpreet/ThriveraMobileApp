
import { Action, createReducer, on } from '@ngrx/store';
import { DayConfig } from 'ion2-calendar';
import * as mopActions from './Mop.actions';

export interface IMop {
  loading: boolean;
  CalenderResponse: DayConfig[];
  error: any;

  MOPList: any;
  GetMOPList: any;
  SaveMop: any;
}

export const initialAuthState: IMop = {
  loading: false,
  CalenderResponse: null,
  error: null,

  MOPList: null,
  GetMOPList: null,
  SaveMop: null
};


export const reducer = createReducer(

  initialAuthState,


  on(mopActions.GetMOPProductList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(mopActions.GetMOPProductListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        GetMOPList: action.payload
      };
    }),

  on(mopActions.GetMOPProductListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(mopActions.saveMOPEntry,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(mopActions.saveMOPEntrySuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveMop: action.payload
      };
    }),

  on(mopActions.saveMOPEntryError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
);

export function mopReducer(
  state: IMop | undefined,
  action: Action
) {
  return reducer(state, action);
}





