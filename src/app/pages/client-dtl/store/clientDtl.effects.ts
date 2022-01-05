import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientDtlActions from '../store/clientDtl.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { Session } from 'protractor';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class ClientDtlEffects {

    loadClientContacts$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientDtlActions.loadClientContacts),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SP_ion_GetCompContactsList',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                return ClientDtlActions.loadClientContactsSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(ClientDtlActions.loadClientContactsError({ payload: error })))
                        )
                ))
    );
    loadClientDtl$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientDtlActions.loadClientDtl),
                mergeMap(
                    (data) => this.service.postMethodWithToken('Sp_GetCustomerDtl',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                debugger;
                                return ClientDtlActions.loadClientContactsSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(ClientDtlActions.loadClientContactsError({ payload: error })))
                        )
                ))
    );


    loadClientComments$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientDtlActions.loadClientComments),
                mergeMap(
                    (data) => this.service.postMethodWithToken('Sp_GetCustomerComment',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                debugger;
                                return ClientDtlActions.loadClientCommentsSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(ClientDtlActions.loadClientCommentsError({ payload: error })))
                        )
                ))
    );

    saveClientComments$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientDtlActions.addClientComments),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SP_AddNewDemoComment/',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                            debugger;
                                return ClientDtlActions.addClientCommentsSuccess();
                            }),
                            catchError(error => of(ClientDtlActions.addClientCommentsError())
                            )
                        ))
            )
    );

    startClientDemo$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientDtlActions.onStartDemo),
                mergeMap(
                    (data) => this.service.postMethodWithToken('Sp_StartMeeting/DemoStart',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                debugger;
                                console.log(data.payload)
                                return ClientDtlActions.onStartDemoSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(ClientDtlActions.onStartDemoError({ payload: error })))
                        )
                ))
    );

    stopClientDemo$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientDtlActions.onStopDemo),
                mergeMap(
                    (data) => this.service.postMethodWithToken('Sp_StopMeeting/DemoStop',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                debugger;
                                return ClientDtlActions.onStopDemoSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(ClientDtlActions.onStopDemoError({ payload: error })))
                        )
                ))
    );

    loadFeedBackStatus$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientDtlActions.loadFeedBackStatus),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SP_GetDemoFeedbackStatusList',
                        this.session.getlocalStorage('token'),null)                        
                        .pipe(
                            map(result => {
                                return ClientDtlActions.loadFeedBackStatusSuccess({ payload: result });
                            }),
                            catchError(error => of(ClientDtlActions.loadFeedBackStatusError({ payload: error })))
                        )
                ))
    );

    checkClientDemo$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientDtlActions.onCheckDemo),
                mergeMap(
                    (data) => this.service.postMethodWithToken('Sp_CheckTodayMeetingStatus',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                debugger;
                                return ClientDtlActions.onCheckDemoSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(ClientDtlActions.onCheckDemoError({ payload: error })))
                        )
                ))
    );

    constructor(private actions$: Actions, private service: GenericCallService, private session: SessionCheck) { }
}
