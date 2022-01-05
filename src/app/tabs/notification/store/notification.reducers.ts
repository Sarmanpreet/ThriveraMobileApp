
import { Action, createReducer, on } from '@ngrx/store';
import { notification } from 'src/app/interfaces/notification.interface';
import * as notificationActions from '../store/notification.actions';

export interface InotificationState {
    notificationList: notification[];
    loading: boolean;
    serverResponse: any;
    error: any;
}

export const initialnotificationState: InotificationState = {
    notificationList: [],
    loading: false,
    serverResponse: null,
    error: null
};


export const reducer = createReducer(

    initialnotificationState,

    on(notificationActions.resetnotificationState,
        (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }),

    on(notificationActions.loadnotification,
        (state, action) => {
            return {
                ...state,
                loading: true,
            };
        }),


    on(notificationActions.loadnotificationSuccess,
        (state, action) => {

            return {
                ...state,
                loading: false,
                notificationList: action.payload
            };
        }),

    on(notificationActions.loadnotificationError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }),

);

export function notificationReducer(
    state: InotificationState | undefined,
    action: Action
) {
    return reducer(state, action);
}





