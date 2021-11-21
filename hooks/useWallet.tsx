import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";

interface WalletContextType {
  hasMetamask: boolean;
  connectWallet: () => Promise<void>;
  currentAccount: string | null;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export function WalletProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    (async () => {
      const { ethereum } = window as any;

      if (!ethereum) {
        return;
      }
      setHasMetamask(true);

      // Check if we are authorized to access user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (!accounts && !accounts.length) {
        return;
      }

      const account = accounts?.[0];

      setCurrentAccount(account);
    })();
  }, []);

  const connectWallet = useCallback(async (): Promise<void> => {
    const { ethereum } = window as any;

    if (!ethereum) {
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts && !accounts.length) {
      return;
    }

    const account = accounts?.[0];

    setCurrentAccount(account);
  }, [setCurrentAccount]);

  const walletContext = useMemo(
    () => ({
      hasMetamask,
      connectWallet,
      currentAccount,
      isConnected: !!currentAccount,
    }),
    [hasMetamask, connectWallet, currentAccount]
  );

  return (
    <WalletContext.Provider value={walletContext}>
      {children}
    </WalletContext.Provider>
  );
}

export default function useWallet(): WalletContextType {
  return useContext(WalletContext);
}
