import { Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
            <Droplets className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground leading-tight">Kericho Water</span>
            <span className="text-xs text-muted-foreground leading-tight">NRW Reporting</span>
          </div>
        </Link>
        
        <nav className="hidden sm:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/report" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Report Issue
          </Link>
        </nav>
      </div>
    </header>
  );
};
