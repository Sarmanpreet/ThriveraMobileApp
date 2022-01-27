import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as rfcActions from './Rfc.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class RFCeffects {
    GetRFCPendingList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(rfcActions.GetRFCPendingList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetRFCEntryList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {
                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return rfcActions.GetRFCPendingListSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(rfcActions.GetRFCPendingListError({ payload: error })))
                        )
                ))

    );

    GetLeaveattandenceStatus$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(rfcActions.GetLeaveattandenceStatus),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetAttendenceStatus', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {
                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return rfcActions.GetLeaveattandenceStatusSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(rfcActions.GetLeaveattandenceStatusError({ payload: error })))
                        )
                ))

    );
    GetRFCRejectedList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(rfcActions.GetRFCRejectedList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetRFCEntryList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return rfcActions.GetRFCRejectedListSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(rfcActions.GetRFCRejectedListError({ payload: error })))
                        )
                ))

    );

    GetRFCApprovedList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(rfcActions.GetRFCApprovedList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetRFCEntryList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return rfcActions.GetRFCApprovedListSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(rfcActions.GetRFCApprovedListError({ payload: error })))
                        )
                ))

    );
    GetOldAttandenceStatus$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(rfcActions.GetOldAttandenceStatus),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetDropDownList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return rfcActions.GetOldAttandenceStatusSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(rfcActions.GetOldAttandenceStatusError({ payload: error })))
                        )
                ))

    );
    GetNewAttandenceStatus$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(rfcActions.GetNewttandenceStatus),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetDropDownList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return rfcActions.GetNewttandenceStatusSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(rfcActions.GetNewttandenceStatusError({ payload: error })))
                        )
                ))

    );
    saveRFCEntry$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(rfcActions.saveRFCEntry),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SetRFCEntry', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return rfcActions.saveRFCEntrySuccess({ payload: result[0] });
                            }),
                            catchError(error => of(rfcActions.saveRFCEntryError({ payload: error })))
                        )
                ))

    );
    constructor(private actions$: Actions,
        private service: GenericCallService,
        private session: SessionCheck
    ) { }
}
