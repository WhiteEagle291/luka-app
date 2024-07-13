// brod.reducer.ts

import { Action, createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Brod } from '../models/brod';
import * as BrodActions from './brod.action';

export interface BrodState extends EntityState<Brod> {
    // Additional properties specific to your Brod state if any
  }

export const brodAdapter: EntityAdapter<Brod> = createEntityAdapter<Brod>();


export const initialBrodState: BrodState = brodAdapter.getInitialState({
    // Additional initial state properties if any
  });

export const brodReducer = createReducer(
  initialBrodState,
  on(BrodActions.addBrod, (state, { brod }) => brodAdapter.addOne(brod, state)),
  on(BrodActions.removeBrod, (state, { brodId }) => brodAdapter.removeOne(brodId, state))
);

export const { selectAll, selectIds, selectEntities, selectTotal } = brodAdapter.getSelectors();

export function reducer(state: BrodState | undefined, action: Action) {
  return brodReducer(state, action);
}

export interface AppState {
    brodovi: Brod[];
    selectedBrod: number;
  }