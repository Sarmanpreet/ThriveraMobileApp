
import { Action, createReducer, on } from '@ngrx/store';
import { Routes } from 'src/app/interfaces/routes.interface';
import * as RoutesActions from '../store/route.actions';

export interface IRoutesState {
    RouteList: Routes[];
    loading: boolean;
    serverResponse: any;
    error: any;
}

export const initialRoutesState: IRoutesState = {
    RouteList: [],
    loading: false,
    serverResponse: null,
    error: null
};


export const reducer = createReducer(

    initialRoutesState,

    on(RoutesActions.resetRouteState,
        (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }),

    on(RoutesActions.loadRoutes,
        (state, action) => {            
            return {            
                ...state,
                loading: true,
            };
        }),


    on(RoutesActions.loadRoutesSuccess,
        (state, action) => {
            return {
                ...state,
                loading: false,
                RouteList: action.payload
            };
        }),

    on(RoutesActions.loadRoutesError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }),

);

export function routeReducer(
    state: IRoutesState | undefined,
    action: Action
) {
    return reducer(state, action);
}





