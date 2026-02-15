import React from 'react';

const FilterPanel = ({ 
  categories, 
  filters, 
  onFilterChange, 
  onClearFilters,
  searchQuery,
  onSearchChange 
}) => {
  const hasActiveFilters = filters.mineral || filters.location || filters.color || filters.fluorescence || searchQuery;

  return (
    <div className="bg-smoke-700 rounded-xl shadow-sm border border-smoke-300 p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <label className="block text-sm font-medium font-roboto-mono text-stone-200 mb-2">Search</label>
        <div className="relative">
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search specimens by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input pl-10"
          />
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Mineral Filter */}
        <div>
          <label className="block text-sm font-medium font-roboto-mono text-stone-200 mb-2">Mineral</label>
          <select
            value={filters.mineral}
            onChange={(e) => onFilterChange('mineral', e.target.value)}
            className="w-full px-3 py-2 rounded-md border-2 border-smoke-300 bg-smoke-400 text-stone-200 
                       focus:border-pyrite-600 focus:ring-1 focus:ring-pyrite-200/80 
                       transition-all duration-200 outline-none"
          >
            <option value="">All Minerals</option>
            {categories.minerals?.map((mineral) => (
              <option key={mineral} value={mineral}>{mineral}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium font-roboto-mono text-stone-200 mb-2">Location</label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 rounded-md border-2 border-smoke-300 bg-smoke-400 text-stone-200  
                       focus:border-pyrite-600 focus:ring-1 focus:ring-pyrite-200/80 
                       transition-all duration-200 outline-none"
          >
            <option value="">All Locations</option>
            {categories.locations?.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label className="block text-sm font-medium font-roboto-mono text-stone-200 mb-2">Color</label>
          <select
            value={filters.color}
            onChange={(e) => onFilterChange('color', e.target.value)}
            className="w-full px-3 py-2 rounded-md border-2  border-smoke-300 bg-smoke-400 text-stone-200 
                       focus:border-pyrite-600 focus:ring-1 focus:ring-pyrite-200/80
                       transition-all duration-200 outline-none"
          >
            <option value="">All Colors</option>
            {categories.colors?.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        {/* Fluorescence Filter */}
        <div>
          <label className="block text-sm font-medium font-roboto-mono text-stone-200 mb-2">Fluorescence</label>
          <select
            value={filters.fluorescence}
            onChange={(e) => onFilterChange('fluorescence', e.target.value)}
            className="w-full px-3 py-2 rounded-md border-2  border-smoke-300 bg-smoke-400 text-stone-200 
                       focus:border-pyrite-600 focus:ring-1 focus:ring-pyrite-200/80
                       transition-all duration-200 outline-none"
          >
            <option value="">All Specimens</option>
            <option value="all_fluorescent">Only Fluorescent</option>
            <option value="shortwave">Shortwave (SW)</option>
            <option value="midwave">Midwave (MW)</option>
            <option value="longwave">Longwave (LW)</option>
            <option value="non_fluorescent">Non-Fluorescent</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-2 px-4 py-2 rounded-md  border-smoke-300 bg-smoke-400 text-stone-200 
                     hover:bg-smoke-300 transition-colors duration-200 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
