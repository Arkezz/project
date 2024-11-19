import { ChevronDown } from 'lucide-react';
import React from 'react';

export default function FilterBar() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <button className="btn-filter">
          Genre
          <ChevronDown size={16} />
        </button>
        <button className="btn-filter">
          Language
          <ChevronDown size={16} />
        </button>
        <button className="btn-filter">
          Status
          <ChevronDown size={16} />
        </button>
        <button className="btn-filter">
          Sort by
          <ChevronDown size={16} />
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="btn-primary">
          + Track New Novel
        </button>
      </div>
    </div>
  );
}