
import { Action, createReducer, on } from '@ngrx/store';
import { Clients } from 'src/app/interfaces/clients.interface';
import * as ClientsActions from '../store/clients.actions';

export interface IClientsState {
    clientList: Clients[];
    loading: boolean;
    serverResponse: any;
    error: any;
}

export const initialClientsState: IClientsState = {
    clientList: [],
    loading: false,
    serverResponse: null,
    error: null
};


export const reducer = createReducer(

    initialClientsState,

    on(ClientsActions.resetClientsState,
        (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }),

    on(ClientsActions.loadClients,
        (state, action) => {
            return {
                ...state,
                loading: true,
            };
        }),


    on(ClientsActions.loadClientsSuccess,
        (state, action) => {

            return {
                ...state,
                loading: false,
                clientList: action.payload
            };
        }),

    on(ClientsActions.loadClientsError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }),

);

export function clientsReducer(
    state: IClientsState | undefined,
    action: Action
) {
    return reducer(state, action);
}





