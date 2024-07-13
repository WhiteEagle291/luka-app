import { createSelector, createFeatureSelector } from '@ngrx/store';
import { brodAdapter, BrodState } from './brod.reducer';

// Create a feature selector for the brod state
export const selectBrodState = createFeatureSelector<BrodState>('brodovi');

// Create selectors for specific parts of the brod state
// export const selectAllBrods = createSelector(
//     selectBrodState,
//     brodAdapter.getSelectors().selectAll
//   );

  export const {
    selectAll: selectAllBrods,
    selectIds,
    selectEntities,
    selectTotal,
  } = brodAdapter.getSelectors(selectBrodState);

export const selectBrodIds = createSelector(selectBrodState, (state) => state.ids);
export const selectBrodEntities = createSelector(selectBrodState, (state) => state.entities);
export const selectBrodCount = createSelector(selectBrodState, (state) => state.ids.length);
