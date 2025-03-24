import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserData({
        name: user.displayName || "User",
        email: user.email,
        mobile: localStorage.getItem("mobile"),
        rollNumber: localStorage.getItem("rollNumber"),
        batch: localStorage.getItem("batch"),
        program: localStorage.getItem("program"),
        passoutYear: localStorage.getItem("passoutYear"),
        github: localStorage.getItem("github"),
        leetcode: localStorage.getItem("leetcode"),
        hackerrank: localStorage.getItem("hackerrank"),
      });
    }
  }, []);

  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Name</h3>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Roll Number</h3>
              <p className="font-medium">{userData.rollNumber}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Program</h3>
              <p className="font-medium">{userData.program}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Passout Year</h3>
              <p className="font-medium">{userData.passoutYear}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="font-medium">{userData.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Mobile</h3>
              <p className="font-medium">{userData.mobile}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Batch</h3>
              <p className="font-medium">{userData.batch}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <a href={userData.github} className="btn">GitHub Profile</a>
          <a href={userData.leetcode} className="btn">LeetCode Profile</a>
          <a href={userData.hackerrank} className="btn">HackerRank Profile</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
