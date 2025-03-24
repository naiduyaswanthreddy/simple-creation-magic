import React from 'react';

const Profile = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Name</h3>
              <p className="font-medium">Paxton</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Roll Number</h3>
              <p className="font-medium">AV.EN.U4CSE22100</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Program</h3>
              <p className="font-medium">BTech</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="font-medium">paxton@gmail.com</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Mobile</h3>
              <p className="font-medium">+91 9063553559</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Batch</h3>
              <p className="font-medium">AV22UCSEB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;