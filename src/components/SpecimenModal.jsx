import React, { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const SpecimenModal = ({ specimen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = specimen.imageLink || [];
  const hasMultipleImages = images.length > 1;

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm 
                     hover:bg-white shadow-lg transition-all duration-200 group"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-stone-700 group-hover:text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-[7fr_3fr] gap-6 p-6 md:p-8">
          {/* Image Section */}
          <div className="relative">
            <div className="sticky top-0">
              {images.length > 0 ? (
                <div className="relative rounded-lg overflow-hidden bg-black shadow-lg">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${specimen.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-auto max-h-[70vh] object-contain cursor-pointer"
                    onClick={() => window.open(images[currentImageIndex], '_blank')}
                    title="Click to view full size in new tab"
                  />
                  {hasMultipleImages && (
                    <>
                      {/* Previous button */}
                      <button
                        onClick={previousImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full 
                                   bg-black/20 hover:bg-white/20 shadow-lg 
                                   transition-all duration-200"
                        aria-label="Previous image"
                      >
                        <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      {/* Next button */}
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full 
                                   bg-black/20 hover:bg-white/20 shadow-lg 
                                   transition-all duration-200"
                        aria-label="Next image"
                      >
                        <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Image counter */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 
                                      rounded-full bg-black/70 backdrop-blur-sm text-stone-400 text-sm font-mono">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-square rounded-lg bg-stone-200 flex items-center justify-center">
                  <svg className="w-24 h-24 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Thumbnail strip */}
              {hasMultipleImages && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        idx === currentImageIndex 
                          ? 'border-pyrite-700 shadow-md' 
                          : 'border-stone-600 hover:border-stone-500'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h2 className="font-roboto-mono text-3xl md:text-4xl font-bold text-stone-200 mb-2">
                {specimen.name}
              </h2>
              {specimen.location && (
                <p className="text-stone-500 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {specimen.location}
                </p>
              )}
            </div>

            {specimen.description && (
              <div>
                <h3 className="font-roboto-mono text-lg font-semibold text-stone-300 mb-2">Description</h3>
                <p className="text-stone-500 leading-relaxed">{specimen.description}</p>
              </div>
            )}

            {specimen.minerals && specimen.minerals.length > 0 && (
              <div>
                <h3 className="font-roboto-mono text-lg font-semibold text-stone-300 mb-2">Mineral Composition</h3>
                <div className="flex flex-wrap gap-2">
                  {specimen.minerals.map((mineral, idx) => (
                    <span key={idx} className="badge badge-mineral">
                      {mineral}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {specimen.colors && specimen.colors.length > 0 && (
              <div>
                <h3 className="font-roboto-mono text-lg font-semibold text-stone-300 mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {specimen.colors.map((color, idx) => (
                    <span key={idx} className="badge badge-color">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {specimen.fluorescence && specimen.fluorescence.length > 0 && specimen.fluorescence[0] != null &&(
              <div>
                <h3 className="font-roboto-mono text-lg font-semibold text-stone-300 mb-2 flex items-center gap-2">
                  <span>Fluorescence</span>
                  {specimen.fluorescence[0] !== null && <span className="text-smoke-200">✦</span>}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {specimen.fluorescence.map((fluor, idx) => (
                    <span 
                      key={idx} 
                      className={`badge ${fluor === 'None' ? '' : 'bg-smoke-200/100 text-smoke-800 border-smoke-300'}`}
                    >
                      {fluor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {specimen.dateAdded && (
              <div className="pt-4 border-t border-stone-200">
                <p className="text-sm text-stone-500 font-roboto-mono">
                  Added: {new Date(specimen.dateAdded).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecimenModal;
