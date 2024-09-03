// src/app/store/luka.selector.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { LukaState } from './luka.reducer';

export const selectLukaState = (state: AppState) => state.luka;

export const selectAllPorts = createSelector(
  selectLukaState,
  (state: LukaState) => state.ports
);
