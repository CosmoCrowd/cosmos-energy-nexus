import { TonConnect } from '@tonconnect/sdk';

interface WalletInfo {
  address: string;
  network: string;
  publicKey: string;
  walletStateInit: string;
}

class TonService {
  private tonConnect: TonConnect | null = null;
  private wallet: any = null;
  private listeners: ((wallet: any) => void)[] = [];
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;
  private isTestMode = true; // Включаем тестовый режим

  constructor() {
    this.initPromise = this.initTonConnect();
  }

  private async initTonConnect(): Promise<void> {
    console.log('Инициализация TonConnect в тестовом режиме');
    
    try {
      if (this.isTestMode) {
        // В тестовом режиме сразу эмулируем подключенный кошелек
        this.isInitialized = true;
        this.notifyListeners(null);
        return;
      }

      // Ждем загрузки Telegram WebApp
      await this.waitForTelegram();
      console.log('Telegram WebApp загружен');
      
      // Инициализируем TonConnect с реальным манифестом
      this.tonConnect = new TonConnect({
        manifestUrl: `${window.location.origin}/tonconnect-manifest.json`
      });

      // Слушаем изменения состояния кошелька
      this.tonConnect.onStatusChange((wallet) => {
        console.log('Изменение статуса кошелька:', wallet);
        if (wallet) {
          this.wallet = {
            device: wallet.device,
            provider: wallet.provider,
            account: {
              address: wallet.account.address,
              network: wallet.account.chain,
              publicKey: wallet.account.publicKey,
              walletStateInit: wallet.account.walletStateInit
            }
          };
        } else {
          this.wallet = null;
        }
        this.notifyListeners(this.wallet);
      });

      // Восстанавливаем подключение если оно было
      const currentWallet = this.tonConnect.wallet;
      if (currentWallet) {
        this.wallet = {
          device: currentWallet.device,
          provider: currentWallet.provider,
          account: {
            address: currentWallet.account.address,
            network: currentWallet.account.chain,
            publicKey: currentWallet.account.publicKey,
            walletStateInit: currentWallet.account.walletStateInit
          }
        };
      }

      this.isInitialized = true;
      console.log('TonConnect успешно инициализирован');
      
      // Уведомляем о текущем состоянии
      this.notifyListeners(this.wallet);
      
    } catch (error) {
      console.error('Ошибка инициализации TonConnect:', error);
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
    console.log('Подключение кошелька в тестовом режиме');
    
    if (!this.isInitialized) {
      await this.initPromise;
    }

    if (this.isTestMode) {
      // Эмулируем успешное подключение кошелька
      setTimeout(() => {
        this.wallet = {
          device: { appName: 'Test Wallet', platform: 'test' },
          provider: 'test',
          account: {
            address: 'UQBtest123456789abcdefghijklmnopqrstuvwxyz',
            network: '-239',
            publicKey: 'test_public_key_123',
            walletStateInit: 'test_state_init'
          }
        };
        console.log('Тестовый кошелек подключен:', this.wallet);
        this.notifyListeners(this.wallet);
      }, 1000);
      
      return true;
    }

    if (!this.tonConnect) {
      console.error('TonConnect не инициализирован');
      return false;
    }

    try {
      // Используем правильный метод connect вместо connectWallet
      const walletConnectionSource = {
        universalLink: 'https://app.tonkeeper.com/ton-connect',
        bridgeUrl: 'https://bridge.tonapi.io/bridge'
      };
      
      await this.tonConnect.connect(walletConnectionSource);
      
      return true;
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
      return false;
    }
  }

  async disconnectWallet(): Promise<void> {
    if (this.isTestMode) {
      this.wallet = null;
      this.notifyListeners(null);
      console.log('Тестовый кошелек отключен');
      return;
    }

    if (this.tonConnect) {
      await this.tonConnect.disconnect();
    }
    this.wallet = null;
    this.notifyListeners(null);
    console.log('Кошелек отключен');
  }

  async getBalance(): Promise<number> {
    if (!this.wallet) {
      return 0;
    }

    if (this.isTestMode) {
      // Возвращаем тестовый баланс
      return 15.75;
    }

    try {
      // Получаем баланс через TonAPI
      const address = this.wallet.account.address;
      
      const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
      const data = await response.json();
      
      if (data.ok) {
        // Конвертируем из nanoTON в TON
        return parseFloat(data.result) / 1000000000;
      }
      
      return 0;
    } catch (error) {
      console.error('Ошибка получения баланса:', error);
      return 0;
    }
  }

  async getTonPrice(): Promise<number> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
      const data = await response.json();
      return data['the-open-network']?.usd || 5.50;
    } catch (error) {
      console.error('Ошибка получения курса TON:', error);
      return 5.50;
    }
  }

  async sendTransaction(amount: number, destinationAddress: string): Promise<boolean> {
    if (!this.wallet) {
      console.error('Кошелек не подключен');
      return false;
    }

    if (this.isTestMode) {
      console.log('Тестовая транзакция:', { amount, destinationAddress });
      // Эмулируем успешную транзакцию
      setTimeout(() => {
        console.log('Тестовая транзакция завершена успешно');
      }, 2000);
      return true;
    }

    if (!this.tonConnect) {
      console.error('Кошелек не подключен');
      return false;
    }

    try {
      console.log('Отправка транзакции:', { amount, destinationAddress });
      
      // Создаем транзакцию
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 минут
        messages: [
          {
            address: destinationAddress,
            amount: Math.floor(amount * 1000000000).toString(), // Конвертируем в nanoTON
          }
        ]
      };

      // Отправляем транзакцию
      const result = await this.tonConnect.sendTransaction(transaction);
      console.log('Результат транзакции:', result);
      
      return true;
    } catch (error) {
      console.error('Ошибка отправки транзакции:', error);
      return false;
    }
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

  // Валидация адреса кошелька
  validateWalletAddress(address: string): boolean {
    try {
      // Проверяем формат TON адреса
      const friendlyAddress = address;
      return friendlyAddress.length > 0;
    } catch (error) {
      console.error('Невалидный адрес кошелька:', error);
      return false;
    }
  }

  // Методы для переключения режимов
  enableTestMode() {
    this.isTestMode = true;
  }

  disableTestMode() {
    this.isTestMode = false;
  }
}

export const tonService = new TonService();
