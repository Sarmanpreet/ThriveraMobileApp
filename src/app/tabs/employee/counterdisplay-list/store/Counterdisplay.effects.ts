import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CounterActions from './Counterdisplay.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class Counterdisplayeffects {



    GetMOPProductList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CounterActions.GetCDEditList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetCounterDisplay', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return CounterActions.GetCDEditListSuccess({ payload: result });
                            }),
                            catchError(error => of(CounterActions.GetCDEditListError({ payload: error })))
                        )
                ))

    );
    saveCounterDisplay$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CounterActions.saveCounterDisplay),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SetCounterDisplay', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return CounterActions.saveCounterDisplaySuccess({ payload: result[0] });
                            }),
                            catchError(error => of(CounterActions.saveCounterDisplayError({ payload: error })))
                        )
                ))

    );
    GetCDList$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CounterActions.GetCDList),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetCounterDisplayList', this.session.getlocalStorage('token'), data.payload)
                        .pipe(
                            map(result => {

                                // Just to get the headers from the response in mutable way before passing into reducer 

                                return CounterActions.GetCDListSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(CounterActions.GetCDListError({ payload: error })))
                        )
                ))

    );
    constructor(private actions$: Actions,
        private service: GenericCallService,
        private session: SessionCheck
    ) { }
}
