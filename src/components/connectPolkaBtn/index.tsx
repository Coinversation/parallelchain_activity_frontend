import React, { useContext, useState } from "react";
import BN from "bn.js";
import { SetupWrapper } from "./SetupWrapper";
import {
  AccountContext,
  GlobalAsyncContext,
  useAccountUpdater,
} from "../frame/tasks";

type Phase = "none" | "setup" | "shop" | "battle" | "result";
export default function ConnectPolkaBtn() {
  const [phase, setPhase] = useState<Phase>("none");
  const account = useContext(AccountContext);
  const updateAccount = useAccountUpdater();
  const globalAsync = useContext(GlobalAsyncContext);

  if (!globalAsync) {
    return <h3>loading</h3>;
  }
  switch (phase) {
    case "setup":
      const startMtc = async (solution: BN) => {
        if (!account) {
          throw new Error("account null");
        }
      };
      return <SetupWrapper startMtc={startMtc} />;
  }
  return (
    <h2
      onClick={() => {
        setPhase("setup");
      }}
    >
      connectPolkaBtn
    </h2>
  );
}
