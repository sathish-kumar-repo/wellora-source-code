import React, { useEffect } from "react";

interface AnimatedProps {
  children?: React.ReactNode;
}

const Animated = ({ children }: AnimatedProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 dark:bg-white/5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 100}px`,
              height: `${20 + Math.random() * 100}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm rounded-2xl border border-secondary-200/50 dark:border-secondary-700/50 p-8 shadow-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animated;