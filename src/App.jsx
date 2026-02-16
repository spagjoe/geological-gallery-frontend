import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpecimenCard from './components/SpecimenCard';
import SpecimenModal from './components/SpecimenModal';
import FilterPanel from './components/FilterPanel';
import LoadingSkeleton from './components/LoadingSkeleton';

// API URL - uses environment variable or falls back to relative path for local dev
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

function App() {
  const [specimens, setSpecimens] = useState([]);
  const [categories, setCategories] = useState({});
  const [filters, setFilters] = useState({
    mineral: '',
    location: '',
    color: '',
    fluorescence: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch specimens when filters or pagination changes
  useEffect(() => {
    fetchSpecimens();
  }, [filters, searchQuery, pagination.page]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSpecimens = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...(searchQuery && { search: searchQuery }),
        ...(filters.mineral && { mineral: filters.mineral }),
        ...(filters.location && { location: filters.location }),
        ...(filters.color && { color: filters.color }),
        ...(filters.fluorescence && { fluorescence: filters.fluorescence })
      });

      const response = await axios.get(`${API_BASE_URL}/specimens?${params}`);
      setSpecimens(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages
      }));
    } catch (err) {
      console.error('Error fetching specimens:', err);
      setError('Failed to load specimens. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1
  };

  const handleClearFilters = () => {
    setFilters({
      mineral: '',
      location: '',
      color: '',
      fluorescence: ''
    });
    setSearchQuery('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen scroll-smooth">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
    <link rel="manifest" href="/site.webmanifest"></link>

      <main className="container mx-auto max-w-7xl px-4 pb-12 lg:-my-16">
        {/* Hero Section */}
          <section className="relative min-h-screen flex items-center overflow-hidden pb-8 lg:pb-0 snap-start snap-always">
            {/* Background gradient base */}
            <div className="absolute inset-0 bg-gradient-to-r from-smoke-800 via-smoke-500 to-smoke-800"></div>

            {/* Content Container */}
            <div className="container mx-auto max-w-7xl px-4 relative z-10">
              <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-center">
                
                {/* Left Side - Text Content */}
                <div className="text-white py-12 lg:py-24 animate-fade-in">
                  <h1 className="font-roboto-mono text-3xl md:text-6xl font-bold mb-3 tracking-tight">
                    mycool.rocks
                    </h1>
                    <p className="font-roboto-mono text-stone-300 text-lg md:text-xl max-w-2xl">
                      <br></br>
                      I like rocks. 
                      <br></br>
                      <br></br>
                      I like finding them, identifying them, and sharing them with others. This is my attempt to catalog my collection in a searchable database full of detailed macro photos and information.
                      <br></br>
                      <br></br>
                      Not all of them are rare or special. 
                      <br></br>
                      But they are pretty cool.
                    </p>

                    {/*Call to action buttons */}
                    <div className="flex flex-wrap gap-4 py-8">
                      <button 
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        className="px-4 py-2 bg-smoke-500/50 hover:bg-smoke-400/50 border border-smoke-300 text-white rounded-lg font-roboto-mono 
                                  transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Browse Collection  🠋
                      </button>
                    </div>
                </div>

                {/* Right Side - Featured Image*/}
                <div className="relative lg:h-[750px]">
                  
                  {/* Featured Image */}
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
            
          </section>
        
        {/* Filter Panel */}
        <div className='snap-start'>
          <FilterPanel
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-stone-600 font-medium">
              {pagination.total === 0 ? 'No specimens found' : 
               pagination.total === 1 ? '1 specimen found' :
               `${pagination.total} specimens found`}
            </p>
            {pagination.totalPages > 1 && (
              <p className="text-stone-500 text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </p>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8 animate-slide-up">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Error Loading Specimens</h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={fetchSpecimens}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                             transition-colors duration-200 text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Empty State */}
        {!loading && !error && specimens.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <svg className="w-24 h-24 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-roboto-mono text-2xl font-semibold text-stone-700 mb-2">No specimens found</h3>
            <p className="text-stone-500 mb-6">Try adjusting your filters or search query.</p>
            <button
              onClick={handleClearFilters}
              className="filter-button filter-button-active"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Specimens Grid */}
        {!loading && !error && specimens.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {specimens.map((specimen, index) => (
              <div
                key={specimen._id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SpecimenCard
                  specimen={specimen}
                  onClick={setSelectedSpecimen}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-4 py-2 rounded-md border border-stone-300 bg-white text-stone-700 
                         hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed 
                         transition-all duration-200 font-medium"
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {[...Array(pagination.totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                // Show first page, last page, current page, and pages around current
                const showPage = 
                  pageNum === 1 || 
                  pageNum === pagination.totalPages || 
                  Math.abs(pageNum - pagination.page) <= 1;
                
                if (!showPage && pageNum === 2) {
                  return <span key={idx} className="px-2 text-stone-400">...</span>;
                }
                if (!showPage && pageNum === pagination.totalPages - 1) {
                  return <span key={idx} className="px-2 text-stone-400">...</span>;
                }
                if (!showPage) return null;

                return (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      pagination.page === pageNum
                        ? 'bg-earth-500 text-white border border-earth-600'
                        : 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 rounded-md border border-stone-300 bg-white text-stone-700 
                         hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed 
                         transition-all duration-200 font-medium"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Specimen Modal */}
      {selectedSpecimen && (
        <SpecimenModal
          specimen={selectedSpecimen}
          onClose={() => setSelectedSpecimen(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-8 px-4 mt-16">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-sm">
            mycool.rocks © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
