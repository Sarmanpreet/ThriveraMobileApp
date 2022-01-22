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
    constructor(private actions$: Actions,
        private service: GenericCallService,
        private session: SessionCheck
    ) { }
}
