
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tonService } from '@/services/tonService';

interface WalletContextType {
  isConnected: boolean;
  isLoading: boolean;
  tonBalance: number;
  tonPrice: number;
  userLevel: number;
  totalUsers: number;
  walletAddress: string | null;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => Promise<void>;
  sendPayment: (amount: number) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const PROJECT_WALLET = 'UQBDN8ARRy-7qUYEmx9v6IxaMmcfHrbTrh6ZiFVQnzmsqyBi';

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tonBalance, setTonBalance] = useState(0);
  const [tonPrice, setTonPrice] = useState(0);
  const [userLevel, setUserLevel] = useState(0);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [totalUsers] = useState(12847);

  useEffect(() => {
    console.log('Инициализация WalletProvider');
    
    let loadingTimeout: NodeJS.Timeout;
    
    // Подписка на изменения кошелька
    tonService.onWalletChange((wallet: any) => {
      console.log('Получено изменение кошелька:', wallet);
      setIsConnected(!!wallet);
      setWalletAddress(wallet?.account?.address || null);
      
      // Убираем загрузку через 2 секунды максимум
      if (loadingTimeout) clearTimeout(loadingTimeout);
      loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      if (wallet) {
        loadWalletData();
      } else {
        setTonBalance(0);
        setUserLevel(0);
      }
    });

    // Загружаем курс TON
    loadTonPrice();
    
    // Обновляем курс каждые 5 минут
    const priceInterval = setInterval(loadTonPrice, 5 * 60 * 1000);
    
    // Убираем загрузку через 3 секунды в любом случае
    const maxLoadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => {
      clearInterval(priceInterval);
      if (loadingTimeout) clearTimeout(loadingTimeout);
      clearTimeout(maxLoadingTimeout);
    };
  }, []);

  const loadWalletData = async () => {
    try {
      const balance = await tonService.getBalance();
      setTonBalance(balance);
      
      // Определяем уровень пользователя на основе баланса
      if (balance >= 256) setUserLevel(10);
      else if (balance >= 128) setUserLevel(9);
      else if (balance >= 64) setUserLevel(8);
      else if (balance >= 32) setUserLevel(7);
      else if (balance >= 16) setUserLevel(6);
      else if (balance >= 8) setUserLevel(5);
      else if (balance >= 4) setUserLevel(4);
      else if (balance >= 2) setUserLevel(3);
      else if (balance >= 1) setUserLevel(2);
      else if (balance >= 0.5) setUserLevel(1);
      else setUserLevel(0);
    } catch (error) {
      console.error('Ошибка загрузки данных кошелька:', error);
    }
  };

  const loadTonPrice = async () => {
    try {
      const price = await tonService.getTonPrice();
      setTonPrice(price);
    } catch (error) {
      console.error('Ошибка загрузки курса TON:', error);
      setTonPrice(5.50);
    }
  };

  const connectWallet = async (): Promise<boolean> => {
    try {
      const success = await tonService.connectWallet();
      return success;
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
      return false;
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    try {
      await tonService.disconnectWallet();
    } catch (error) {
      console.error('Ошибка отключения кошелька:', error);
    }
  };

  const sendPayment = async (amount: number): Promise<boolean> => {
    try {
      const success = await tonService.sendTransaction(amount, PROJECT_WALLET);
      if (success) {
        setTimeout(loadWalletData, 2000);
      }
      return success;
    } catch (error) {
      console.error('Ошибка отправки платежа:', error);
      return false;
    }
  };

  const refreshBalance = async (): Promise<void> => {
    await loadWalletData();
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      isLoading,
      tonBalance,
      tonPrice,
      userLevel,
      totalUsers,
      walletAddress,
      connectWallet,
      disconnectWallet,
      sendPayment,
      refreshBalance
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
