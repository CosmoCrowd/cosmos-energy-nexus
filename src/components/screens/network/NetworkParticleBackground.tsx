
const NetworkParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated cosmic particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-futuristic-primary rounded-full animate-matrix-rain opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Cosmic glow effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-futuristic-primary/20 to-transparent rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-radial from-futuristic-accent/20 to-transparent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default NetworkParticleBackground;
