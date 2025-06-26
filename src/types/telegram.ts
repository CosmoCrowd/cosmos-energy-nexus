
export interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code: string;
    };
    chat?: any;
    start_param?: string;
  };
  sendData: (data: string) => void;
  openTelegramLink: (url: string) => void;
  openLink: (url: string) => void;
}

export interface TonConnect {
  connect: (request: ConnectRequest) => Promise<ConnectResult>;
  disconnect: () => Promise<void>;
  getWallets: () => Promise<WalletInfo[]>;
  onStatusChange: (callback: (wallet: Wallet | null) => void) => void;
  account: Account | null;
  connected: boolean;
}

export interface ConnectRequest {
  manifestUrl: string;
  items: ConnectItem[];
}

export interface ConnectItem {
  name: 'ton_addr' | 'ton_proof';
  payload?: string;
}

export interface ConnectResult {
  device: DeviceInfo;
  items: ConnectItemReply[];
}

export interface WalletInfo {
  name: string;
  image: string;
  aboutUrl: string;
  universalLink: string;
  bridgeUrl?: string;
}

export interface Wallet {
  device: DeviceInfo;
  provider: string;
  account: Account;
}

export interface Account {
  address: string;
  network: '-239' | '-3';
  publicKey: string;
  walletStateInit: string;
}

export interface DeviceInfo {
  platform: string;
  appName: string;
  appVersion: string;
  maxProtocolVersion: number;
  features: string[];
}

export interface ConnectItemReply {
  name: string;
  address?: string;
  network?: string;
  publicKey?: string;
  walletStateInit?: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
    TonConnect?: {
      new(): TonConnect;
    };
  }
}
