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
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export function WalletProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      setHasMetamask(true);
    }
  }, []);

  const walletContext = useMemo(() => ({ hasMetamask }), [hasMetamask]);

  return (
    <WalletContext.Provider value={walletContext}>
      {children}
    </WalletContext.Provider>
  );
}

export default function useWallet(): WalletContextType {
  return useContext(WalletContext);
}
