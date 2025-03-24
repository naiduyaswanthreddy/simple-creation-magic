
import React from 'react';

const Applications = () => {
  const applications = [
    { company: 'Amazon', position: 'SDE Intern', status: 'In Progress', date: '2024-02-01' },
    { company: 'Google', position: 'Software Engineer', status: 'Submitted', date: '2024-01-28' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">My Applications</h2>
      <div className="grid gap-4">
        {applications.map((app, idx) => (
          <div key={idx} className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{app.company}</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Position: {app.position}</p>
              <p className="text-gray-600">Status: {app.status}</p>
              <p className="text-gray-600">Applied: {app.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
