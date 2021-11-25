import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export const WaitingSetterContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null);
export const useWaitingSetter = () => {
  const setter = useContext(WaitingSetterContext);
  if (!setter) {
    throw new Error("WaitingSetterContext null");
  }
};
