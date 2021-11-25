import React from "react";
import { WaitingSetterContext } from "./tasks";
export function Frame(props: { children: React.Component }) {
  <NavSetterContext.Provider value={setHasNav}>
    <BlockMessageSetterContxt.Provider value={setBlockMessage}>
      <WaitingSetterContext.Provider value={setIsWaiting}>
        <AccountContext.Provider value={account}>
          <AccountSetterContext.Provider value={setAccount}>
            <GlobalAsyncContext.Provider value={globalAync}>
              {props.children}
            </GlobalAsyncContext.Provider>
          </AccountSetterContext.Provider>
        </AccountContext.Provider>
      </WaitingSetterContext.Provider>
    </BlockMessageSetterContxt.Provider>
  </NavSetterContext.Provider>;
}
