
class TonService {
  private tonConnect: any = null;
  private wallet: any = null;
  private listeners: ((wallet: any) => void)[] = [];
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.initTonConnect();
  }

  private async initTonConnect(): Promise<void> {
    console.log('Начинаем инициализацию TonService');
    
    try {
      // Ждем загрузки Telegram WebApp
      await this.waitForTelegram();
      console.log('Telegram WebApp загружен');
      
      // Имитируем успешную инициализацию для демо
      this.isInitialized = true;
      console.log('TonService успешно инициализирован (демо режим)');
      
      // Уведомляем о готовности
      setTimeout(() => {
        this.notifyListeners(null);
      }, 1000);
      
    } catch (error) {
      console.error('Ошибка инициализации TonService:', error);
      this.isInitialized = true;
      this.notifyListeners(null);
    }
  }

  private waitForTelegram(): Promise<void> {
    return new Promise((resolve) => {
      const checkTelegram = () => {
        if (window.Telegram?.WebApp) {
          resolve();
        } else {
          setTimeout(checkTelegram, 100);
        }
      };
      checkTelegram();
    });
  }

  async connectWallet(): Promise<boolean> {
    console.log('Попытка подключения кошелька');
    
    if (!this.isInitialized) {
      await this.initPromise;
    }

    try {
      // Имитируем успешное подключение для демо
      this.wallet = {
        device: {
          platform: 'telegram',
          appName: 'Telegram',
          appVersion: '1.0',
          maxProtocolVersion: 2,
          features: []
        },
        provider: 'telegram',
        account: {
          address: 'UQBDemo_Wallet_Address_For_Testing_Only_123456789',
          network: '-239',
          publicKey: 'demo_public_key',
          walletStateInit: 'demo_state_init'
        }
      };

      console.log('Кошелек подключен (демо):', this.wallet);
      this.notifyListeners(this.wallet);
      return true;
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
      return false;
    }
  }

  async disconnectWallet(): Promise<void> {
    this.wallet = null;
    this.notifyListeners(null);
    console.log('Кошелек отключен');
  }

  async getBalance(): Promise<number> {
    // Имитируем баланс для демо
    return Math.random() * 10 + 1;
  }

  async getTonPrice(): Promise<number> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
      const data = await response.json();
      return data['the-open-network']?.usd || 5.50;
    } catch (error) {
      console.error('Ошибка получения курса TON:', error);
      return 5.50; // Fallback цена
    }
  }

  async sendTransaction(amount: number, destinationAddress: string): Promise<boolean> {
    console.log('Отправка транзакции (демо):', { amount, destinationAddress });
    return true;
  }

  onWalletChange(callback: (wallet: any) => void) {
    this.listeners.push(callback);
    
    if (this.isInitialized) {
      setTimeout(() => callback(this.wallet), 100);
    }
  }

  private notifyListeners(wallet: any) {
    this.listeners.forEach(callback => callback(wallet));
  }

  isConnected(): boolean {
    return this.wallet !== null;
  }

  getWalletAddress(): string | null {
    return this.wallet?.account?.address || null;
  }

  getWallet(): any {
    return this.wallet;
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

export const tonService = new TonService();
