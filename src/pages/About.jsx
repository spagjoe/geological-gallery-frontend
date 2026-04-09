import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto max-w-3xl px-4 pb-16 pt-32">
      <div className="animate-fade-in">

        <h1 className="font-roboto-mono text-4xl md:text-5xl font-bold text-stone-200 mb-2">
          About
        </h1>
        <div className="h-px bg-smoke-500 mb-10" />

        <section className="mb-12">
          <h2 className="font-roboto-mono text-xl font-semibold text-stone-300 mb-4">
            Placeholder
          </h2>
          <p className="text-stone-400 leading-relaxed mb-4">
            Change later
          </p>
          
        </section>

        <button
          onClick={() => navigate('/gallery')}
          className="px-6 py-3 bg-smoke-500/50 hover:bg-smoke-400/50 border border-smoke-300 
                     text-white rounded-lg font-roboto-mono transition-all duration-300 
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Browse the collection
        </button>

      </div>
    </main>
  );
};

export default About;