
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold tracking-tight text-primary">
          Health<span className="text-foreground">Predictor</span>
        </Link>
        
        <nav className="flex space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'text-primary' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/predict" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/predict' 
                ? 'text-primary' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Predict
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
