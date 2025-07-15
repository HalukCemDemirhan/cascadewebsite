import { Entropy } from "@/components/ui/entropy";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { SEO } from "@/hooks/useSEO";

export default function Home() {
  const [clickedLetters, setClickedLetters] = useState<Set<string>>(new Set());
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [location, setLocation] = useLocation();
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [hintFading, setHintFading] = useState(false);

  // All letters that need to be clicked
  const allLetters = ["P", "L", "A", "B", "S"];

  // Hint texts
  const hints = ["try spelling PLABS", "some letters are clickable"];

  // Check if all letters are clicked
  const allLettersClicked = allLetters.every((letter) =>
    clickedLetters.has(letter),
  );

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (allLetters.includes(letter)) {
        handleLetterClick(letter);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Handle hint timing
  useEffect(() => {
    if (allLettersClicked) return; // Don't show hints if puzzle is solved

    // Show first hint after 1 second
    const firstHintTimer = setTimeout(() => {
      setShowHint(true);
    }, 1000);

    // Start rotating hints after 9 seconds (1 + 8)
    const rotationTimer = setTimeout(() => {
      const interval = setInterval(() => {
        // Fade out current hint
        setHintFading(true);

        // After fade out completes, change hint and fade in
        setTimeout(() => {
          setHintIndex((prev) => (prev + 1) % hints.length);
          setHintFading(false);
        }, 300); // Wait for fade out animation
      }, 6800); // Rotate every 8 seconds

      return () => clearInterval(interval);
    }, 9000);

    return () => {
      clearTimeout(firstHintTimer);
      clearTimeout(rotationTimer);
    };
  }, [allLettersClicked, hints.length]);

  // Handle navigation to white page
  const navigateToWhitePage = () => {
    setLocation("/white");
  };

  // Handle letter click - toggle highlight
  const handleLetterClick = (letterId: string) => {
    setClickedLetters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(letterId)) {
        newSet.delete(letterId);
      } else {
        newSet.add(letterId);
      }
      return newSet;
    });
  };

  // Handle all letters clicked
  useEffect(() => {
    if (allLettersClicked) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
        // Start fade-out after welcome screen shows for a bit
        setTimeout(() => {
          setFadeOut(true);
          // Navigate after fade-out completes
          setTimeout(() => {
            navigateToWhitePage();
          }, 800); // Match fade-out animation duration
        }, 1650); // Increased from 1000ms to 2000ms
      }, 1300);

      return () => clearTimeout(timer);
    }
  }, [allLettersClicked]);

  // If showing welcome screen
  if (showWelcome) {
    return (
      <div className="flex items-center justify-center bg-black text-white min-h-screen w-full">
        <div
          className={`text-center ${fadeOut ? "animate-fade-out" : "animate-fade-in"}`}
        >
          <h1 className="text-4xl font-light tracking-wide">Welcome</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen w-full p-8">
      <SEO
        title="Perception Labs - Modeling Perception Systems"
        description="Perception Labs - Simulation lab specializing in understanding narrative battlefields and public perception systems. Ask for a demo to try."
        keywords="perception, labs, lab, perception labs, perception systems, narrative modeling, network analysis, public discourse, belief networks, influence mapping, systems simulation, information landscapes, collective perception"
        canonical="https://perception-labs.com/"
        ogTitle="Perception Labs - Modeling Perception Systems"
        ogDescription="Simulation lab specializing in understanding narrative battlefields and public perception systems. Ask for a demo to try."
        ogUrl="https://perception-labs.com/"
        twitterTitle="Perception Labs - Modeling Perception Systems"
        twitterDescription="Simulation lab specializing in understanding narrative battlefields and public perception systems. Ask for a demo to try."
      />

      <div className="flex flex-col items-center">
        {/* Entropy Animation in a contained box with transparent edges */}
        <div className="hidden md:block">
          <Entropy className="rounded-lg" size={400} />
        </div>
        <div className="block md:hidden">
          <Entropy className="rounded-lg" size={280} />
        </div>

        {/* Descriptive Text */}
        <div className="mt-8 text-center max-w-2xl relative">
          <h1 className="sr-only">
            Perception Labs - Modeling Perception Systems
          </h1>
          <p
            className="text-gray-300 text-lg md:text-2xl leading-relaxed italic tracking-wide"
            style={{ wordSpacing: "0.3em" }}
          >
            <span
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has("P") ? "text-blue-600 font-bold" : ""}`}
              onClick={() => handleLetterClick("P")}
            >
              P
            </span>
            erception{" "}
            <span
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has("L") ? "text-blue-600 font-bold" : ""}`}
              onClick={() => handleLetterClick("L")}
            >
              L
            </span>
            eads{" "}
            <span
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has("A") ? "text-blue-600 font-bold" : ""}`}
              onClick={() => handleLetterClick("A")}
            >
              A
            </span>
            ll{" "}
            <span
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has("B") ? "text-blue-600 font-bold" : ""}`}
              onClick={() => handleLetterClick("B")}
            >
              B
            </span>
            attles in{" "}
            <span
              className={`cursor-pointer hover:text-white transition-all duration-300 ${clickedLetters.has("S") ? "text-blue-600 font-bold" : ""}`}
              onClick={() => handleLetterClick("S")}
            >
              S
            </span>
            ilence
          </p>

          {/* Hint Text */}
          {showHint && !allLettersClicked && (
            <p
              className={`text-gray-500 text-lg text-center absolute top-full inset-x-0 mx-auto mt-4 transition-opacity duration-300 w-full ${hintFading ? "opacity-0" : "opacity-100"}`}
            >
              {hints[hintIndex]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
