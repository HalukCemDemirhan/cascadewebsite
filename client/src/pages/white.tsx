import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { SEO } from "@/hooks/useSEO";
import logoPath from "@assets/network-logo.png";

export default function White() {
  const [location, setLocation] = useLocation();
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Image preloading - start downloading immediately and track loading
    const img = new Image();
    img.onload = () => {
      setLogoLoaded(true);
    };
    img.src = logoPath;

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = target.getAttribute('href')!;
        if (href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleLogoClick = () => {
    setLocation('/');
  };

  if (!logoLoaded) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-8 md:px-16">
          <div 
            onClick={handleLogoClick}
            className="cursor-pointer w-fit"
          >
            <img 
              src={logoPath} 
              alt="Perception Labs - Modeling Perception Systems Logo" 
              className="h-16 md:h-24 w-auto hover:opacity-80 transition-opacity duration-200"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <SEO 
        title="Modeling Perception Systems | Perception Labs"
        description="Exploring simulation-based approaches to understanding narrative battlefields and public discourse systems. Research on how ideas move through networks of belief, identity, and influence."
        keywords="perception, labs, lab, perception labs, narrative battlefields, perception systems modeling, simulation research, public discourse analysis, network dynamics, belief systems, information landscapes, systems thinking"
        canonical="https://perception-labs.com/white"
        ogTitle="Modeling Perception Systems"
        ogDescription="Exploring simulation-based approaches to understanding narrative battlefields and public discourse systems."
        ogUrl="https://perception-labs.com/white"
        twitterTitle="Modeling Perception Systems"
        twitterDescription="Simulation-based approaches to understanding narrative battlefields and public discourse systems."
      />
      
      {/* Header */}
      <header className="w-full pt-12 pb-8 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-2">
            <div 
              onClick={handleLogoClick}
              className="cursor-pointer w-fit"
            >
              <img 
                src={logoPath} 
                alt="Perception Labs - Modeling Perception Systems Logo" 
                className="h-16 md:h-24 w-auto hover:opacity-80 transition-opacity duration-200"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-8 md:px-16 pb-8">
        <div className="max-w-2xl mx-auto academic-content">
          
          {/* Intro Section */}
          <section id="research" className="mb-12">
            <h1 className="text-xl md:text-2xl text-gray-600 mb-6 italic">
              Modelling Perception Systems
            </h1>
            
            <p className="text-lg md:text-xl line-height-academic text-gray-600 mb-8 italic">
              Outcomes are no longer driven by intent, but by how ideas move through networks 
              of belief, identity, and influence.
            </p>
          </section>

          {/* Research Areas */}
          <section className="mb-4">
            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              I. Narrative Battlefields aren't Linear
            </h2>
            <p className="text-lg line-height-academic text-black mb-6">
              Information landscapes no longer behave linearly and public discourse unfolds in what seems to be unpredictable stages. It moves through decentralized networks; shifting, fragmenting, and accelerating along random paths. Yet we still rely on static strategies in a dynamic world.
            </p>
            <p className="text-lg line-height-academic text-black mb-6">
              This isn't a failure of intelligence. It is a failure of instrumentation.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              II. Structure in Chaos
            </h2>
            <p className="text-lg line-height-academic text-black mb-6">
              What appears chaotic on the surface is shaped by deeper forces: emotional resonance, identity 
              signaling, group alignment, narrative gravity. These dynamics do not follow the logic of 
              messaging. They follow the logic of systems.
            </p>
            <p className="text-lg line-height-academic text-black mb-6">
              There is a shape to how people absorb, distort, and transmit meaning, and we are building a 
              grammar that can describe it.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              III. Simulation as a Method
            </h2>
            <p className="text-lg line-height-academic text-black mb-6">
              If behavior is shaped by narrative, and narrative moves through networks, then we must treat 
              public discourse as a system that can be modeled; not just analyzed, but explored.
            </p>
            <p className="text-lg line-height-academic text-black mb-8">
              This is not about prediction in the statistical sense. It is about simulation in the systems sense: 
              understanding the structure well enough to intervene thoughtfully and to make sense of a world 
              that constantly reshapes itself. Through advanced modeling techniques, we can map these complex dynamics.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              Perception Terrain
            </h2>
            <p className="text-lg line-height-academic text-black mb-6">
              Public perception fundamentally shapes outcomes across society, politics, and markets. Until we 
              understand the architecture of collective perception, until we treat it as a system, we will remain 
              at the mercy of forces we cannot see.
            </p>
            <p className="text-lg line-height-academic text-black mb-2">
              We believe this is the most important modeling and simulation problem of our time.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full pt-4 pb-8 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <p className="text-xs text-gray-400">
              Research conducted at Perception Labs
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="https://sonofadam.life/" className="academic-link" target="_blank" rel="noopener noreferrer">adam</a>
            <span className="text-academic-gray">|</span>
            <a href="#" className="academic-link">amgad</a>
            <span className="text-academic-gray">|</span>
            <button 
              onClick={() => setLocation('/investors')} 
              className="academic-link bg-transparent border-none p-0 cursor-pointer"
            >
              investors
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
} 