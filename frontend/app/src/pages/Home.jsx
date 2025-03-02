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
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.user;
        userData.date_of_birth = new Date(userData.date_of_birth).toLocaleDateString("en-GB");

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
    localStorage.removeItem("token");
    navigate("/");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-img bg-cover bg-center p-6">
      <div className="bg-transparent backdrop-blur-md outline shadow-2xl rounded-xl p-8 max-w-md w-full relative overflow-hidden">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-4xl shadow-md">
            <FaUser />
          </div>
          <h2 className="text-2xl text-white font-semibold mt-4 wrap-text">{user.first_name + " " + user.last_name}</h2>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg font-semibold">
            <FaIdCard className="text-blue-600" size={20} />
            <span><strong>NRIC:</strong> {user.nric}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg font-semibold">
            <FaCalendarAlt className="text-green-600" size={20} />
            <span><strong>Date of Birth:</strong> {user.date_of_birth}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg wrap-text font-semibold">
            <FaMapMarkerAlt className="text-red-600" size={20} />
            <span><strong>Address:</strong> {user.address}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg font-semibold">
            <FaVenusMars className="text-purple-600" size={20} />
            <span><strong>Gender:</strong> {user.gender}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition cursor-pointer"
        >
          <FaSignOutAlt size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
