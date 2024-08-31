// brod.model.ts

import { Luka } from "./luka";
import { User } from "./user";

export interface Brod {
    id: number;
    name: string;
    type: 'Warship' | 'Civilian' | 'Cargo';
    crew: string[];
    // user: User;
    // port: Luka;
  }