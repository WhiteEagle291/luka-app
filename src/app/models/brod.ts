// brod.model.ts

import { Luka } from "./luka";
import { User } from "./user";

export interface Brod {
  id: number;
  name: string;
  type: string;
  crew: string[];
  port: Luka;  // Allow port to be null
  portId: number | null; // portId to track the port ID
}