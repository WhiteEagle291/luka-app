// app.state.ts
import { Brod } from '../app/models/brod';

export interface AppState {
  brodovi: Brod[];
  selectedBrod: number;
}