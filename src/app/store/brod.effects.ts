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


  // Efekt za updejt broda
  updateBrod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrodActions.updateBrod),  
      mergeMap(action =>
        this.brodService.updateBrod(action.brod).pipe(
          map((updatedBrod) => BrodActions.updateBrodSuccess({ brod: updatedBrod })),  
          catchError((error) => of(BrodActions.updateBrodFailure({ error })))  
        )
      )
    )
  );


    // Efekt za ucitavanje brodova na osnovu port id
    loadBrodsByPortId$ = createEffect(() => this.actions$.pipe(
      ofType(BrodActions.loadBrodsByPortId),
      mergeMap(action => this.brodService.getShipsByPortId(action.portId)
        .pipe(
          map(brods => ({ type: '[Brod List] Brods Loaded Success', payload: brods })),
          catchError(() => of({ type: '[Brod List] Brods Loaded Error' }))
        ))
    ));

  constructor(
    private actions$: Actions,
    private brodService: BrodService
  ) {}
}
