
import { useWallet } from '@/context/WalletContext';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface WalletConnectionStatusProps {
  isConnecting?: boolean;
  error?: string | null;
}

const WalletConnectionStatus = ({ isConnecting = false, error = null }: WalletConnectionStatusProps) => {
  const { isConnected } = useWallet();

  if (isConnecting) {
    return (
      <div className="flex items-center space-x-2 text-blue-400 animate-pulse">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Подключаем кошелёк...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-red-400">
        <XCircle className="h-4 w-4" />
        <span className="text-sm">Ошибка: {error}</span>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2 text-neon-green animate-pulse">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm">Успешно подключено</span>
      </div>
    );
  }

  return null;
};

export default WalletConnectionStatus;
