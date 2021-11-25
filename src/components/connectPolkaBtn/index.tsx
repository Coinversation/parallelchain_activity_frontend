import React, { useState } from "react";
import BN from "bn.js";
import { SetupWrapper } from "./SetupWrapper";
type Phase = "setup" | "shop" | "battle" | "result";
export function connectPolkaBtn() {
  const [phase, setPhase] = useState<Phase>("setup");
  switch (phase) {
    case "setup":
      const startMtc = async (solution: BN) => {};
      return <SetupWrapper startMtc={startMtc} />;
  }
  return <h2>connectPolkaBtn</h2>;
}
