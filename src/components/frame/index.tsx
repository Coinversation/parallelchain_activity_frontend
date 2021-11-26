import React, { useEffect, useState } from "react";
import { Account } from "../types/types";
import { ApiPromise } from "@polkadot/api";

import {
  AccountContext,
  BlockMessageSetterContext,
  getEndpoint,
  AccountSetterContext,
  WaitingSetterContext,
  GlobalAsyncContext,
} from "./tasks";
import { connect, query } from "../../services/api";
export function Frame(props: { children: React.ReactElement }) {
  const [blockMessage, setBlockMessage] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = React.useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [globalAsync, setGlobalAsync] = React.useState<ApiPromise | null>(null);

  useEffect(() => {
    console.log(1111);
    Promise.all([connect(getEndpoint())]).then(([_bases, _]) => {
      console.log({ _bases });
      // const bases = _bases.unwrap();
      // const emoBases: EmoBases = {
      //   codec: bases,
      //   stringKey: new Map(
      //     Array.from(bases[0].entries()).map(([k, v]) => [k.toString(), v])
      //   ),
      // };
      setGlobalAsync(_bases);
    });
  }, []);
  return (
    <>
      {blockMessage ? <h1>{blockMessage}</h1> : null}
      <BlockMessageSetterContext.Provider value={setBlockMessage}>
        <WaitingSetterContext.Provider value={setIsWaiting}>
          <AccountContext.Provider value={account}>
            <AccountSetterContext.Provider value={setAccount}>
              <GlobalAsyncContext.Provider value={globalAsync}>
                {props.children}
              </GlobalAsyncContext.Provider>
            </AccountSetterContext.Provider>
          </AccountContext.Provider>
        </WaitingSetterContext.Provider>
      </BlockMessageSetterContext.Provider>
      {isWaiting ? <h2>{isWaiting}</h2> : null}
    </>
  );
}
