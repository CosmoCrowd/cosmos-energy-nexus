
interface TelegramWalletTransaction {
  amount: number;
  recipient: string;
  comment?: string;
}

// Extended interface for Telegram WebApp with additional properties
interface ExtendedTelegramWebApp {
  ready: () => void;
  expand: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  close: () => void;
  user?: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  };
  initData?: string;
  initDataUnsafe?: any;
  MainButton?: any;
  openInvoice?: (url: string, callback?: (status: string) => void) => void;
  openTelegramLink?: (url: string) => void;
  showPopup?: (params: { title: string; message: string; buttons: any[] }) => void;
  platform?: string;
}

class TelegramWalletService {
  private isAvailable(): boolean {
    return !!(window.Telegram?.WebApp);
  }

  async requestPayment(transaction: TelegramWalletTransaction): Promise<boolean> {
    if (!this.isAvailable()) {
      console.error('Telegram WebApp не доступен');
      return false;
    }

    try {
      console.log('Инициализация платежа через Telegram Wallet:', transaction);

      // Проверяем доступность Telegram WebApp
      const tg = window.Telegram.WebApp as ExtendedTelegramWebApp;
      
      if (tg.openInvoice) {
        // Метод 1: Использование встроенного счета
        const invoiceUrl = this.generateInvoiceUrl(transaction);
        
        return new Promise((resolve) => {
          tg.openInvoice!(invoiceUrl, (status: string) => {
            console.log('Статус платежа:', status);
            resolve(status === 'paid');
          });
        });
      } else if (tg.openTelegramLink) {
        // Метод 2: Открытие через Telegram ссылку
        const telegramUrl = this.generateTelegramWalletUrl(transaction);
        
        tg.openTelegramLink(telegramUrl);
        
        // Возвращаем true, так как мы не можем отследить статус
        return true;
      } else {
        // Метод 3: Fallback - открытие через обычную ссылку
        const walletUrl = this.generateWalletUrl(transaction);
        window.open(walletUrl, '_blank');
        return true;
      }
    } catch (error) {
      console.error('Ошибка при инициализации платежа:', error);
      return false;
    }
  }

  private generateInvoiceUrl(transaction: TelegramWalletTransaction): string {
    const params = new URLSearchParams({
      amount: (transaction.amount * 1000000000).toString(), // Конвертируем в nanoTON
      recipient: transaction.recipient,
      comment: transaction.comment || 'Покупка энергии COSMO'
    });
    
    return `ton://transfer?${params.toString()}`;
  }

  private generateTelegramWalletUrl(transaction: TelegramWalletTransaction): string {
    const params = new URLSearchParams({
      amount: transaction.amount.toString(),
      recipient: transaction.recipient,
      text: transaction.comment || 'Покупка энергии COSMO'
    });
    
    return `https://t.me/wallet?startattach=wpay_order-${params.toString()}`;
  }

  private generateWalletUrl(transaction: TelegramWalletTransaction): string {
    const params = new URLSearchParams({
      to: transaction.recipient,
      amount: (transaction.amount * 1000000000).toString(),
      text: transaction.comment || 'Покупка энергии COSMO'
    });
    
    return `ton://transfer?${params.toString()}`;
  }

  // Вспомогательный метод для проверки Telegram окружения
  checkTelegramEnvironment(): { 
    isWebApp: boolean; 
    hasInvoice: boolean; 
    hasOpenLink: boolean; 
    platform: string;
  } {
    const tg = window.Telegram?.WebApp as ExtendedTelegramWebApp;
    
    return {
      isWebApp: !!tg,
      hasInvoice: !!(tg?.openInvoice),
      hasOpenLink: !!(tg?.openTelegramLink),
      platform: tg?.platform || 'unknown'
    };
  }

  // Показать уведомление пользователю
  showNotification(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
    const tg = window.Telegram?.WebApp as ExtendedTelegramWebApp;
    
    if (tg?.showPopup) {
      tg.showPopup({
        title: type === 'error' ? 'Ошибка' : type === 'success' ? 'Успех' : 'Информация',
        message: message,
        buttons: [{ type: 'ok' }]
      });
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }

  // Получить информацию о пользователе
  getUserInfo(): any {
    return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
  }
}

export const telegramWalletService = new TelegramWalletService();
