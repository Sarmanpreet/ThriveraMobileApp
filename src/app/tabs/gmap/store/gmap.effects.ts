import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, switchMap, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as gmapActions from "./gmap.actions";
import { GenericCallService } from "src/app/shared/services/genericCall.service";
import { Session } from "protractor";
import { SessionCheck } from "src/app/shared/session/sessioncheck.service";

@Injectable()
export class gmapEffects {
  loadgmap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gmapActions.loadgmap),
      mergeMap(data =>
        this.service
          .postMethodWithToken(
            "Sp_ion_SaveLocation",
            this.session.getlocalStorage("token"),
            data.payload
          )
          .pipe(
            map(result => {
              return gmapActions.loadgmapSuccess({ payload: result[0] });
            }),
            catchError(error =>
              of(gmapActions.loadgmapError({ payload: error }))
            )
          )
      )
    )
  );

  saveCheckIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gmapActions.addCheckIn),
      mergeMap(data =>
        this.service
          .postMethodWithToken(
            "Sp_ion_SaveLocation",
            this.session.getlocalStorage("token"),
            data.payload
          )
          .pipe(
            map(result => {
              return gmapActions.addCheckInSuccess(result[0][0]);
            }),
            catchError(error => of(gmapActions.addCheckInError()))
          )
      )
    )
  );



  
  constructor(
    private actions$: Actions,
    private service: GenericCallService,
    private session: SessionCheck
  ) {}
}
