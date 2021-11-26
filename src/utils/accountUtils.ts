import { PlayerAccount, SessionAccount } from "@/components/types/types";
import { buildKeyringPair, derive, query } from "@/services/api";
import { u8aToHex, u8aWrapBytes } from "@polkadot/util";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { Account } from "../components/types/types";

export const setupExtension = async () => {
  const extensions = await web3Enable("polkadot-js/apps");
  if (extensions.length === 0) {
    return {
      kind: "ng" as const,
      message: "Please install Polkadot{.js} extension and try again.",
    };
  }
  const injectedAccounts = await web3Accounts();
  if (injectedAccounts.length === 0) {
    return {
      kind: "ng" as const,
      message:
        "Please add at least one account on the Polkadot{.js} extension and try again.",
    };
  }
  return {
    kind: "ok" as const,
    injectedAccounts,
  };
};
export const setupAccounts = async (account: Account | null) => {
  const ext = await setupExtension();
  if (ext.kind === "ng") {
    return ext;
  }
  const injectedAccounts = ext.injectedAccounts;
  let playerAccount: PlayerAccount;
  let sessionAccount: SessionAccount;
  if (
    account &&
    injectedAccounts.map((a) => a.address).includes(account.player.address)
  ) {
    playerAccount = account.player;
    sessionAccount = account.session;
  } else {
    console.log(injectedAccounts);
  }
  return {
    kind: "ok" as const,
    injectedAccounts,
  };
};
export const buildAndGeneratePlayerAndSessionAccounts = async (
  playerAddress: string
) => {
  const accountData = await query((q) => {
    return q.transactionPaymentPow.accountData(playerAddress);
  });
  console.log({ accountData });
  const playerPowCount = 0;
  const playerAccount: PlayerAccount = {
    address: playerAddress,
    powCount: playerPowCount,
  };
  const sessionMnemonic = mnemonicGenerate();
  const sessionAccount: SessionAccount = {
    address: buildKeyringPair(sessionMnemonic).address,
    mnemonic: sessionMnemonic,
    powCount: 0,
    isActive: false,
  };
  return {
    player: playerAccount,
    session: sessionAccount,
  };
};

export const polkadotSignMessage = async (polkadotAddress: string) => {
  const wrapped = u8aWrapBytes(polkadotAddress.toLowerCase());
  const injected: any = await web3Enable("clv");

  const currentInjected = injected[0];
  const ret = await currentInjected.signer.signRaw({
    data: u8aToHex(wrapped),
    address: polkadotAddress,
    type: "bytes",
  });
  // const ret = await currentInjected.sign.signMessage({
  //   data: u8aToHex(wrapped),
  //   address: polkadotAddress,
  //   type: "bytes",
  // });
  console.log("Polkadot signature:" + JSON.stringify(ret));
};
