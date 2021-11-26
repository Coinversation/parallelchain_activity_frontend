import React, { useContext } from "react";
import {
  AccountContext,
  useWaitingSetter,
  useBlockMessageSetter,
} from "../frame/tasks";
import { setup } from "./task";
export function SetupWrapper(props: { startMtc: any }) {
  const setWaiting = useWaitingSetter();
  const account = useContext(AccountContext);
  const setBlockMessage = useBlockMessageSetter();

  React.useEffect(() => {
    console.log(33333);
    setup(setWaiting, account).then((r) => {
      if (r.kind === "ok") {
      } else {
        setBlockMessage(r.message);
      }
    });
  }, []);
  return <h3>SetupWrapper</h3>;
}
