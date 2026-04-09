import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center overflow-hidden bg-gradient-to-r from-smoke-800 via-smoke-500 to-smoke-800 -mt-[60px] pt-[60px]">

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-center">

          {/* Left Side - Text Content */}
          <div className="text-white py-24 animate-fade-in">
            <h1 className="font-roboto-mono text-3xl md:text-6xl font-bold mb-3 tracking-tight">
              mycool.rocks
            </h1>
            <p className="font-roboto-mono text-stone-300 text-lg md:text-xl max-w-2xl">
              <br />
              I like rocks.
              <br /><br />
              I like finding them, identifying them, and sharing them with others.
              This is my attempt to catalog my collection in a searchable database
              full of detailed macro photos and information.
              <br /><br />
              Not all of them are rare or special.
              <br />
              But they are pretty cool.
            </p>

            <div className="flex flex-wrap gap-4 py-8">
              <button
                onClick={() => navigate('/gallery')}
                className="px-4 py-2 bg-smoke-500/50 hover:bg-smoke-400/50 border border-smoke-300 
                           text-white rounded-lg font-roboto-mono transition-all duration-300 
                           shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Browse Collection →
              </button>
            </div>
          </div>

          {/* Right Side - Featured Image */}
          <div className="relative lg:h-[750px]">
            <div className="relative h-full rounded-2xl overflow-hidden">
              <img
                src="https://spaghettijoe-rock-bucket.s3.us-east-2.amazonaws.com/calcite_willemite_crust_SWMW_kr.jpg"
                alt="Featured geological specimen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;