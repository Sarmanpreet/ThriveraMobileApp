import { createAction, props } from "@ngrx/store";

export const resetgmapState = createAction(
  "[From Any gmap Related Source] Reset the gmap reducer state",
  props<{ payload: any }>()
);

export const loadgmap = createAction(
  "[Load gmap Page] Load gmap page",
  props<{ payload: any }>()
);

export const loadgmapSuccess = createAction(
  "[gmap Effect] Load gmap Success Response",
  props<{ payload: any }>()
);

export const loadgmapError = createAction(
  "[gmap Effect] Load gmap Error Response",
  props<{ payload: any }>()
);

// ----************** Save *************--- //

export const addCheckIn = createAction(
  "[Add CheckIn] Add CheckIn",
  props<{ payload: any }>()
);

export const addCheckInSuccess = createAction(
  "[Add CheckInSuccess] Add CheckInSuccess Response",
  props<{ payload: any }>()
);

export const addCheckInError = createAction(
  "[Add CheckInError] Add CheckInError Response",
);

