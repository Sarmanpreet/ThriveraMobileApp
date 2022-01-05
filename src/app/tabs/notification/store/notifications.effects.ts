import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as notificationActions from '../store/notification.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { Session } from 'protractor';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class notificationEffects {

    loadnotification$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(notificationActions.loadnotification),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SP_MVC_GetNotification',
                    this.session.getlocalStorage('token'),
                    data.payload)
                        .pipe(
                            map(result => {
                                return notificationActions.loadnotificationSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(notificationActions.loadnotificationError({ payload: error })))
                        )
                ))
    );
    constructor(private actions$: Actions, private service: GenericCallService, private session: SessionCheck) { }
}
