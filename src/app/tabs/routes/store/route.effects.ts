import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RoutesActions from '../store/route.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class RoutesEffects {

    loadClients$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(RoutesActions.loadRoutes),
                mergeMap(
            // (data) => this.service.postMethodWithToken('Sp_GetRouteListbyUserid',
                    
                    (data) => this.service.postMethodWithToken('Sp_GetRoutesbyUserid',
                     this.session.getlocalStorage('token'),
                    data.payload)
                        .pipe(
                            map(result => {
                             
                                return RoutesActions.loadRoutesSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(RoutesActions.loadRoutesError({ payload: error })))
                        )
                ))
    );
    constructor(private actions$: Actions, private service: GenericCallService, private session: SessionCheck) { }
}
