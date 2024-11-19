import { X } from 'lucide-react';
import React from 'react';

interface DiscoverFilterProps {
  onClose: () => void;
}

export default function DiscoverFilter({ onClose }: DiscoverFilterProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-surface rounded-xl w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Advanced Filters</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Status</h3>
            <div className="flex gap-3">
              {['Ongoing', 'Completed', 'Hiatus'].map(status => (
                <label key={status} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Chapter Count</h3>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min"
                className="w-24 px-3 py-2 rounded-lg border border-gray-200"
              />
              <span className="self-center">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-24 px-3 py-2 rounded-lg border border-gray-200"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Rating</h3>
            <div className="flex gap-3">
              {[4.5, 4.0, 3.5].map(rating => (
                <label key={rating} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>≥ {rating}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Release Year</h3>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-200">
              <option value="">Any year</option>
              {[2024, 2023, 2022, 2021, 2020].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button className="btn-primary">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}