
import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import WelcomeScreen from '@/components/WelcomeScreen';
import MainApp from '@/components/MainApp';

const Index = () => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return <WelcomeScreen />;
  }

  return <MainApp />;
};

export default Index;
