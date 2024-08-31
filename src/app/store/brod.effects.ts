import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BrodService } from '../services/brodovi.service';
import * as BrodActions from './brod.action';

@Injectable()
export class BrodEffects {

  loadBrods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrodActions.loadBrods),
      mergeMap(() =>
        this.brodService.fetchBrods().pipe(
          map(brods => BrodActions.loadBrodsSuccess({ brods })),
          catchError(error => of(BrodActions.loadBrodsFailure({ error })))
        )
      )
    )
  );

  addBrod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrodActions.addBrod),
      mergeMap(({ brod }) =>
        this.brodService.addBrod(brod).pipe(
          map(createdBrod => BrodActions.addBrodSuccess({ brod: createdBrod })),
          catchError(error => of(BrodActions.addBrodFailure({ error })))
        )
      )
    )
  );

  removeBrod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrodActions.removeBrod),
      mergeMap(({ brodId }) =>
        this.brodService.removeBrod(brodId).pipe(
          map(() => BrodActions.removeBrodSuccess({ brodId })),
          catchError(error => of(BrodActions.removeBrodFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private brodService: BrodService
  ) {}
}
