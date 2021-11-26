import { setupAccounts } from "../../utils/accountUtils";
import { withToggleAsync } from "../../utils/utils";
import { Account } from "../../components/types/types";
export const setup = (
  setWaiting: (b: boolean) => void,
  account: Account | null
) =>
  withToggleAsync(setWaiting, async () => {
    const [accounts, _buildEmoBaseIds] = await Promise.all([
      setupAccounts(account),
    ]);

    return {
      ...accounts,
    };
  });
