import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as DemoActions from '../store/Pend-upcom-action'
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { Session } from 'protractor';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class DemoEffects {

    loadPendingDemo$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(DemoActions.loadPendingDemo),
                mergeMap(
                   
                    (data) => this.service.postMethodWithToken('sp_GetPendingDemoByEmpId',
                    this.session.getlocalStorage('token'),
                    data.payload)
                        .pipe(
                            map(result => {
                                debugger;
                                return DemoActions.loadPendingDemoSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(DemoActions.loadPendingDemoError({ payload: error })))
                        )
                ))
    );
    loadUpcomingDemo$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(DemoActions.loadUpcomingDemo),
                mergeMap(
                   
                    (data) => this.service.postMethodWithToken('sp_GetUpcomingDemoByEmpId',
                    this.session.getlocalStorage('token'),
                    data.payload)
                        .pipe(
                            map(result => {
                                debugger;
                                return DemoActions.loadUpcomingSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(DemoActions.loadUpcomingError({ payload: error })))
                        )
                ))
    );
    constructor(private actions$: Actions, private service: GenericCallService, private session: SessionCheck) { }
}