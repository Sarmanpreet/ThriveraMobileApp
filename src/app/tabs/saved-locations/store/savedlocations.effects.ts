import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as savedlocationsActions from './savedlocations.actions';
import { GenericCallService } from '../../../shared/services/genericCall.service';
import { SessionCheck } from '../../../shared/session/sessioncheck.service';

@Injectable()
export class savedLocationsEffect {


    loadsavedlocations$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(savedlocationsActions.loadsavedlocations),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SP_ion_GetEmpSavedLocation',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                return savedlocationsActions.loadsavedlocationsSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(savedlocationsActions.loadsavedlocationsError({ payload: error })))
                        )
                ))
    );
    constructor(private actions$: Actions, private service: GenericCallService, private session: SessionCheck) { }
}
