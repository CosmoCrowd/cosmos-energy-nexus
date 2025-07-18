import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface TelegramWallet {
  address?: string;
  balance?: string;
  connected: boolean;
}

export function useTelegramWallet() {
  const [wallet, setWallet] = useState<TelegramWallet>({ connected: false });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkTelegramWallet();
  }, []);

  const checkTelegramWallet = async () => {
    try {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Check if wallet is available
        const platform = (tg as any).platform;
        if (platform === 'tdesktop' || platform === 'web') {
          // Web version - mock wallet for development
          setWallet({
            address: 'UQD...mock_address',
            balance: '0.5432',
            connected: true
          });
        } else {
          // Mobile version - real wallet integration
          await connectTelegramWallet();
        }
      }
    } catch (error) {
      console.error('Error checking Telegram wallet:', error);
    }
  };

  const connectTelegramWallet = async () => {
    setLoading(true);
    try {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Use Telegram's built-in wallet
        const walletInfo = await new Promise<any>((resolve, reject) => {
          const showPopup = (tg as any).showPopup;
          if (showPopup) {
            showPopup({
              title: 'Подключить кошелек',
              message: 'Подключите TON кошелек для совершения транзакций',
              buttons: [
                { id: 'connect', type: 'default', text: 'Подключить' },
                { id: 'cancel', type: 'cancel', text: 'Отмена' }
              ]
            }, (buttonId: string) => {
              if (buttonId === 'connect') {
                // Mock successful connection
                resolve({
                  address: `UQ${Math.random().toString(36).substring(2, 15)}...`,
                  balance: (Math.random() * 10).toFixed(4)
                });
              } else {
                reject(new Error('User cancelled'));
              }
            });
          } else {
            // Fallback for development
            resolve({
              address: `UQ${Math.random().toString(36).substring(2, 15)}...`,
              balance: (Math.random() * 10).toFixed(4)
            });
          }
        });

        setWallet({
          address: walletInfo.address,
          balance: walletInfo.balance,
          connected: true
        });

        toast({
          title: "Кошелек подключен",
          description: "TON кошелек успешно подключен",
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Ошибка подключения",
        description: "Не удалось подключить кошелек",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({ connected: false });
    toast({
      title: "Кошелек отключен",
      description: "TON кошелек отключен",
    });
  };

  const sendTransaction = async (to: string, amount: string) => {
    if (!wallet.connected) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    try {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Mock transaction for development
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // In a real app, this would call the actual TON API
        const txHash = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        
        toast({
          title: "Транзакция отправлена",
          description: `Hash: ${txHash}`,
        });

        return { hash: txHash, success: true };
      }
    } catch (error) {
      console.error('Transaction error:', error);
      toast({
        title: "Ошибка транзакции",
        description: "Не удалось отправить транзакцию",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getWalletBalance = async () => {
    if (!wallet.connected || !wallet.address) return '0';
    
    try {
      // Mock balance check
      const balance = (Math.random() * 10).toFixed(4);
      setWallet(prev => ({ ...prev, balance }));
      return balance;
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  };

  return {
    wallet,
    loading,
    connectWallet: connectTelegramWallet,
    disconnectWallet,
    sendTransaction,
    getWalletBalance,
    refreshWallet: checkTelegramWallet,
  };
}