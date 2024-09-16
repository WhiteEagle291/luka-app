
import { Action, createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Brod } from '../models/brod';
import * as BrodActions from './brod.action';


export interface BrodState extends EntityState<Brod> {
  brods: any;
  loading: boolean;
  error: any;
}

export const brodAdapter: EntityAdapter<Brod> = createEntityAdapter<Brod>();

export const initialState: BrodState = brodAdapter.getInitialState({
  brods:[],
  loading: false,
  error: null,
});

export const brodReducer = createReducer(
  initialState,
  
   on(BrodActions.updateBrodSuccess, (state, { brod }) => ({
    ...state,
    brods: state.brods.map((b: Brod) =>  
      b.id === brod.id ? brod : b  
    )
  })),
  on(BrodActions.loadBrodsSuccess, (state, { brods }) => ({
    ...state,
    brods
  })),
  on(BrodActions.addBrodSuccess, (state, { brod }) => ({
    ...state,
    brods: [...state.brods, brod]
  })),
  on(BrodActions.removeBrodSuccess, (state, { brodId }) => ({
    ...state,
    brods: state.brods.filter((brod: { id: number; }) => brod.id !== brodId)
  })),
  on(BrodActions.loadBrodsFailure, BrodActions.addBrodFailure, BrodActions.removeBrodFailure, (state, { error }) => ({
    ...state,
    error
  }))
);



export const { selectAll, selectIds, selectEntities, selectTotal } = brodAdapter.getSelectors();
