import React, { useContext } from "react";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import {
  AccountContext,
  useWaitingSetter,
  useBlockMessageSetter,
} from "../frame/tasks";
import { polkadotSignMessage } from "../../utils/accountUtils";
import { setup } from "./task";
export function SetupWrapper(props: { startMtc: any }) {
  const setWaiting = useWaitingSetter();
  const account = useContext(AccountContext);
  const setBlockMessage = useBlockMessageSetter();
  const [injectedAccounts, setInjectedAccounts] = React.useState<
    InjectedAccountWithMeta[]
  >([]);

  React.useEffect(() => {
    console.log(33333);
    setup(setWaiting, account).then((r) => {
      if (r.kind === "ok") {
        setInjectedAccounts(r.injectedAccounts);
      } else {
        setBlockMessage(r.message);
      }
    });
  }, []);
  return injectedAccounts && injectedAccounts.length ? (
    <ul>
      {injectedAccounts.map((v: InjectedAccountWithMeta, index: number) => (
        <li key={index} style={{ border: "1px solid" }}>
          <p>address: {v.address}</p>
          <p>meta.genesisHash: {v.meta?.genesisHash}</p>
          <p>meta.name: {v.meta?.name}</p>
          <p>meta.source: {v.meta?.source}</p>
          <p>type: {v.type}</p>
          <button onClick={() => polkadotSignMessage(v.address)}>sign</button>
        </li>
      ))}
    </ul>
  ) : (
    <h3>SetupWrapper</h3>
  );
}
