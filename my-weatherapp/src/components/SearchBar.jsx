import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, onLocationClick }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex bg-white bg-opacity-20 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">
          <button
            type="button"
            onClick={onLocationClick}
            className="px-4 py-4 text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            aria-label="Use current location"
          >
            <MapPin className="w-6 h-6" />
          </button>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white placeholder-opacity-70 focus:outline-none text-lg"
          />
          
          <button
            type="submit"
            className="px-6 py-4 text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;