import { from } from 'rxjs';
import { loadsavedlocations } from './savedlocations.actions';
import { savedlocations } from './../../../interfaces/savedlocations.interface';
import * as savedlocationsActions from '../store/savedlocations.actions';
import { Action, createReducer, on } from '@ngrx/store';


export interface IsavedlocationsState {
    savedlocationsList: savedlocations[];
    loading: boolean;
    serverResponse: any;
    error: any;
}

export const initialsavedlocationsState: IsavedlocationsState = {
    savedlocationsList: [],
    loading: false,
    serverResponse: null,
    error: null
};


export const reducer = createReducer(

    initialsavedlocationsState,

    on(savedlocationsActions.resetsavedlocationsState,
        (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }),

    on(savedlocationsActions.loadsavedlocations,
        (state, action) => {
            return {
                ...state,
                loading: true,
            };
        }),


    on(savedlocationsActions.loadsavedlocationsSuccess,
        (state, action) => {

            return {
                ...state,
                loading: false,
                savedlocationsList: action.payload
            };
        }),

    on(savedlocationsActions.loadsavedlocationsError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }),

);

export function savedlocationsReducer(
    state: IsavedlocationsState | undefined,
    action: Action
) {
    return reducer(state, action);
}





