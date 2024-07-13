// brod.actions.ts

import { createAction, props } from '@ngrx/store';
import { Brod } from '../models/brod';

export const addBrod = createAction('[Brod] Add Brod', props<{ brod: Brod }>());
export const removeBrod = createAction('[Brod] Remove Brod', props<{ brodId: number }>());
