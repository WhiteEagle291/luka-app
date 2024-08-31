// store/luka.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { Luka } from '../models/luka';
import * as LukaActions from './luka.action';

export interface LukaState {
  lukas: Luka[];
  loading: boolean;
  error: any;
}

export const initialState: LukaState = {
  lukas: [],
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
    lukas
  })),
  on(LukaActions.loadLukasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(LukaActions.addLukaSuccess, (state, { luka }) => ({
    ...state,
    lukas: [...state.lukas, luka]
  })),
  on(LukaActions.removeLukaSuccess, (state, { lukaId }) => ({
    ...state,
    lukas: state.lukas.filter(luka => luka.id !== lukaId)
  })),
);
