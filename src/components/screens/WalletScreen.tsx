import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Send, Download, Copy, ExternalLink, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useTelegramWallet } from '@/hooks/useTelegramWallet';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

const WalletScreen = () => {
  const { wallet, loading, connectWallet, sendTransaction, getWalletBalance } = useTelegramWallet();
  const { profile } = useProfile();
  const { toast } = useToast();
  const [showBalance, setShowBalance] = useState(true);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [sendLoading, setSendLoading] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано",
      description: "Адрес скопирован в буфер обмена",
    });
  };

  const handleRefreshBalance = async () => {
    await getWalletBalance();
    toast({
      title: "Баланс обновлен",
      description: "Данные кошелька обновлены",
    });
  };

  const handleSendTransaction = async () => {
    if (!sendAmount || !sendAddress) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setSendLoading(true);
    try {
      await sendTransaction(sendAddress, sendAmount);
      setSendAmount('');
      setSendAddress('');
      await handleRefreshBalance();
    } catch (error) {
      console.error('Send error:', error);
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-6 relative animate-screen-enter">
      {/* Enhanced Background */}
      <div className="fixed inset-0 pointer-events-none cosmic-background">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="cosmic-particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Кошелек TON
          </h1>
          <p className="text-muted-foreground">
            Управляйте своими криптоактивами
          </p>
        </div>

        {!wallet.connected ? (
          /* Connect Wallet Card */
          <Card className="glass-card">
            <CardHeader className="text-center">
              <Wallet size={64} className="text-cosmic-primary mx-auto mb-4" />
              <CardTitle>Подключите кошелек</CardTitle>
              <CardDescription>
                Подключите TON кошелек для управления активами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={connectWallet} 
                disabled={loading}
                className="w-full cosmic-button"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Подключение...
                  </>
                ) : (
                  <>
                    <Wallet size={16} className="mr-2" />
                    Подключить кошелек
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Wallet Balance Card */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet size={24} className="text-cosmic-primary" />
                    Баланс кошелька
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-cosmic-primary">
                    {showBalance ? `${wallet.balance || '0'} TON` : '•••••'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ≈ ${showBalance ? ((parseFloat(wallet.balance || '0') * 2.45).toFixed(2)) : '•••'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-cosmic-card rounded-lg">
                  <div className="flex-1 mr-2">
                    <div className="text-xs text-muted-foreground mb-1">Адрес кошелька</div>
                    <div className="text-sm font-mono">{wallet.address}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(wallet.address || '')}
                  >
                    <Copy size={16} />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleRefreshBalance}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Обновить
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink size={16} className="mr-2" />
                    TONScan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Earnings */}
            {profile && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download size={24} className="text-cosmic-accent" />
                    Заработано в проекте
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold text-cosmic-accent">
                        {profile.total_earned.toFixed(4)}
                      </div>
                      <div className="text-xs text-muted-foreground">TON заработано</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold text-cosmic-secondary">
                        {profile.energy_points.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">Энергия</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Send Transaction */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send size={24} className="text-cosmic-secondary" />
                  Отправить TON
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="send-address">Адрес получателя</Label>
                  <Input
                    id="send-address"
                    placeholder="UQ..."
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    className="font-mono"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="send-amount">Сумма (TON)</Label>
                  <div className="relative">
                    <Input
                      id="send-amount"
                      type="number"
                      step="0.0001"
                      placeholder="0.0000"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1"
                      onClick={() => setSendAmount(wallet.balance || '0')}
                    >
                      Все
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleSendTransaction}
                  disabled={sendLoading || !sendAmount || !sendAddress}
                  className="w-full cosmic-button-secondary"
                >
                  {sendLoading ? (
                    <>
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Отправить
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="glass-card p-6">
                <div className="text-center space-y-2">
                  <Download size={32} className="text-cosmic-primary mx-auto" />
                  <div className="text-sm font-medium">Пополнить</div>
                </div>
              </Button>
              <Button variant="outline" className="glass-card p-6">
                <div className="text-center space-y-2">
                  <ExternalLink size={32} className="text-cosmic-accent mx-auto" />
                  <div className="text-sm font-medium">История</div>
                </div>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletScreen;