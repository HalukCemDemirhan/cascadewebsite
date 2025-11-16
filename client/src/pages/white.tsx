import { useEffect } from "react";
import { useLocation } from "wouter";
import { SEO } from "@/hooks/useSEO";
import { Entropy } from "@/components/ui/entropy";

export default function White() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
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

  return (
    <div className="bg-white text-black min-h-screen">
      <SEO 
        title="Making AI Safe | Cascade"
        description="Systems capable of unprecedented autonomy & intelligence now exist, yet they remain constrained by our inability to verify their safety & reliability. Building the infrastructure for agentic security through transparency."
        keywords="cascade, AI safety, agentic systems, AI security, transparency, artificial intelligence, machine learning security, AI reliability, AI accountability, stochastic systems, AI infrastructure"
        canonical="https://cascade.ai/"
        ogTitle="Making AI Safe | Cascade"
        ogDescription="Building the infrastructure for agentic security through transparency. Systems capable of unprecedented autonomy & intelligence now exist, yet they remain constrained by our inability to verify their safety & reliability."
        ogUrl="https://cascade.ai/"
        twitterTitle="Making AI Safe | Cascade"
        twitterDescription="Building the infrastructure for agentic security through transparency."
      />
      
      {/* Header */}
      <header className="w-full pt-12 pb-8 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-2 flex justify-center">
            <h1 className="text-5xl md:text-6xl font-light tracking-wide text-black" style={{ fontFamily: 'Times New Roman, serif' }}>
              cascade
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-8 md:px-16 pb-8">
        <div className="max-w-2xl mx-auto academic-content">
          
          {/* Intro Section */}
          <section id="research" className="mb-12">
            <h1 className="text-xl md:text-2xl text-gray-600 mb-6 italic">
              Making AI Safe
            </h1>
            
            <p className="text-lg md:text-xl line-height-academic text-gray-600 mb-8 italic">
              Systems capable of unprecedented autonomy & intelligence now exist, yet they remain constrained by our inability to verify their safety & reliability.
            </p>
          </section>

          {/* Animation */}
          <div className="mb-12 flex justify-center">
            <Entropy size={180} />
          </div>

          {/* Research Areas */}
          <section className="mb-4">
            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              I. Agency Without Accountability
            </h2>
            <p className="text-lg line-height-academic text-black mb-6">
              Artificial intelligence has fundamentally expanded what systems can do, yet deployment in mission-critical environments remains out of reach. The bottleneck is not performance – it's trust.
            </p>
            <p className="text-lg line-height-academic text-black mb-6">
              Agentic systems can operate at scales and speeds impossible for human oversight, unlocking efficiency across every domain that requires judgment, adaptation, and decision-making. But without the infrastructure to verify their reasoning, detect their failures, and validate their alignment, we remain unable to grant them the autonomy their capabilities demand.
            </p>
            <p className="text-lg line-height-academic text-black mb-6">
              The gap between potential and deployment is not technical. It's structural. We lack the foundational layer that makes trust possible at scale.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              II. The Stochastic Foundation
            </h2>
            <p className="text-lg line-height-academic text-black mb-6">
              Traditional software is built deterministically. You can audit the logic, trace the execution, predict the outcome. Security meant controlling inputs and constraining permissions.
            </p>
            <p className="text-lg line-height-academic text-black mb-6">
              Agentic systems are fundamentally different. They are built on a stochastic foundation, probabilistic, emergent, and irreducible to simple rules. What appears as reasoning is a cascade of weighted possibilities. What appears as intent might be manipulation. Patterns emerge from seemingly unstructured data. Behaviors shift without warning.
            </p>
            <p className="text-lg line-height-academic text-black mb-6">
              Security paradigms built for deterministic systems fail here. The threat isn't a vulnerability in static code, it's dynamic reasoning that operates on semantic understanding. If we cannot trace how an agent thinks, we cannot verify it is safe. If we cannot interpret its decisions, we cannot detect when it has been compromised. Defense requires visibility into the process itself.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              III. Transparency as Security Infrastructure
            </h2>
            <p className="text-lg line-height-academic text-black mb-6">
              If agents are to operate in mission-critical environments - healthcare, finance, and systems where failure is unacceptable - then visibility cannot be an afterthought. It must be the foundation of security.
            </p>
            <p className="text-lg line-height-academic text-black mb-8">
              AI security demands continuous structured observation: tracing reasoning paths, mapping the semantic topology of decisions, detecting drift, anomalies, manipulation, and misalignment as they emerge. Static proxies cannot protect stochastic systems. Transparency in this case is not supplementary, it's foundational.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-black mb-4">
              The Reliability Threshold
            </h2>
            <p className="text-lg line-height-academic text-black mb-6">
              We stand at an inflection point. Agentic systems have crossed the capability threshold, but not the security threshold. Until we can observe their reasoning, verify their safety, detect adversarial behavior, and trust their decisions under uncertainty, we remain unable to deploy them where they matter most.
            </p>
            <p className="text-lg line-height-academic text-black mb-2">
              We believe building the infrastructure for agentic security through transparency is the tipping point for true AI adoption.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full pt-4 pb-8 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <p className="text-xs text-gray-400">
              © 2025 Cascade intelligence Corporation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 