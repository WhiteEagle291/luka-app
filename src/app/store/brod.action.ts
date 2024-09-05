// brod.action.ts

import { createAction, props } from '@ngrx/store';
import { Brod } from '../models/brod';

export const loadBrods = createAction('[Brod] Load Brods');
export const loadBrodsSuccess = createAction('[Brod] Load Brods Success', props<{ brods: Brod[] }>());
export const loadBrodsFailure = createAction('[Brod] Load Brods Failure', props<{ error: any }>());

export const addBrod = createAction('[Brod] Add Brod', props<{ brod: Brod }>());
export const addBrodSuccess = createAction('[Brod] Add Brod Success', props<{ brod: Brod }>());
export const addBrodFailure = createAction('[Brod] Add Brod Failure', props<{ error: any }>());

export const removeBrod = createAction('[Brod] Remove Brod', props<{ brodId: number }>());
export const removeBrodSuccess = createAction('[Brod] Remove Brod Success', props<{ brodId: number }>());
export const removeBrodFailure = createAction('[Brod] Remove Brod Failure', props<{ error: any }>());



// export const addBrod = createAction(
//     '[Brod] Add Brod',
//     props<{ brod: Brod }>()
//   );
  
  export const deleteBrod = createAction(
    '[Brod] Delete Brod',
    props<{ id: number }>()
  );

/////////////// UPDATE
  // Define an action to update a ship (brod)
export const updateBrod = createAction(
  '[Brod] Update Brod',
  props<{ brod: Brod }>()  // Payload contains the updated brod object
);

// Optionally: Define success/failure actions for better effect handling
export const updateBrodSuccess = createAction(
  '[Brod] Update Brod Success',
  props<{ brod: Brod }>()
);

export const updateBrodFailure = createAction(
  '[Brod] Update Brod Failure',
  props<{ error: any }>()
);
  