import { createSelector, createFeatureSelector } from '@ngrx/store';
import { brodAdapter, BrodState } from './brod.reducer';
import { AppState } from '../app.state';


export const selectBrodState = (state: AppState) => state.brod;



export const {
  selectIds: selectBrodIds,
  selectEntities: selectBrodEntities,
  // selectAll: selectAllBrods,
  selectTotal: selectBrodCount,
} = brodAdapter.getSelectors(selectBrodState);

export const selectAllBrods = createSelector(
  selectBrodState,
  (state: BrodState) => state.brods
);


// export const selectBrodIds = createSelector(selectBrodState, (state) => state.ids);
// export const selectBrodEntities = createSelector(selectBrodState, (state) => state.entities);
// export const selectBrodCount = createSelector(selectBrodState, (state) => state.ids.length);
