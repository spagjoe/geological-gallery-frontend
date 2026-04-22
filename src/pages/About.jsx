import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto max-w-3xl px-4 pb-16 pt-32">
      <div className="animate-fade-in">

        <h1 className="font-roboto-mono text-3xl md:text-4xl font-bold text-stone-200 mb-2">
          About
        </h1>
        <div className="h-px bg-smoke-500 mb-10" />

        <section className="mb-12">
          <h2 className="font-roboto-mono text-2xl font-semibold text-stone-200 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed mb-4">
            <b>Q: What equipment/software do you use for photos?</b>

          </p>  
          <p className="text-stone-300 leading-relaxed mb-4">
            Camera: Nikon D5300, Nikkor 28-105mm Macro Lens, focus rail
            <br></br>
            Software: Helicon Focus, Krita
          </p>
          <p className="text-stone-300 text-lg leading-relaxed mb-4">
            <b>Q: Do you collect these rocks yourself?</b>
          </p>  
          <p className="text-stone-300 leading-relaxed mb-4">
            Yes, a large majority of the specimens on the site were collected by me. A small handful were gifts or purchases.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-roboto-mono text-2xl font-semibold text-stone-200 mb-4">
            Contact
          </h2>
          <p className="text-stone-300 leading-relaxed mb-4">
            For questions, feedback, or ID corrections, send an email to: 
            <br></br>
            <b><u><a href="mailto:info.mycool.rocks@gmail.com">info.mycool.rocks@gmail.com</a></u></b>
          </p>  
        </section>

        <button
          onClick={() => navigate('/gallery')}
          className="px-6 py-3 bg-smoke-500/50 hover:bg-smoke-400/50 border border-smoke-300 
                     text-white rounded-lg font-roboto-mono transition-all duration-300 
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Back to Gallery
        </button>

      </div>
    </main>
  );
};

export default About;