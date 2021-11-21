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

interface WaveContractContextType {
  contract: ethers.Contract | null;
  totalWaves: BigNumber | null;
  wave: () => Promise<void>;
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

  useEffect(() => {
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
  }, []);

  const getTotalWaves = useCallback(async (): number | null => {
    if (!contract) {
      return null;
    }
    const res = await contract.getTotalWaves();
    console.log(res);
    setTotalWaves(res);
  }, [contract]);

  useEffect(() => {
    if (contract) {
      getTotalWaves();
    }
  }, [contract, getTotalWaves]);

  const wave = useCallback(async () => {
    if (!contract) {
      return;
    }

    console.log("Sending wave");
    const res = await contract.wave();
    console.log("Created tx", res);
    const txRes = await res.wait();
    console.log("Txres", txRes);

    getTotalWaves();
  }, [contract, getTotalWaves]);

  const waveContractContext = useMemo(
    () => ({
      contract,
      totalWaves,
      wave,
    }),
    [contract, totalWaves, wave]
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
