
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { Action, createReducer, on } from '@ngrx/store';
import { DayConfig } from 'ion2-calendar';
import * as rfcActions from './Rfc.actions';

export interface IRfc {
  loading: boolean;
  CalenderResponse: DayConfig[];
  error: any;

  RFCPendingList: any;
  RFCApprovedList: any;
  RFCRejectedList: any;
  GetMOPList: any;
  SaveRFC: any;
  OldAttnStatus: any;
  NewAttnStatus: any;
  LeaveAttnStatus: any;

}

export const initialAuthState: IRfc = {
  loading: false,
  CalenderResponse: null,
  error: null,

  RFCPendingList: null,
  RFCApprovedList: null,
  RFCRejectedList: null,
  GetMOPList: null,
  SaveRFC: null,
  OldAttnStatus: null,
  NewAttnStatus: null,
  LeaveAttnStatus: null
};


export const reducer = createReducer(

  initialAuthState,


  on(rfcActions.GetRFCPendingList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(rfcActions.GetRFCPendingListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        RFCPendingList: action.payload
      };
    }),

  on(rfcActions.GetRFCPendingListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),


  on(rfcActions.GetRFCApprovedList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(rfcActions.GetRFCApprovedListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        RFCApprovedList: action.payload
      };
    }),

  on(rfcActions.GetRFCApprovedListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),


  on(rfcActions.GetRFCRejectedList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(rfcActions.GetRFCRejectedListSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        RFCRejectedList: action.payload
      };
    }),

  on(rfcActions.GetRFCRejectedListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(rfcActions.ResetGetRFCPendingList,
    (state, action) => {

      return {
        ...state,
        loading: false,
        RFCPendingList: null,
        RFCRejectedList: null,

        RFCApprovedList: null,
      };
    }),
  on(rfcActions.GetOldAttandenceStatus,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(rfcActions.GetOldAttandenceStatusSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        OldAttnStatus: action.payload
      };
    }),

  on(rfcActions.GetOldAttandenceStatusSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(rfcActions.GetNewttandenceStatus,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(rfcActions.GetNewttandenceStatusSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        NewAttnStatus: action.payload
      };
    }),

  on(rfcActions.GetNewttandenceStatusError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(rfcActions.GetLeaveattandenceStatus,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(rfcActions.GetLeaveattandenceStatusSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        LeaveAttnStatus: action.payload
      };
    }),

  on(rfcActions.GetLeaveattandenceStatusError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(rfcActions.saveRFCEntry,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(rfcActions.saveRFCEntrySuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveRFC: action.payload
      };
    }),

  on(rfcActions.saveRFCEntryError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(rfcActions.resetsaveRFCEntry,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveRFC: null
      };
    }),
);

export function rfcReducer(
  state: IRfc | undefined,
  action: Action
) {
  return reducer(state, action);
}





