
import React from 'react';

const Profile = () => {
  const adminData = {
    name: 'Admin User',
    email: 'admin@university.edu',
    department: 'Computer Science',
    position: 'Placement Coordinator',
    phone: '+1234567890',
    office: 'Block A, Room 101'
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Admin Profile</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Name</h3>
              <p className="font-medium">{adminData.name}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="font-medium">{adminData.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Department</h3>
              <p className="font-medium">{adminData.department}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Position</h3>
              <p className="font-medium">{adminData.position}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Phone</h3>
              <p className="font-medium">{adminData.phone}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Office</h3>
              <p className="font-medium">{adminData.office}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
