// store/luka.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LukaActions from './luka.action';
import { LukaService } from '../services/luka.service'; // Assume you have a service for API calls

@Injectable()
export class LukaEffects {

  constructor(private actions$: Actions, private lukaService: LukaService) {}

  loadLukas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LukaActions.loadLukas),
      switchMap(() =>
        this.lukaService.getPorts().pipe(
          map(lukas => LukaActions.loadLukasSuccess({ lukas })),
          catchError(error => of(LukaActions.loadLukasFailure({ error })))
        )
      )
    )
  );
  
  addLuka$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LukaActions.addLuka),
      switchMap(action =>
        this.lukaService.addPort(action.luka).pipe(
          map(luka => LukaActions.addLukaSuccess({ luka })),
          catchError(error => of(LukaActions.addLukaFailure({ error })))
        )
      )
    )
  );

    addPort$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LukaActions.addPort),
        mergeMap(({ port }) =>
          this.lukaService.addPort(port).pipe(
            map((newPort) => LukaActions.addPortSuccess({ port: newPort })),
            catchError((error) => of(LukaActions.addPortFailure({ error })))
          )
        )
      )
    );
  
  // removeLuka$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(LukaActions.removeLuka),
  //     switchMap(action =>
  //       this.lukaService.removeLuka(action.lukaId).pipe(
  //         map(() => LukaActions.removeLukaSuccess({ lukaId: action.lukaId })),
  //         catchError(error => of(LukaActions.removeLukaFailure({ error })))
  //       )
  //     )
  //   )
  // );
}
