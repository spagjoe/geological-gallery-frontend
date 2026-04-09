import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpecimenCard from '../components/SpecimenCard';
import SpecimenModal from '../components/SpecimenModal';
import FilterPanel from '../components/FilterPanel';
import LoadingSkeleton from '../components/LoadingSkeleton';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const Gallery = () => {
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

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchSpecimens(); }, [filters, searchQuery, pagination.page]);

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
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({ mineral: '', location: '', color: '', fluorescence: '' });
    setSearchQuery('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 pb-12 pt-24">
      <FilterPanel
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Results Count */}
      {!loading && (
        <div className="mb-6 flex items-center justify-between">
          <p className="text-stone-600 font-medium">
            {pagination.total === 0 ? 'No specimens found' :
             pagination.total === 1 ? '1 specimen found. Click card to expand.' :
             `${pagination.total} specimens found. Click card to expand.`}
          </p>
          {pagination.totalPages > 1 && (
            <p className="text-stone-600 font-medium">
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
              <button onClick={fetchSpecimens} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium">
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingSkeleton />}

      {/* Empty State */}
      {!loading && !error && specimens.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <svg className="w-24 h-24 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-roboto-mono text-2xl font-semibold text-stone-700 mb-2">No specimens found</h3>
          <p className="text-stone-500 mb-6">Try adjusting your filters or search query.</p>
          <button onClick={handleClearFilters} className="filter-button filter-button-active">
            Clear All Filters
          </button>
        </div>
      )}

      {/* Specimens Grid */}
      {!loading && !error && specimens.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {specimens.map((specimen, index) => (
            <div key={specimen._id} style={{ animationDelay: `${index * 50}ms` }}>
              <SpecimenCard specimen={specimen} onClick={setSelectedSpecimen} />
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
            className="px-4 py-2 rounded-md border border-smoke-700 bg-smoke-400 text-stone-300 
                       hover:bg-smoke-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {[...Array(pagination.totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              const showPage = pageNum === 1 || pageNum === pagination.totalPages || Math.abs(pageNum - pagination.page) <= 1;
              if (!showPage && pageNum === 2) return <span key={idx} className="px-2 text-stone-300">...</span>;
              if (!showPage && pageNum === pagination.totalPages - 1) return <span key={idx} className="px-2 text-stone-300">...</span>;
              if (!showPage) return null;
              return (
                <button
                  key={idx}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    pagination.page === pageNum
                      ? 'bg-smoke-400 text-stone-300 border border-pyrite-600'
                      : 'border border-smoke-700 bg-smoke-400 text-stone-300 hover:bg-smoke-300'
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
            className="px-4 py-2 rounded-md border border-smoke-700 bg-smoke-400 text-stone-300 
                       hover:bg-smoke-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            Next
          </button>
        </div>
      )}

      {selectedSpecimen && (
        <SpecimenModal specimen={selectedSpecimen} onClose={() => setSelectedSpecimen(null)} />
      )}
    </main>
  );
};

export default Gallery;