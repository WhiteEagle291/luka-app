// brod.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Brod } from '../models/brod';
import * as BrodActions from './brod.action';

export interface BrodState extends EntityState<Brod> {
  error: any;
}

export const brodAdapter: EntityAdapter<Brod> = createEntityAdapter<Brod>();

export const initialBrodState: BrodState = brodAdapter.getInitialState({
  error: null,
});

export const brodReducer = createReducer(
  initialBrodState,
  on(BrodActions.addBrodSuccess, (state, { brod }) => brodAdapter.addOne(brod, state)),
  on(BrodActions.removeBrodSuccess, (state, { brodId }) => brodAdapter.removeOne(brodId, state)),
  on(BrodActions.loadBrodsSuccess, (state, { brods }) => brodAdapter.setAll(brods, state)),
  on(BrodActions.loadBrodsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const { selectAll, selectIds, selectEntities, selectTotal } = brodAdapter.getSelectors();

export function reducer(state: BrodState | undefined, action: Action) {
  return brodReducer(state, action);
}
