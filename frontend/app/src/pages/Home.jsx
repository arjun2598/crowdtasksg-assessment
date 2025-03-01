import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaVenusMars, FaIdCard, FaSignOutAlt } from "react-icons/fa";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.user;

        userData.date_of_birth = new Date(userData.date_of_birth)
          .toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY

        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authorization token
    navigate("/"); // Redirect to default login
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Profile
        </h1>
        
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <FaUser className="text-cyan-600" size={20} />
            <span><strong>Name:</strong> {user.first_name + " " + user.last_name}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaIdCard className="text-cyan-600" size={20} />
            <span><strong>NRIC:</strong> {user.nric}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-cyan-600" size={20} />
            <span><strong>Date of Birth:</strong> {user.date_of_birth}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-cyan-600" size={20} />
            <span><strong>Address:</strong> {user.address}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaVenusMars className="text-cyan-600" size={20} />
            <span><strong>Gender:</strong> {user.gender}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition cursor-pointer"
        >
          <FaSignOutAlt size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
