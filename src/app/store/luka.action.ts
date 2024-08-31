// store/luka.action.ts

import { createAction, props } from '@ngrx/store';
import { Luka } from '../models/luka';

export const loadLukas = createAction('[Luka] Load Lukas');
export const loadLukasSuccess = createAction('[Luka] Load Lukas Success', props<{ lukas: Luka[] }>());
export const loadLukasFailure = createAction('[Luka] Load Lukas Failure', props<{ error: any }>());

export const addLuka = createAction('[Luka] Add Luka', props<{ luka: Luka }>());
export const addLukaSuccess = createAction('[Luka] Add Luka Success', props<{ luka: Luka }>());
export const addLukaFailure = createAction('[Luka] Add Luka Failure', props<{ error: any }>());

export const removeLuka = createAction('[Luka] Remove Luka', props<{ lukaId: number }>());
export const removeLukaSuccess = createAction('[Luka] Remove Luka Success', props<{ lukaId: number }>());
export const removeLukaFailure = createAction('[Luka] Remove Luka Failure', props<{ error: any }>());
