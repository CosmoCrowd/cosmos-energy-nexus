
import { TonConnect, Wallet, Account } from '@/types/telegram';

class TonService {
  private tonConnect: TonConnect | null = null;
  private wallet: Wallet | null = null;
  private listeners: ((wallet: Wallet | null) => void)[] = [];

  constructor() {
    this.initTonConnect();
  }

  private async initTonConnect() {
    if (typeof window !== 'undefined' && window.TonConnect) {
      this.tonConnect = new window.TonConnect();
      this.tonConnect.onStatusChange((wallet) => {
        this.wallet = wallet;
        this.notifyListeners(wallet);
      });
    }
  }

  async connectWallet(): Promise<boolean> {
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
      return parseFloat(data.result) / 1000000000; // Конвертируем из nanoTON в TON
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
      // Здесь должна быть логика отправки транзакции
      // Для демонстрации используем базовую структуру
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 300, // 5 минут
        messages: [
          {
            address: destinationAddress,
            amount: (amount * 1000000000).toString(), // Конвертируем в nanoTON
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
    // Сразу вызываем callback с текущим состоянием
    callback(this.wallet);
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
}

export const tonService = new TonService();
