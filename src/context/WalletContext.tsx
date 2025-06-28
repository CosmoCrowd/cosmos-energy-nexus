
import React, { createContext, useContext, useState, useEffect } from 'react';
import TonConnect from '@tonconnect/sdk';

const tonConnect = new TonConnect({ manifestUrl: 'https://raw.githubusercontent.com/Cosmo-Fund/tonconnect-manifest/main/tonconnect-manifest.json' });

interface WalletContextType {
  isConnected: boolean;
  isLoading: boolean;
  walletAddress: string | null;
  tonBalance: number;
  cosmoBalance: number;
  tonPrice: number;
  userLevel: number;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  sendPayment: (amount: number) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tonBalance, setTonBalance] = useState(0);
  const [cosmoBalance, setCosmoBalance] = useState(1500); // Mock cosmo balance
  const [tonPrice, setTonPrice] = useState(2.5); // Mock TON price
  const [userLevel, setUserLevel] = useState(1);

  useEffect(() => {
    const initWallet = async () => {
      try {
        console.log('Initializing wallet connection...');
        
        // For now, simulate test mode connection
        setTimeout(() => {
          setIsConnected(true);
          setWalletAddress('UQBtest123456789abcdefghijklmnopqrstuvwxyz');
          setTonBalance(15.75);
          setIsLoading(false);
          console.log('Test wallet connected successfully');
        }, 1000);
      } catch (error) {
        console.error('Wallet initialization error:', error);
        setIsLoading(false);
      }
    };

    initWallet();
  }, []);

  const connectWallet = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('Connecting wallet...');
      
      // Simulate successful connection for now
      setTimeout(() => {
        setIsConnected(true);
        setWalletAddress('UQBtest123456789abcdefghijklmnopqrstuvwxyz');
        setTonBalance(15.75);
        setIsLoading(false);
      }, 1500);
      
      return true;
    } catch (error) {
      console.error('Connection error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setTonBalance(0);
    console.log('Wallet disconnected');
  };

  const sendPayment = async (amount: number): Promise<boolean> => {
    if (!walletAddress) {
      console.error('Wallet not connected');
      return false;
    }

    try {
      console.log('Sending payment:', amount, 'TON');
      
      // Simulate successful payment
      setTimeout(() => {
        console.log('Payment sent successfully');
        refreshBalance();
      }, 2000);
      
      return true;
    } catch (error) {
      console.error('Payment error:', error);
      return false;
    }
  };

  const refreshBalance = async () => {
    if (!walletAddress) return;

    try {
      console.log('Refreshing balance...');
      // Mock balance refresh
      setTonBalance(15.75 + Math.random() * 5);
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  };

  const value: WalletContextType = {
    isConnected,
    isLoading,
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
