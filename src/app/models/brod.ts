// brod.model.ts

import { Luka } from "./luka";
import { User } from "./user";

export interface Brod {
  id: number;
  name: string;
  type: string;
  crew: string[];
  port: Luka; 
  portId: number | null; 
}