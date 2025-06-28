
import { Info } from 'lucide-react';
import { useState } from 'react';

const DailyIncomeSection = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const dailyIncome = 87.22; // Mock data

  return (
    <div className="px-4 py-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
      <div className="bg-gradient-to-br from-cosmic-dark/90 via-purple-900/20 to-pink-900/20 rounded-3xl p-4 border border-futuristic-primary/30 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-white text-sm font-bold">Ежедневный пассивный доход</span>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="w-4 h-4 bg-futuristic-primary/20 rounded-full flex items-center justify-center border border-futuristic-primary/50"
                >
                  <Info size={10} className="text-futuristic-primary" />
                </button>
                
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-cosmic-dark border border-futuristic-primary/50 rounded-lg text-xs text-white max-w-xs z-10 shadow-lg">
                    Сумма подкачивается ежедневно в 00:01 UTC из админ панели CosmoFund и зависит от суммарной прибыли всех проектов
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-2xl px-4 py-2 inline-block">
              <span className="text-green-400 font-bold text-lg font-mono">+${dailyIncome}</span>
            </div>
          </div>
          
          {/* Sleeping person with falling money icon */}
          <div className="relative ml-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center border border-futuristic-primary/50">
              <span className="text-2xl">🛌</span>
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce">
              <span className="text-lg">💰</span>
            </div>
            <div className="absolute -top-1 left-2 animate-bounce" style={{animationDelay: '0.5s'}}>
              <span className="text-sm">💵</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyIncomeSection;
