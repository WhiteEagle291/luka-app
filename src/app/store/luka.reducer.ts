// store/luka.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { Luka } from '../models/luka';
import * as LukaActions from './luka.action';

export interface LukaState {
  ports: Luka[];
  loading: boolean;
  error: any;
}

export const initialState: LukaState = {
  ports: [],
  loading: false,
  error: null
};

export const lukaReducer = createReducer(
  initialState,
  on(LukaActions.loadLukas, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(LukaActions.loadLukasSuccess, (state, { lukas }) => ({
    ...state,
    loading: false,
    ports: lukas
  })),
  on(LukaActions.loadLukasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(LukaActions.addLukaSuccess, (state, { luka }) => ({
    ...state,
    ports: [...state.ports, luka]
  })),
  on(LukaActions.removeLukaSuccess, (state, { lukaId }) => ({
    ...state,
    ports: state.ports.filter(luka => luka.id !== lukaId)
  })),
    // Handle the addPort action
    on(LukaActions.addPort, (state, { port }) => ({
      ...state,
      ports: [...state.ports, port],
    }))
);

