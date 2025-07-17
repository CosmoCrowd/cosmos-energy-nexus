
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
  const [tonBalance, setTonBalance] = useState(15.75);
  const [cosmoBalance, setCosmoBalance] = useState(2450); // Increased COSMO balance
  const [tonPrice, setTonPrice] = useState(2.5);
  const [userLevel, setUserLevel] = useState(3); // Set to level 3 to show some progress

  useEffect(() => {
    const initWallet = async () => {
      try {
        console.log('Initializing wallet connection...');
        
        // Simulate connection with more realistic data
        setTimeout(() => {
          setIsConnected(true);
          setWalletAddress('UQBtest123456789abcdefghijklmnopqrstuvwxyz');
          setTonBalance(15.75);
          setCosmoBalance(2450);
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
      
      // Simulate successful connection
      setTimeout(() => {
        setIsConnected(true);
        setWalletAddress('UQBtest123456789abcdefghijklmnopqrstuvwxyz');
        setTonBalance(15.75);
        setCosmoBalance(2450);
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
    setCosmoBalance(0);
    console.log('Wallet disconnected');
  };

  const sendPayment = async (amount: number): Promise<boolean> => {
    if (!walletAddress) {
      console.error('Wallet not connected');
      return false;
    }

    try {
      console.log('Sending payment:', amount, 'TON');
      
      // Simulate successful payment and level upgrade
      setTimeout(() => {
        setTonBalance(prev => prev - amount);
        setUserLevel(prev => Math.max(prev, userLevel + 1));
        console.log('Payment sent successfully, level upgraded');
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
      // Mock balance refresh with small variations
      setTonBalance(prev => prev + (Math.random() - 0.5) * 2);
      setCosmoBalance(prev => prev + Math.floor(Math.random() * 100));
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
