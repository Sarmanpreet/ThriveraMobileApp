import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../store/auth.actions';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';

@Injectable()
export class AuthEffects {

    login$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(AuthActions.login),
                mergeMap(
                    (data) => this.service.postMethodWithoutToken('GetLogin/other/auth', data.payload)
                        .pipe(
                            map(result => {
                                // Just to get the headers from the response in mutable way before passing into reducer 
                                result.headers.get('Token');
                                return AuthActions.loginSuccess({ payload: result });
                            }),
                            catchError(error => of(AuthActions.loginError({ payload: error })))
                        )
                ))
    );

    register$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(AuthActions.register),
                mergeMap(
                    (data) => this.service.postMethodWithToken('SP_Registeruser/UserRegister',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                return AuthActions.registerSuccess({ payload: result[0][0] });
                            }),
                            catchError(error => of(AuthActions.registerError({ payload: error })))
                        )
                ))
    );
    checkSession$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(AuthActions.checkSession),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetSessionExists',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {
                                return AuthActions.checkSessionSuccess({ payload: result[0][0] });
                            }),
                            catchError(error => of(AuthActions.checkSessionError({ payload: error })))
                        )
                ))
    );
    Menusettings$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(AuthActions.Menusettings),
                mergeMap(
                    (data) => this.service.postMethodWithToken('GetModuleListWithMenunameRoleWise',
                        this.session.getlocalStorage('token'),
                        data.payload)
                        .pipe(
                            map(result => {

                                return AuthActions.MenusettingsSuccess({ payload: result[0] });
                            }),
                            catchError(error => of(AuthActions.MenusettingsError({ payload: error })))
                        )
                ))
    );
    constructor(private actions$: Actions,
        private service: GenericCallService,
        private session: SessionCheck
    ) { }
}
