import React from "react";
import BN from "bn.js";
import { useWaitingSetter } from "../frame/tasks";
export function SetupWrapper(props: { startMtc: any }) {
  const setWaiting = useWaitingSetter();
  return <h3>SetupWrapper</h3>;
}
