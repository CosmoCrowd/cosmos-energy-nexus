
interface EnergyPassiveIncomeDisplayProps {
  passiveIncome: number;
}

const EnergyPassiveIncomeDisplay = ({ passiveIncome }: EnergyPassiveIncomeDisplayProps) => {
  return (
    <div className="mt-12 text-center relative z-10">
      <div className="relative inline-block">
        {/* Futuristic Sleep Pod */}
        <div className="relative bg-gradient-to-br from-futuristic-primary/20 to-futuristic-secondary/20 rounded-3xl p-6 border-2 border-futuristic-primary/40 backdrop-blur-sm">
          
          {/* Energy Aura */}
          <div className="absolute -inset-2 bg-gradient-to-r from-futuristic-primary/10 via-futuristic-accent/10 to-futuristic-secondary/10 rounded-3xl animate-energy-pulse"></div>
          
          {/* Sleep Icon with Enhancement */}
          <div className="relative text-6xl mb-4">
            <div className="animate-bounce">😴</div>
            {/* Floating Z's */}
            <div className="absolute -top-2 -right-2 text-2xl text-futuristic-primary animate-float">💤</div>
          </div>
          
          {/* Passive Income Display */}
          <div className="bg-gradient-to-r from-futuristic-primary/30 to-futuristic-accent/30 rounded-2xl p-4 border border-futuristic-primary/50 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="w-4 h-4 bg-futuristic-primary rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-lg">Пассивный доход</span>
              {/* Blinking Button */}
              <div className="w-4 h-4 bg-futuristic-accent rounded-full animate-ping"></div>
            </div>
            <div className="text-futuristic-primary font-bold text-2xl animate-energy-pulse">
              +{passiveIncome} TON/час
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyPassiveIncomeDisplay;
