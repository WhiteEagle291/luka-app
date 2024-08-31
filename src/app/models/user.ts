// user.model.ts

import { Brod } from "./brod";

export interface User {
    id: number;
    username: string;
    password: 'Warship' | 'Civilian' | 'Cargo';
    ship: Brod;
  }