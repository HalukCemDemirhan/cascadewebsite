import { Entropy } from "@/components/ui/entropy";
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Home() {
  const [startVisible, setStartVisible] = useState(false)
  const [location, setLocation] = useLocation();
  
  // Handle navigation to white page
  const navigateToWhitePage = () => {
    setLocation('/white')
  }
  
  // Fade in the start button after animation loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartVisible(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen w-full p-8">
      <div className="flex flex-col items-center">
        {/* Entropy Animation in a contained box with transparent edges */}
        <Entropy className="rounded-lg" size={400} />
        
        {/* Simple Elegant Text Button with Pulsing Effect */}
        <div 
          className={`
            mt-8 transition-all duration-1500 ease-out
            ${startVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <button 
            onClick={navigateToWhitePage}
            className="
              text-white text-2xl tracking-[0.2em] uppercase font-extralight
              transition-all duration-700
              hover:tracking-[0.3em] animate-pulse
            "
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
