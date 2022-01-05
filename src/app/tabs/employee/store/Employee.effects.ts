import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as EmpActions from './Employee.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class EmployeeEffects {

    GetCalender$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.GetCalender),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetCalenderEvents', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {
                                debugger;
                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.GetCalenderSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.GetCalenderError({ payload: error })))
                        )
                ))
    );
    GetAttandenceDDL$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.GetAttandenceDDL),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetAttendenceStatus', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.GetAttandenceDDLSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.GetAttandenceDDLError({ payload: error })))
                        )
                ))

    );

    SaveAttachementImage$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.SaveAttachementImage),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SetMasterAttachment_SSR/Fileupload', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.SaveAttachementImageSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.SaveAttachementImageError({ payload: error })))
                        )
                ))

    );
    SaveAttandence$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.SaveAttandence),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SetAttendenceLog', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                debugger;
                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.SaveAttandenceSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.SaveAttandenceError({ payload: error })))
                        )
                ))

    );

    GetSaleEntryList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.GetSaleEntryList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetSaleEntryList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                debugger;
                                // Just to get the headers from the response in mutable way before passing into reducer 
                                if (result[0][0].approved == 0) {
                                    return EmpActions.GetSaleEntryListPendingSuccess({ payload: result[0] });
                                }
                                else {
                                    return EmpActions.GetSaleEntryListApprovedSuccess({ payload: result[0] });
                                }
                            }),
                            catchError(error => of(EmpActions.GetSaleEntryListError({ payload: error })))
                        )
                ))


    );

    GetSalesEntryDDL$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.GetSalesEntryDDL),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetSaleEntry', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.GetSalesEntryDDLSuccess({ payload: result });
                            }),
                            catchError(error => of(EmpActions.GetSalesEntryDDLError({ payload: error })))
                        )
                ))

    );
    GetCityDDL$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.GetCityDDL),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetDropDownList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.GetCityDDLSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.GetCityDDLError({ payload: error })))
                        )
                ))

    );
    GetProductDDL$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.GetProductDDL),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetDropDownList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.GetProductDDLSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.GetProductDDLError({ payload: error })))
                        )
                ))

    );
    GetSubProductDDL$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.GetSubProductDDL),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetDropDownList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.GetSubProductDDLSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.GetSubProductDDLError({ payload: error })))
                        )
                ))

    );
    GetItemDDL$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.GetItemDDL),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetDropDownList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return EmpActions.GetItemDDLSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.GetItemDDLError({ payload: error })))
                        )
                ))

    );
    SaveSalesEntry$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.SaveSalesEntry),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SetSaleEntry', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {
                                return EmpActions.SaveSalesEntrySuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.SaveSalesEntryError({ payload: error })))
                        )
                ))

    )
    DeleteEntry$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(EmpActions.DeleteEntry),
                mergeMap(
                    (data) => this.service.postMethodWithToken('DelRecord', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {
                                return EmpActions.DeleteEntrySuccess({ payload: result[0] });
                            }),
                            catchError(error => of(EmpActions.DeleteEntryError({ payload: error })))
                        )
                ))

    )
    constructor(private actions$: Actions,
        private service: GenericCallService,
        private session: SessionCheck
    ) { }
}
