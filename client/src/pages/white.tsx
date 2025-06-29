import { useEffect } from "react";
import logoPath from "@assets/logo-black_1751190410212.png";

export default function White() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(target.getAttribute('href')!);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Header */}
      <header className="w-full py-8 px-6 md:px-8">
        <div className="max-reading mx-auto">
          <div className="mb-2">
            <img 
              src={logoPath} 
              alt="Company Logo" 
              className="h-12 md:h-16 w-auto"
            />
          </div>
        </div>
      </header>



      {/* Main Content */}
      <main className="w-full px-6 md:px-8 pb-16">
        <div className="max-reading mx-auto academic-content">
          
          {/* Intro Section */}
          <section id="research" className="mb-12">
            <h1 className="text-xl md:text-2xl font-bold text-black mb-6">
              Interpretability: The Critical Path to Safe Superintelligence
            </h1>
            
            <p className="text-base md:text-lg line-height-academic text-black mb-4">
              We stand at the threshold of creating systems with capabilities that will far exceed human 
              understanding. But we cannot safely build what we do not understand.
            </p>
            
            <p className="text-base md:text-lg line-height-academic text-black font-semibold mb-8">
              Interpretability is not merely a safety tool—it is the essential catalyst that will unlock 
              superintelligence itself.
            </p>
          </section>

          {/* Research Areas */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              I. Understanding trumps acceleration
            </h2>
            <p className="text-base line-height-academic text-black mb-6">
              Reverse-engineering neural computation reveals the algorithms and complexities that drive 
              intelligence. By decoding these mechanisms, we can systematically and safely improve them rather 
              than relying on blind scaling.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              II. Interpretability transforms black-box evolution into directed design
            </h2>
            <p className="text-base line-height-academic text-black mb-6">
              Current AI progress resembles natural selection—powerful but inefficient. Interpretable training 
              will enable us to engineer intelligence with the precision of designing a microchip.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              III. Safety and capability are fundamentally linked
            </h2>
            <p className="text-base line-height-academic text-black mb-8">
              Systems we cannot understand will hit capability ceilings due to alignment failures. Only with 
              truly interpretable systems can AI be safely pushed to theoretical limits.
            </p>
          </section>

          {/* Approach Section */}
          <section id="approach" className="mb-12">
            <h2 className="text-lg md:text-xl font-bold text-black mb-6">Our Approach</h2>
            
            <h3 className="text-base md:text-lg font-bold text-black mb-3">
              I. We focus on a proof-based setting involving programming invariants and mathematical reasoning.
            </h3>
            <p className="text-base line-height-academic text-black mb-6">
              We have external measures of complexity that enable predictions about actual capabilities while 
              others are limited to post-hoc explanations or weak statistical correlations. Pulling ground truth 
              from formal logic means we are unbounded by conveniences that depend on data availability. We can scale 
              to arbitrary levels of difficulty or complexity by programmatically generating ground truth.
            </p>

            <h3 className="text-base md:text-lg font-bold text-black mb-3">
              II. We build for real-world use from day one
            </h3>
            <p className="text-base line-height-academic text-black mb-6">
              Our interpretability tools are designed to be used by AI developers immediately, creating a virtuous 
              cycle of research and application.
            </p>

            <h3 className="text-base md:text-lg font-bold text-black mb-3">
              III. We are unlike other labs. Join Us.
            </h3>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 md:px-8">
        <div className="max-reading mx-auto">
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="academic-link">blog</a>
            <span className="text-academic-gray">|</span>
            <a href="#" className="academic-link">anish</a>
            <span className="text-academic-gray">|</span>
            <a href="#" className="academic-link">dmoon</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 