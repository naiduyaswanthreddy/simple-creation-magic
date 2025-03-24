
import React from 'react';

const Resources = () => {
  const resources = [
    { title: 'Data Structures & Algorithms', type: 'PDF', link: '#' },
    { title: 'Web Development Fundamentals', type: 'Video Course', link: '#' },
    { title: 'Machine Learning Basics', type: 'E-book', link: '#' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Manage Resources</h2>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6">
        + Add New Resource
      </button>
      <div className="grid gap-4">
        {resources.map((resource, idx) => (
          <div key={idx} className="p-6 bg-white rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <p className="text-gray-600">Type: {resource.type}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
