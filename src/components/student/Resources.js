
import React from 'react';

const Resources = () => {
  const resources = [
    { title: 'Data Structures & Algorithms', type: 'PDF', link: '#' },
    { title: 'Web Development Fundamentals', type: 'Video Course', link: '#' },
    { title: 'Machine Learning Basics', type: 'E-book', link: '#' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Learning Resources</h2>
      <div className="grid gap-4">
        {resources.map((resource, idx) => (
          <div key={idx} className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
            <p className="text-gray-600 mb-4">Type: {resource.type}</p>
            <a 
              href={resource.link} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Access Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
