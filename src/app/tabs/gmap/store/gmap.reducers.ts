import { Action, createReducer, on } from "@ngrx/store";
import * as gmapActions from "./gmap.actions";

export interface IGmapsState {
  loading: boolean;
  serverResponse: any;
  error: any;
}

export const initialgmapsState: IGmapsState = {
  loading: false,
  serverResponse: null,
  error: null
};

export const reducer = createReducer(
  initialgmapsState,

  on(gmapActions.resetgmapState, (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  }),

  on(gmapActions.loadgmap, (state, action) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(gmapActions.loadgmapSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      gmapList: action.payload
    };
  }),

  on(gmapActions.loadgmapError, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  }),

  on(gmapActions.addCheckIn, (state, action) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(gmapActions.addCheckInSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      serverResponse: action
    };
  }),

  on(gmapActions.addCheckInError, (state, action) => {
    return {
      ...state,
      loading: false,
      error: "Something went wrong!!"
    };
  })
);

export function gmapReducer(state: IGmapsState | undefined, action: Action) {
  return reducer(state, action);
}
