
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  tonBalance: number;
  cosmoBalance: number;
  userLevel: number;
  totalUsers: number;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [tonBalance, setTonBalance] = useState(0);
  const [cosmoBalance, setCosmoBalance] = useState(0);
  const [userLevel, setUserLevel] = useState(0);
  const [totalUsers] = useState(127843); // Реалистичное число участников

  const connectWallet = () => {
    // Реалистичные данные для нового пользователя
    setIsConnected(true);
    setTonBalance(2.45); // Небольшой баланс для старта
    setCosmoBalance(150); // Стартовые токены
    setUserLevel(1); // Начальный уровень
    console.log('Wallet connected via Telegram');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setTonBalance(0);
    setCosmoBalance(0);
    setUserLevel(0);
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      tonBalance,
      cosmoBalance,
      userLevel,
      totalUsers,
      connectWallet,
      disconnectWallet
    }}>
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
