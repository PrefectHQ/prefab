import { createContext, useContext } from "react";
import type { StateStore } from "./state";

export const StateContext = createContext<StateStore | null>(null);

export function useStateContext(): StateStore | null {
  return useContext(StateContext);
}
