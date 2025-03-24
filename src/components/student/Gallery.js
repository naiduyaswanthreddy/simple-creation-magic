import React from 'react';

const Gallery = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder for gallery items */}
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Gallery Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;