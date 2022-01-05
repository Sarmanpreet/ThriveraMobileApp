
import { Action, createReducer, on } from '@ngrx/store';
import { Clients } from 'src/app/interfaces/clients.interface';
import * as DemoActions from '../store/Pend-upcom-action';

export interface IDemoState {
    PenDemoList: Clients[];
   UpcomDemoList: Clients[];
    loading: boolean;
    serverResponse: any;
    error: any;
}

export const initialDemoState: IDemoState = {
    PenDemoList: [],
    UpcomDemoList:[],
    loading: false,
    serverResponse: null,
    error: null
};


export const reducer = createReducer(

    initialDemoState,

    on(DemoActions.resetPendingDemoState,
        (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }),

    on(DemoActions.loadPendingDemo,
        (state, action) => {
            return {
                ...state,
                loading: true,
            };
        }),


    on(DemoActions.loadPendingDemoSuccess,
        (state, action) => {

            return {
                ...state,
                loading: false,
                PenDemoList: action.payload
            };
        }),

    on(DemoActions.loadPendingDemoError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }),
        on(DemoActions.loadUpcomingDemo,
            (state, action) => {
                return {
                    ...state,
                    loading: true,
                };
            }),
    
    
        on(DemoActions.loadUpcomingSuccess,
            (state, action) => {
    
                return {
                    ...state,
                    loading: false,
                    UpcomDemoList: action.payload
                };
            }),
    
        on(DemoActions.loadUpcomingError,
            (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };
            }),

);

export function DemoReducer(
    state: IDemoState | undefined,
    action: Action
) {
    return reducer(state, action);
}





