// store/luka.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LukaActions from './luka.action';
import { LukaService } from '../services/luka.service'; // Assume you have a service for API calls

@Injectable()
export class LukaEffects {

  constructor(private actions$: Actions, private lukaService: LukaService) {}

//   loadLukas$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(LukaActions.loadLukas),
//       mergeMap(() =>
//         this.lukaService.getLukas().pipe(
//           map(lukas => LukaActions.loadLukasSuccess({ lukas })),
//           catchError(error => of(LukaActions.loadLukasFailure({ error })))
//         )
//       )
//     )
//   );

//   addLuka$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(LukaActions.addLuka),
//       mergeMap(action =>
//         this.lukaService.addLuka(action.luka).pipe(
//           map(luka => LukaActions.addLukaSuccess({ luka })),
//           catchError(error => of(LukaActions.addLukaFailure({ error })))
//         )
//       )
//     )
//   );

//   removeLuka$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(LukaActions.removeLuka),
//       mergeMap(action =>
//         this.lukaService.removeLuka(action.lukaId).pipe(
//           map(() => LukaActions.removeLukaSuccess({ lukaId: action.lukaId })),
//           catchError(error => of(LukaActions.removeLukaFailure({ error })))
//         )
//       )
//     )
//   );
}
