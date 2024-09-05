import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { BrodService } from '../services/brodovi.service';
import * as BrodActions from './brod.action';

@Injectable()
export class BrodEffects {

  loadBrods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrodActions.loadBrods),
      switchMap(() => 
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
      switchMap(action =>
        this.brodService.addBrod(action.brod).pipe(
          map(brod => BrodActions.addBrodSuccess({ brod })),
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


  // Effect to handle updating a ship (brod)
  updateBrod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrodActions.updateBrod),  // Use BrodActions.updateBrod to reference the action
      mergeMap(action =>
        this.brodService.updateBrod(action.brod).pipe(
          map((updatedBrod) => BrodActions.updateBrodSuccess({ brod: updatedBrod })),  // Success action
          catchError((error) => of(BrodActions.updateBrodFailure({ error })))  // Failure action
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private brodService: BrodService
  ) {}
}
