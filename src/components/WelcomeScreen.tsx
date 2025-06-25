
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Wallet } from 'lucide-react';

const WelcomeScreen = () => {
  const { connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-cosmic-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-neon-green rounded-full energy-particle opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="cosmic-card rounded-2xl p-8 max-w-2xl w-full z-10 animate-fade-in-up">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold neon-text mb-2 animate-neon-pulse">
            COSMO ОРДЕН
          </h1>
          <div className="w-20 h-1 bg-neon-gradient mx-auto rounded"></div>
        </div>

        {/* Legend Text */}
        <div className="text-center mb-8 space-y-4 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold text-neon-blue mb-4">
            Легенда Космо Орден: Тайна через пространство и время
          </h2>
          <p className="text-sm">
            Миллионы лет назад, когда звёзды ещё боролись за право светить вечно, на обломке исчезнувшей галактики был найден артефакт — <span className="text-neon-green font-semibold">'Космо Ядро'</span>.
          </p>
          <p className="text-sm">
            Этот кристалл, пропитанный энергией пространства и времени, хранил силу, способную соединить человечество с бесконечными возможностями. Но его мощь была слишком велика для одного человека, и лишь сообщество могучих умов могло её контролировать.
          </p>
          <p className="text-sm">
            Так родился <span className="text-neon-blue font-semibold">'Космо Орден'</span> — тайное общество, которое объединило лучших учёных, инженеров и мечтателей. Они создали лабораторию <span className="text-neon-purple font-semibold">'Космо Лаб'</span>, где генерируют ИИ-агентов, способных автоматизировать любые задачи, и <span className="text-neon-pink font-semibold">'Космо Токенайзер'</span> — платформу для токенизации реальных активов.
          </p>
          <p className="text-sm">
            Чтобы открыть силу 'Космо Ядра', Орден разделил её на <span className="text-neon-green font-semibold">'Энергии Космо'</span> — уровни энергии, которые можно купить и передать через сеть.
          </p>
          <p className="text-sm font-semibold text-neon-green">
            Легенда говорит: "Тот, кто соберёт все уровни Энергий и раскроет их Частицы, станет Хранителем Нового Мира и получит власть над временем и пространством".
          </p>
          <p className="text-base font-semibold text-white">
            Присоединяйся к Ордену, покупай 'Энергии Космо', приглашай друзей и стань частью эпохи, где технологии, инвестиции и мечты сливаются в одно!
          </p>
        </div>

        {/* Connect Wallet Button */}
        <div className="text-center">
          <Button
            onClick={connectWallet}
            className="cosmic-button text-black font-bold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-300"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Подключить кошелёк
          </Button>
          <p className="text-xs text-gray-400 mt-3">
            Используется встроенный кошелёк Telegram
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
