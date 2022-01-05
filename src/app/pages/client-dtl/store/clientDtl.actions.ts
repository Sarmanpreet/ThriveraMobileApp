import { createAction, props } from '@ngrx/store';

export const resetClientDtlState = createAction(
    '[From Any ClientDtl Related Source] Reset the ClientDtl reducer state',
    props<{ payload: any }>()
);

export const loadClientDtl = createAction(
    '[Load ClientDtls Page] Load Client List',
    props<{ payload: any }>()
);
export const loadClientSuccess = createAction(
    '[Load ClientDtls Page] Load Client Success',
    props<{ payload: any }>()
);
export const loadClientError = createAction(
    '[Load ClientDtls Page] Load Error',
    props<{ payload: any }>()
);
export const loadClientContacts = createAction(
    '[Load ClientDtl Page] Load Client List',
    props<{ payload: any }>()
);

export const loadClientContactsSuccess = createAction(
    '[ClientDtl Effects] Load ClientDtl Success Response',
    props<{ payload: any }>()
);

export const loadClientContactsError = createAction(
    '[ClientDtl Effects] Load ClientDtl Error Response',
    props<{ payload: any }>()
);


export const loadClientComments = createAction(
    '[Load Client Comments Page] Load Client Comments List',
    props<{ payload: any }>()
);

export const loadClientCommentsSuccess = createAction(
    '[Client Comments Effects] Load Client Comments Success Response',
    props<{ payload: any }>()
);

export const loadClientCommentsError = createAction(
    '[Client Comments Effects] Load Client Comments Error Response',
    props<{ payload: any }>()
);

 // ----************** Save Comments *************--- //

export const addClientComments = createAction(
    '[Add Client Comments] Add Client Comments',
    props<{ payload: any }>()
);

export const addClientCommentsSuccess = createAction(
    '[Add Client Comments Success] Add Client Comments Success Response',
    
);

export const addClientCommentsError = createAction(
    '[Add Client Comments Error] Add Client Comments Error Response',
);

// ----************** On Start Demo *************--- //

export const onCheckDemo = createAction(
    '[Client Demo] Check Demo',
    props<{ payload: any }>()
);

export const onCheckDemoSuccess = createAction(
    '[Client Demo] Check Demo Success Response',
    props<{ payload: any }>()
);

export const onCheckDemoError = createAction(
    '[Client Demo] Check Demo Error Response',
    props<{ payload: any }>()
);


 // ----************** On Start Demo *************--- //

 export const onStartDemo = createAction(
    '[Client Demo] Start Demo',
    props<{ payload: any }>()
);

export const onStartDemoSuccess = createAction(
    '[Client Demo Success] Start Demo Success Response',
    props<{ payload: any }>()
);

export const onStartDemoError = createAction(
    '[Client Demo Error] Start Demo Error Response',
    props<{ payload: any }>()
);

// ----************** On Stop Demo *************--- //

export const onStopDemo = createAction(
    '[Client Demo] Stop Demo',
    props<{ payload: any }>()
);

export const onStopDemoSuccess = createAction(
    '[Client Demo Success] Stop Demo Success Response',
    props<{ payload: any }>()
);

export const onStopDemoError = createAction(
    '[Client Demo Error] Stop Demo Error Response',
    props<{ payload: any }>()
);
export const loadFeedBackStatus = createAction(
    '[Client FeedBack] Status List'
    
);

export const loadFeedBackStatusSuccess = createAction(
    '[Client FeedBack Success] Status List Success Response',
    props<{ payload: any }>()
);

export const loadFeedBackStatusError = createAction(
    '[Client FeedBack Error] Status List Error Response',
    props<{ payload: any }>()
);