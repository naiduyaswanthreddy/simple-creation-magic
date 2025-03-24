import React from 'react';

const JobPost = () => {
  const jobs = [
    {
      company: 'Amazon',
      position: 'SDE Intern, 2026 PO',
      description: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit....',
    },
    {
      company: 'Providence',
      position: 'Data Analyst',
      description: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit....',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Job Postings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-xl font-semibold mb-4">{job.company}</div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">{job.position}</h3>
              <p className="text-gray-600 text-sm mt-2">{job.description}</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                Know More
              </button>
              <button className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPost;