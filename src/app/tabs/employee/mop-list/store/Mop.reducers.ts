
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { Action, createReducer, on } from '@ngrx/store';
import { DayConfig } from 'ion2-calendar';
import * as mopActions from './Mop.actions';

export interface IMop {
  loading: boolean;
  CalenderResponse: DayConfig[];
  error: any;

  MOPList: any;
  GetMOPList: any;
  GetCompetetitionList: any;
  SaveMop: any;
  SaveCompetetition: any;
  LeavePendinglist: any;
  LeaveAprrovedList: any;
  LeaveRejectedList: any;
  SaveLeaves: any;
}

export const initialAuthState: IMop = {
  loading: false,
  CalenderResponse: null,
  error: null,

  MOPList: null,
  GetMOPList: null,
  SaveMop: null,
  GetCompetetitionList: null,
  SaveCompetetition: null,

  LeavePendinglist: null,
  LeaveAprrovedList: null,
  LeaveRejectedList: null,
  SaveLeaves: null

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

  on(mopActions.ResetMOPProductList,
    (state, action) => {

      return {
        ...state,
        loading: false,
        GetMOPList: null
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
  on(mopActions.resetMOP,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveMop: null
      };
    }),
  on(mopActions.GetCompetitionList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(mopActions.GetCompetitionListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        GetCompetetitionList: action.payload
      };
    }),

  on(mopActions.GetCompetitionListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),

  on(mopActions.ResetGetCompetitionList,
    (state, action) => {

      return {
        ...state,
        loading: false,
        GetCompetetitionList: null
      };
    }),
  on(mopActions.saveCompetitionEntry,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(mopActions.saveCompetitionEntrySuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveCompetetition: action.payload
      };
    }),

  on(mopActions.saveCompetitionEntryError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(mopActions.resetsaveCompetitionEntry,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveCompetetition: null
      };
    }),
  on(mopActions.GetLeavePendingList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(mopActions.GetLeavePendingListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        LeavePendinglist: action.payload
      };
    }),

  on(mopActions.GetLeavePendingListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(mopActions.GetLeaveApprovedList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(mopActions.GetLeaveApprovedListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        LeaveApprovedList: action.payload
      };
    }),

  on(mopActions.GetLeaveApprovedListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(mopActions.GetLeaveRejectedList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(mopActions.GetLeaveRejectedListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        LeaveRejected: action.payload
      };
    }),

  on(mopActions.GetLeaveRejectedListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(mopActions.resetLeave,
    (state, action) => {
      return {
        ...state,
        loading: false,
        SaveLeaves: null
      };
    }),
  on(mopActions.saveLeaves,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(mopActions.saveLeavesSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveLeaves: action.payload
      };
    }),

  on(mopActions.saveLeavesError,
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





