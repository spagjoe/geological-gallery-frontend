import React from 'react';

const SpecimenCard = ({ specimen, onClick }) => {
  const primaryImage = specimen.primaryImage || (specimen.imageLink && specimen.imageLink[0]) || null;

  return (
    <div 
      className="specimen-card group animate-fade-in"
      onClick={() => onClick(specimen)}
      style={{ animationDelay: '0ms' }}
    >
      <div className="relative overflow-hidden bg-smoke-900">
        {primaryImage ? (
          <img 
            src={primaryImage} 
            alt={specimen.name}
            className="specimen-card-image"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-square flex items-center justify-center bg-smoke-800">
            <svg className="w-16 h-16 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {specimen.fluorescence && specimen.fluorescence.length > 0 && specimen.fluorescence[0] !== null && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-smoke-200/80 backdrop-blur-sm rounded-full text-xs font-medium text-black">
            ✦ Fluorescent
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-roboto-mono text-md font-semibold text-stone-300 mb-1 line-clamp-1">
          {specimen.name}
        </h3>
        
        {specimen.location && (
          <p className="text-sm text-stone-500 mb-3 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {specimen.location}
          </p>
        )}
        
        {specimen.minerals && specimen.minerals.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {specimen.minerals.slice(0, 2).map((mineral, idx) => (
              <span key={idx} className="badge badge-mineral text-xs">
                {mineral}
              </span>
            ))}
            {specimen.minerals.length > 2 && (
              <span className="badge text-xs">
                +{specimen.minerals.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecimenCard;
