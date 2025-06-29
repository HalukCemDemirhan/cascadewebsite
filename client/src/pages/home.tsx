import { Entropy } from "@/components/ui/entropy";
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Home() {
  const [clickedLetters, setClickedLetters] = useState<Set<string>>(new Set())
  const [showWelcome, setShowWelcome] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [location, setLocation] = useLocation();
  
  // All letters that need to be clicked
  const allLetters = ['P', 'L', 'A', 'B', 'S']
  
  // Check if all letters are clicked
  const allLettersClicked = allLetters.every(letter => clickedLetters.has(letter))
  
  // Handle navigation to white page
  const navigateToWhitePage = () => {
    setLocation('/white')
  }
  
  // Handle letter click - toggle highlight
  const handleLetterClick = (letterId: string) => {
    setClickedLetters(prev => {
      const newSet = new Set(prev)
      if (newSet.has(letterId)) {
        newSet.delete(letterId)
      } else {
        newSet.add(letterId)
      }
      return newSet
    })
  }
  
  // Handle all letters clicked
  useEffect(() => {
    if (allLettersClicked) {
      const timer = setTimeout(() => {
        setShowWelcome(true)
        // Start fade-out after welcome screen shows for a bit
        setTimeout(() => {
          setFadeOut(true)
          // Navigate after fade-out completes
          setTimeout(() => {
            navigateToWhitePage()
          }, 800) // Match fade-out animation duration
        }, 1000)
      }, 1300)
      
      return () => clearTimeout(timer)
    }
  }, [allLettersClicked])

  // If showing welcome screen
  if (showWelcome) {
    return (
      <div className="flex items-center justify-center bg-black text-white min-h-screen w-full">
        <div className={`text-center ${fadeOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <h1 className="text-4xl font-light tracking-wide">Welcome</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen w-full p-8">
      <div className="flex flex-col items-center">
        {/* Entropy Animation in a contained box with transparent edges */}
        <Entropy className="rounded-lg" size={400} />
        
        {/* Descriptive Text */}
        <div className="mt-8 text-center max-w-2xl">
          <p className="text-gray-300 text-2xl leading-relaxed italic tracking-wide" style={{ wordSpacing: '0.3em' }}>
            <span 
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has('P') ? 'text-blue-600 font-bold' : ''}`}
              onClick={() => handleLetterClick('P')}
            >
              P
            </span>erception <span 
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has('L') ? 'text-blue-600 font-bold' : ''}`}
              onClick={() => handleLetterClick('L')}
            >
              L
            </span>eads <span 
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has('A') ? 'text-blue-600 font-bold' : ''}`}
              onClick={() => handleLetterClick('A')}
            >
              A
            </span>ll <span 
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has('B') ? 'text-blue-600 font-bold' : ''}`}
              onClick={() => handleLetterClick('B')}
            >
              B
            </span>attles in <span 
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has('S') ? 'text-blue-600 font-bold' : ''}`}
              onClick={() => handleLetterClick('S')}
            >
              S
            </span>ilence
          </p>
        </div>
      </div>
    </div>
  );
}
