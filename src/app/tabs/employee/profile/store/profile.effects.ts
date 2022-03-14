import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as profileActions from '../store/profile.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { Session } from 'protractor';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class profileEffects {

    loadprofile$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(profileActions.loadprofile),
                mergeMap(
                    (data) => this.service.postMethodWithToken('Getuserprtofileinfo',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                return profileActions.loadprofileSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(profileActions.loadprofileError({ payload: error })))
                        )
                ))
    );
    constructor(private actions$: Actions, private service: GenericCallService, private session: SessionCheck) { }
}
