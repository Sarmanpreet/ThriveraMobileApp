
import { Action, createReducer, on } from '@ngrx/store';
import { profile } from 'src/app/interfaces/profile.interface';

import * as profileActions from '../store/profile.actions';

export interface IprofileState {
    profileList: profile[];
    loading: boolean;
    serverResponse: any;
    error: any;
}

export const initialprofileState: IprofileState = {
    profileList: [],
    loading: false,
    serverResponse: null,
    error: null
};


export const reducer = createReducer(

    initialprofileState,

    on(profileActions.resetprofileState,
        (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }),

    on(profileActions.loadprofile,
        (state, action) => {
            return {
                ...state,
                loading: true,
            };
        }),


    on(profileActions.loadprofileSuccess,
        (state, action) => {

            return {
                ...state,
                loading: false,
                profileList: action.payload
            };
        }),

    on(profileActions.loadprofileError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }),

);

export function profileReducer(
    state: IprofileState | undefined,
    action: Action
) {
    return reducer(state, action);
}





