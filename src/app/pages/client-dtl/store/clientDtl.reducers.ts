
import { act } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { CompContacts } from 'src/app/interfaces/contacts.interface';
import * as ClientDtlActions from '../store/clientDtl.actions';

export interface IClientDtlState {
    contacts: CompContacts[];
    comments: Comment[];
    loading: boolean;
    isSuccess: boolean;
    demoStatus:boolean;
    serverResponse: any;
    error: any;
    Message:any;
    Status:any
}

export const initialClientDtlState: IClientDtlState = {
    contacts: [],
    comments: [],
    loading: false,
    serverResponse: null,
    demoStatus:null,
    error: null,
    isSuccess: null,
    Message:null,
    Status:null
};


export const reducer = createReducer(

    initialClientDtlState,

    on(ClientDtlActions.resetClientDtlState,
        (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }),
        on(ClientDtlActions.loadClientDtl,
            (state, action) => {
                debugger;
                return {
                    ...state,
                    loading: true,
                    isSuccess: false
                };
            }),
    on(ClientDtlActions.loadClientContacts,
        (state, action) => {
            return {
                ...state,
                loading: true,
                isSuccess: false
            };
        }),


    on(ClientDtlActions.loadClientContactsSuccess,
        (state, action) => {

            return {
                ...state,
                loading: false,
                contacts: action.payload
            };
        }),

    on(ClientDtlActions.loadClientContactsError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }),


    on(ClientDtlActions.loadClientComments,
        (state, action) => {
            return {
                ...state,
                loading: true,
                isSuccess: null,
                comments: null
            };
        }),

    on(ClientDtlActions.loadClientCommentsSuccess,
        (state, action) => {

            return {
                ...state,
                loading: false,
                comments: action.payload
            };
        }),

    on(ClientDtlActions.loadClientCommentsError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }),

    on(ClientDtlActions.addClientComments,
        (state, action) => {
            return {
                ...state,
                loading: true,
                isSuccess: false
            };
        }),

    on(ClientDtlActions.addClientCommentsSuccess,
        (state, action) => {

            return {
                ...state,
                loading: false,
                isSuccess: true,
            };
        }),

    on(ClientDtlActions.addClientCommentsError,
        (state, action) => {
            return {
                ...state,
                loading: false,
                isSuccess: false
            };
        }),

        on(ClientDtlActions.onStartDemo,
            (state, action) => {
                debugger;
                return {
                    ...state,
                    loading: true,
                    demoStatus: false
                };
            }),
    
        on(ClientDtlActions.onStartDemoSuccess,
            (state, action) => {
    debugger;
                return {
                    ...state,
                    loading: false,
                    demoStatus: true,
                    Message: action.payload
                };
            }),
    
        on(ClientDtlActions.onStartDemoError,
            (state, action) => {
                return {
                    ...state,
                    loading: false,
                    demoStatus: false
                };
            }),

            on(ClientDtlActions.onStopDemo,
                (state, action) => {
                    return {
                        ...state,
                        loading: true,
                        demoStatus: false
                    };
                }),
        
            on(ClientDtlActions.onStopDemoSuccess,
                (state, action) => {
        
                    return {
                        ...state,
                        loading: false,
                        demoStatus: true,
                    };
                }),
        
            on(ClientDtlActions.onStopDemoError,
                (state, action) => {
                    return {
                        ...state,
                        loading: false,
                        demoStatus: false
                    };
                }),

                on(ClientDtlActions.onCheckDemo,
                    (state, action) => {
                        return {
                            ...state,
                            loading: true,
                            
                        };
                    }),
            
                on(ClientDtlActions.onCheckDemoSuccess,
                    (state, action) => {
            
                        return {
                            ...state,
                            loading: false,
                            serverResponse: action.payload
                        };
                    }),
            
                on(ClientDtlActions.onCheckDemoError,
                    (state, action) => {
                        return {
                            ...state,
                            loading: false,
                            serverResponse: action.payload
                        };
                    }),
                    on(ClientDtlActions.loadFeedBackStatus,
                        (state, action) => {
                            return {
                                ...state,
                                loading: true,
                                
                            };
                        }),
                
                    on(ClientDtlActions.loadFeedBackStatusSuccess,
                        (state, action) => {
                
                            return {
                                ...state,
                                loading: false,
                                Status: action.payload
                            };
                        }),
                
                    on(ClientDtlActions.loadFeedBackStatusError,
                        (state, action) => {
                            return {
                                ...state,
                                loading: false,
                                Status: action.payload
                            };
                        }),

);
export function clientDtlReducer(
    state: IClientDtlState | undefined,
    action: Action
) {
    return reducer(state, action);
}
