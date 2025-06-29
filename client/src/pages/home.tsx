import { useEffect } from "react";

interface Publication {
  title: string;
  authors: string;
  venue: string;
}

const publications: Publication[] = [
  {
    title: "Mechanistic Interpretability of Neural Networks in Formal Reasoning",
    authors: "Smith, J., Johnson, A., et al.",
    venue: "Conference on Neural Information Processing Systems (NeurIPS) 2024"
  },
  {
    title: "Proof-Based Training for Interpretable AI Systems", 
    authors: "Chen, L., Williams, R., et al.",
    venue: "International Conference on Machine Learning (ICML) 2024"
  }
];

export default function Home() {
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
            <h1 className="text-2xl md:text-3xl font-normal italic text-black">
              d<sub>model</sub>
            </h1>
            <p className="text-sm md:text-base text-black mt-1">look inside the model</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="w-full px-6 md:px-8 mb-8">
        <div className="max-reading mx-auto">
          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <a href="#research" className="academic-link">
                Research
              </a>
            </li>
            <li>
              <a href="#approach" className="academic-link">
                Our Approach
              </a>
            </li>
            <li>
              <a href="#publications" className="academic-link">
                Publications
              </a>
            </li>
            <li>
              <a href="#team" className="academic-link">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="academic-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

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

          {/* Publications Section */}
          <section id="publications" className="mb-12">
            <h2 className="text-lg md:text-xl font-bold text-black mb-6">Recent Publications</h2>
            <div className="space-y-4">
              {publications.map((publication, index) => (
                <article key={index} className="publication-item">
                  <h3 className="text-base font-semibold text-black mb-2">
                    {publication.title}
                  </h3>
                  <p className="text-sm text-academic-gray mb-2">
                    {publication.authors}
                  </p>
                  <p className="text-sm text-academic-gray">
                    {publication.venue}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="mb-12">
            <h2 className="text-lg md:text-xl font-bold text-black mb-6">Team</h2>
            <p className="text-base line-height-academic text-black mb-4">
              Our interdisciplinary team combines expertise in machine learning, formal methods, cognitive 
              science, and safety research.
            </p>
            <p className="text-base line-height-academic text-black">
              We are actively recruiting researchers who share our vision of building interpretable AI systems.{' '}
              <a href="#contact" className="academic-link">
                Get in touch
              </a>{' '}
              if you're interested in joining our mission.
            </p>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-12">
            <h2 className="text-lg md:text-xl font-bold text-black mb-6">Contact</h2>
            <p className="text-base line-height-academic text-black mb-4">
              For research collaborations, career opportunities, or general inquiries:
            </p>
            <div className="space-y-2">
              <p className="text-base text-black">
                <strong>Email:</strong>{' '}
                <a href="mailto:research@dmodel.ai" className="academic-link">
                  research@dmodel.ai
                </a>
              </p>
              <p className="text-base text-black">
                <strong>Address:</strong> Stanford Research Park, Palo Alto, CA
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-academic py-8 px-6 md:px-8">
        <div className="max-reading mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
            <div className="flex gap-4">
              <a href="#" className="academic-link">blog</a>
              <span className="text-academic-gray">|</span>
              <a href="#" className="academic-link">anish</a>
              <span className="text-academic-gray">|</span>
              <a href="#" className="academic-link">dmoon</a>
            </div>
            <div className="text-academic-gray">
              <span>© 2024 dmodel. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
