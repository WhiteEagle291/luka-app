
// app.state.ts

import { BrodState } from "./store/brod.reducer";
import { LukaState } from "./store/luka.reducer";



export interface AppState {
  brod: BrodState;
  luka: LukaState;
}
