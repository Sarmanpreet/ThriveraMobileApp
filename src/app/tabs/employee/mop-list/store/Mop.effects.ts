import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MopActions from './Mop.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class Mopffects {



    GetMOPProductList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MopActions.GetMOPProductList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetMOP', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return MopActions.GetMOPProductListSuccess({ payload: result });
                            }),
                            catchError(error => of(MopActions.GetMOPProductListError({ payload: error })))
                        )
                ))

    );
    saveMOPEntry$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MopActions.saveMOPEntry),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SetMOP', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return MopActions.saveMOPEntrySuccess({ payload: result[0] });
                            }),
                            catchError(error => of(MopActions.saveMOPEntryError({ payload: error })))
                        )
                ))

    );
    GetCompetitionList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MopActions.GetCompetitionList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetCompetitionEntryList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return MopActions.GetCompetitionListSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(MopActions.GetCompetitionListError({ payload: error })))
                        )
                ))

    );
    saveCompetitionEntry$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MopActions.saveCompetitionEntry),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SetCompetitionEntry', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return MopActions.saveCompetitionEntrySuccess({ payload: result[0] });
                            }),
                            catchError(error => of(MopActions.saveCompetitionEntryError({ payload: error })))
                        )
                ))

    );
    GetLeavePendingList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MopActions.GetLeavePendingList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetLeaveLogList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return MopActions.GetLeavePendingListSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(MopActions.GetLeavePendingListError({ payload: error })))
                        )
                ))

    );
    GetLeaveApprovedList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MopActions.GetLeaveApprovedList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetLeaveLogList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return MopActions.GetLeaveApprovedListSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(MopActions.GetLeaveApprovedListError({ payload: error })))
                        )
                ))

    );
    GetLeaveRejectedList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MopActions.GetLeaveRejectedList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetLeaveLogList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return MopActions.GetLeaveRejectedListSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(MopActions.GetLeaveRejectedListError({ payload: error })))
                        )
                ))

    );
    saveLeaves$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MopActions.saveLeaves),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SetLeaveLog_App', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return MopActions.saveLeavesSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(MopActions.saveLeavesError({ payload: error })))
                        )
                ))

    );
    constructor(private actions$: Actions,
        private service: GenericCallService,
        private session: SessionCheck
    ) { }
}
