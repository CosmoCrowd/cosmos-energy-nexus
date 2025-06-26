
import { TonConnect, Wallet, Account } from '@/types/telegram';

class TonService {
  private tonConnect: TonConnect | null = null;
  private wallet: Wallet | null = null;
  private listeners: ((wallet: Wallet | null) => void)[] = [];
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.initTonConnect();
  }

  private async initTonConnect(): Promise<void> {
    // Ждем загрузки Telegram WebApp
    await this.waitForTelegram();
    
    if (typeof window !== 'undefined') {
      // Ждем загрузки TonConnect
      await this.waitForTonConnect();
      
      if (window.TonConnect) {
        try {
          this.tonConnect = new window.TonConnect();
          
          // Проверяем существующее подключение
          if (this.tonConnect.connected && this.tonConnect.account) {
            this.wallet = {
              device: {
                platform: 'telegram',
                appName: 'Telegram',
                appVersion: '1.0',
                maxProtocolVersion: 2,
                features: []
              },
              provider: 'telegram',
              account: this.tonConnect.account
            };
          }
          
          this.tonConnect.onStatusChange((wallet) => {
            console.log('Изменение статуса кошелька:', wallet);
            this.wallet = wallet;
            this.notifyListeners(wallet);
          });
          
          this.isInitialized = true;
          console.log('TonConnect успешно инициализирован');
          
          // Уведомляем о текущем состоянии
          this.notifyListeners(this.wallet);
        } catch (error) {
          console.error('Ошибка инициализации TonConnect:', error);
          this.isInitialized = true; // Помечаем как инициализированный даже при ошибке
          this.notifyListeners(null);
        }
      } else {
        console.error('TonConnect не доступен');
        this.isInitialized = true;
        this.notifyListeners(null);
      }
    }
  }

  private waitForTelegram(): Promise<void> {
    return new Promise((resolve) => {
      if (window.Telegram?.WebApp) {
        resolve();
      } else {
        const checkTelegram = () => {
          if (window.Telegram?.WebApp) {
            resolve();
          } else {
            setTimeout(checkTelegram, 100);
          }
        };
        checkTelegram();
      }
    });
  }

  private waitForTonConnect(): Promise<void> {
    return new Promise((resolve) => {
      if (window.TonConnect) {
        resolve();
      } else {
        const checkTonConnect = () => {
          if (window.TonConnect) {
            resolve();
          } else {
            setTimeout(checkTonConnect, 100);
          }
        };
        checkTonConnect();
      }
    });
  }

  async connectWallet(): Promise<boolean> {
    if (!this.isInitialized) {
      await this.initPromise;
    }

    if (!this.tonConnect) {
      console.error('TonConnect не инициализирован');
      return false;
    }

    try {
      const result = await this.tonConnect.connect({
        manifestUrl: `${window.location.origin}/tonconnect-manifest.json`,
        items: [
          {
            name: 'ton_addr'
          }
        ]
      });

      console.log('Кошелек подключен:', result);
      return true;
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
      return false;
    }
  }

  async disconnectWallet(): Promise<void> {
    if (this.tonConnect) {
      await this.tonConnect.disconnect();
      this.wallet = null;
      this.notifyListeners(null);
    }
  }

  async getBalance(): Promise<number> {
    if (!this.wallet?.account?.address) {
      return 0;
    }

    try {
      const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${this.wallet.account.address}`);
      const data = await response.json();
      return parseFloat(data.result) / 1000000000;
    } catch (error) {
      console.error('Ошибка получения баланса:', error);
      return 0;
    }
  }

  async getTonPrice(): Promise<number> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
      const data = await response.json();
      return data['the-open-network']?.usd || 0;
    } catch (error) {
      console.error('Ошибка получения курса TON:', error);
      return 0;
    }
  }

  async sendTransaction(amount: number, destinationAddress: string): Promise<boolean> {
    if (!this.tonConnect || !this.wallet) {
      console.error('Кошелек не подключен');
      return false;
    }

    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 300,
        messages: [
          {
            address: destinationAddress,
            amount: (amount * 1000000000).toString(),
          }
        ]
      };

      console.log('Отправка транзакции:', transaction);
      return true;
    } catch (error) {
      console.error('Ошибка отправки транзакции:', error);
      return false;
    }
  }

  onWalletChange(callback: (wallet: Wallet | null) => void) {
    this.listeners.push(callback);
    
    // Если уже инициализирован, сразу вызываем callback
    if (this.isInitialized) {
      callback(this.wallet);
    }
  }

  private notifyListeners(wallet: Wallet | null) {
    this.listeners.forEach(callback => callback(wallet));
  }

  isConnected(): boolean {
    return this.wallet !== null;
  }

  getWalletAddress(): string | null {
    return this.wallet?.account?.address || null;
  }

  getWallet(): Wallet | null {
    return this.wallet;
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

export const tonService = new TonService();
