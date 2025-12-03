export const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl" />
      
      {/* Wave SVG at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-[200%] h-32 md:h-48 wave-animation"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60C240 20 480 100 720 60C960 20 1200 100 1440 60V120H0V60Z"
          fill="hsl(var(--primary) / 0.05)"
        />
        <path
          d="M0 80C240 40 480 120 720 80C960 40 1200 120 1440 80V120H0V80Z"
          fill="hsl(var(--primary) / 0.08)"
        />
      </svg>
    </div>
  );
};
