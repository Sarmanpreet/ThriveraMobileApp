import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientsActions from '../store/clients.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { Session } from 'protractor';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class ClientsEffects {

    loadClients$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ClientsActions.loadClients),
                mergeMap(
                    (data) => this.service.postMethodWithToken('sp_GetCustomerByRouteId',
                    this.session.getlocalStorage('token'),
                    data.payload)
                        .pipe(
                            map(result => {
                                return ClientsActions.loadClientsSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(ClientsActions.loadClientsError({ payload: error })))
                        )
                ))
    );
    constructor(private actions$: Actions, private service: GenericCallService, private session: SessionCheck) { }
}
