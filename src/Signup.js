import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from ".//firebase";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    rollNumber: "",
    batch: "",
    program: "BTech",
    passoutYear: "",
    mobile: "",
    github: "",
    leetcode: "",
    hackerrank: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.name });

      // Store additional data
      localStorage.setItem("rollNumber", formData.rollNumber);
      localStorage.setItem("batch", formData.batch);
      localStorage.setItem("program", formData.program);
      localStorage.setItem("passoutYear", formData.passoutYear);
      localStorage.setItem("mobile", formData.mobile);
      localStorage.setItem("github", formData.github);
      localStorage.setItem("leetcode", formData.leetcode);
      localStorage.setItem("hackerrank", formData.hackerrank);

      navigate("/student");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("Email already exists");
      } else {
        setError("Error creating account. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create Account</h2>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
          <input name="mobile" type="text" placeholder="Mobile Number" onChange={handleChange} required />
          <input name="rollNumber" type="text" placeholder="Roll Number" onChange={handleChange} required />
          <input name="batch" type="text" placeholder="Batch" onChange={handleChange} required />
          <input name="passoutYear" type="text" placeholder="Passout Year" onChange={handleChange} required />
          <input name="github" type="text" placeholder="GitHub Profile Link" onChange={handleChange} />
          <input name="leetcode" type="text" placeholder="LeetCode Profile Link" onChange={handleChange} />
          <input name="hackerrank" type="text" placeholder="HackerRank Profile Link" onChange={handleChange} />

          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
