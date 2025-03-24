import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Student from "./Student";
import Admin from "./Admin";
import { auth } from "./firebase";

// Student Components
import StudentResources from "./components/student/Resources";
import StudentJobPost from "./components/student/JobPost";
import StudentCoding from "./components/student/Coding";
import StudentProfile from "./components/student/Profile";
import StudentGallery from "./components/student/Gallery";
import StudentApplications from "./components/student/Applications";

// Admin Components
import AdminResources from "./components/admin/Resources";
import AdminJobPost from "./components/admin/JobPost";
import AdminCoding from "./components/admin/Coding";
import AdminProfile from "./components/admin/Profile";
import AdminGallery from "./components/admin/Gallery";
import AdminApplications from "./components/admin/Applications";

const AuthHandler = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();




  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get role from localStorage
        const storedRole = localStorage.getItem("userRole");
        
        if (storedRole) {
          setUser(user);
          setRole(storedRole);
          
          // Only navigate if we're not already on the correct path
          const currentPath = window.location.pathname;
          const expectedPath = `/${storedRole}`;
          
          if (!currentPath.startsWith(expectedPath)) {
            navigate(expectedPath, { replace: true });
          }
        } else {
          // If no role is found, redirect to login
          setUser(null);
          setRole(null);
          navigate('/login', { replace: true });
        }
      } else {
        // Clear everything if no user
        setUser(null);
        setRole(null);
        localStorage.removeItem("userRole");
        
        // Only navigate to login if we're not already there or at signup
        if (!['/login', '/signup'].includes(window.location.pathname)) {
          navigate('/login', { replace: true });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!user || !role) {
      return <Navigate to="/login" replace />;
    }

    if (role !== allowedRole) {
      return <Navigate to={`/${role}`} replace />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route 
        path="/login" 
        element={
          user && role ? <Navigate to={`/${role}`} replace /> : <Login />
        } 
      />
      
      <Route 
        path="/signup" 
        element={
          user && role ? <Navigate to={`/${role}`} replace /> : <Signup />
        } 
      />

      


      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRole="admin">
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminProfile />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="jobpost" element={<AdminJobPost />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="coding" element={<AdminCoding />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="gallery" element={<AdminGallery />} />
      </Route>

      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRole="student">
            <Student />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentProfile />} />
        <Route path="resources" element={<StudentResources />} />
        <Route path="jobpost" element={<StudentJobPost />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="coding" element={<StudentCoding />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="gallery" element={<StudentGallery />} />
      </Route>
    </Routes>
  );
};

export default AuthHandler;