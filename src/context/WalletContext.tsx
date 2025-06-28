import React, { createContext, useContext, useState, useEffect } from 'react';
import TonWeb from 'tonweb';
import TonConnect from '@tonconnect/sdk';
import { getHttpEndpoint } from '@orbs-network/ton-access';

const tonConnect = new TonConnect({ manifestUrl: 'https://raw.githubusercontent.com/Cosmo-Fund/tonconnect-manifest/main/tonconnect-manifest.json' });

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  tonBalance: number;
  cosmoBalance: number;
  tonPrice: number;
  userLevel: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendPayment: (amount: number) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tonBalance, setTonBalance] = useState(0);
  const [cosmoBalance, setCosmoBalance] = useState(1500); // Mock cosmo balance
  const [tonPrice, setTonPrice] = useState(2.5); // Mock TON price
  const [userLevel, setUserLevel] = useState(1);

  useEffect(() => {
    tonConnect.restoreConnection().then((wallet) => {
      if (wallet) {
        setIsConnected(true);
        setWalletAddress(wallet.account.address);
        refreshBalance();
      }
    });
  }, []);

  const connectWallet = async () => {
    try {
      const wallet = await tonConnect.connect({
        onSessionExpire: () => {
          disconnectWallet();
        },
      });
      if (wallet) {
        setIsConnected(true);
        setWalletAddress(wallet.account.address);
        await refreshBalance();
      }
    } catch (e) {
      console.error('Connection error:', e);
    }
  };

  const disconnectWallet = () => {
    tonConnect.disconnect();
    setIsConnected(false);
    setWalletAddress(null);
  };

  const sendPayment = async (amount: number): Promise<boolean> => {
    if (!walletAddress) {
      console.error('Wallet not connected');
      return false;
    }

    try {
      const endpoint = await getHttpEndpoint();
      const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint));

      const transfer = {
        to: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9', // Replace with your contract address
        value: TonWeb.utils.toNano(amount.toString()).toString(),
        stateInit: null,
        payload: null,
      };

      const result = await tonConnect.sendTransaction({
        messages: [transfer],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
        network: 'testnet',
      });

      console.log('Payment result:', result);
      await refreshBalance();
      return true;
    } catch (error) {
      console.error('Payment error:', error);
      return false;
    }
  };

  const refreshBalance = async () => {
    if (!walletAddress) return;

    try {
      const endpoint = await getHttpEndpoint();
      const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint));
      const wallet = tonweb.wallet.create({ address: walletAddress, publicKey: 'test' }); // Public key is not required to get balance
      const balance = await wallet.getBalance();
      setTonBalance(TonWeb.utils.fromNano(balance));
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  };

  useEffect(() => {
    refreshBalance();
  }, [walletAddress]);

  const value: WalletContextType = {
    isConnected,
    walletAddress,
    tonBalance,
    cosmoBalance,
    tonPrice,
    userLevel,
    connectWallet,
    disconnectWallet,
    sendPayment,
    refreshBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
