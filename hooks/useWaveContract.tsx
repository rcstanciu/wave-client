import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ethers, BigNumber } from "ethers";
import WavePortalABI from "../abi/WavePortal.json";
import useWallet from "./useWallet";

interface WaveContractContextType {
  contract: ethers.Contract | null;
  totalWaves: BigNumber | null;
  wave: (message: string) => Promise<void>;
  waves: Array<{
    address: string;
    timestamp: BigNumber;
    message: string;
    transactionHash: string;
  }>;
}

const WaveContractContext = createContext<WaveContractContextType>(
  {} as WaveContractContextType
);

export function WaveContractProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [totalWaves, setTotalWaves] = useState(BigNumber.from(0));
  const { currentAccount } = useWallet();
  const [waves, setWaves] = useState<
    Array<{
      address: string;
      timestamp: BigNumber;
      message: string;
      transactionHash: string;
    }>
  >([]);

  useEffect(() => {
    if (!currentAccount) {
      return;
    }

    try {
      const { ethereum } = window;

      if (!ethereum) {
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        WavePortalABI.abi,
        signer
      );

      setContract(wavePortalContract);
    } catch (error) {
      console.error(error);
    }
  }, [currentAccount]);

  const getTotalWaves = useCallback(async (): number | null => {
    if (!contract) {
      return null;
    }
    const res = await contract.getTotalWaves();
    setTotalWaves(res);

    const waveEventFilter = contract.filters.Wave();
    const waves = [...(await contract.queryFilter(waveEventFilter))];
    waves.sort((a, b) => b.blockNumber - a.blockNumber);

    console.log(waves[0]);
    const parsedWaves = waves.map((item) => ({
      address: item.args[0],
      timestamp: item.args[1],
      message: item.args[2],
      transactionHash: item.transactionHash,
    }));
    setWaves(parsedWaves);
  }, [contract]);

  useEffect(() => {
    if (contract) {
      getTotalWaves();
    }
  }, [contract, getTotalWaves]);

  const wave = useCallback(
    async (message: string) => {
      if (!contract) {
        return;
      }

      const res = await contract.wave(message);
      const txRes = await res.wait();
      console.log(txRes);

      getTotalWaves();
    },
    [contract, getTotalWaves]
  );

  const waveContractContext = useMemo(
    () => ({
      contract,
      totalWaves,
      wave,
      waves,
    }),
    [contract, totalWaves, wave, waves]
  );

  return (
    <WaveContractContext.Provider value={waveContractContext}>
      {children}
    </WaveContractContext.Provider>
  );
}

export default function useWaveContract(): WaveContractContextType {
  return useContext(WaveContractContext);
}
