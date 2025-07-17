
const NetworkParticleBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-futuristic-primary rounded-full animate-matrix-rain opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}
      
      {/* Connection grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-futuristic-primary to-transparent"></div>
        <div className="absolute top-3/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-futuristic-accent to-transparent"></div>
        <div className="absolute top-1/4 left-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-futuristic-secondary to-transparent"></div>
      </div>
      
      {/* Pulsing center effect */}
      <div className="absolute top-1/2 left-1/2 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 bg-futuristic-primary/5 rounded-full animate-ping"></div>
        <div className="absolute inset-4 bg-futuristic-accent/5 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-8 bg-futuristic-secondary/5 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default NetworkParticleBackground;
