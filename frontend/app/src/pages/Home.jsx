import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaVenusMars,
  FaIdCard,
  FaSignOutAlt,
} from "react-icons/fa";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      setError("You are not logged in. Please log in to view your profile.");
      setLoading(false);

      setTimeout(() => { // Redirect user to login page after 4 sec delay
        navigate("/");
      }, 4000);

      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/get-user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.user;
        // Convert date to DD/MM/YYYY format
        userData.date_of_birth = new Date(
          userData.date_of_birth
        ).toLocaleDateString("en-GB");

        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError("User data not found.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove jwt token from local storage before redirecting
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-img p-6">
      <div className="profile-card">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="profile-picture">
            <FaUser />
          </div>
          <h2 className="profile-name wrap-text"> {/* wrap text for names that are longer */}
            {user.first_name + " " + user.last_name}
          </h2>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-4">
          <div className="info-box">
            <FaIdCard className="text-blue-600" size={20} />
            <span>
              <strong>NRIC:</strong> {user.nric}
            </span>
          </div>

          <div className="info-box">
            <FaCalendarAlt className="text-green-600" size={20} />
            <span>
              <strong>Date of Birth:</strong> {user.date_of_birth}
            </span>
          </div>

          <div className="info-box wrap-text"> {/* wrap text for addresses that are longer */}
            <FaMapMarkerAlt className="text-red-600" size={20} />
            <span>
              <strong>Address:</strong> {user.address}
            </span>
          </div>

          <div className="info-box">
            <FaVenusMars className="text-purple-600" size={20} />
            <span>
              <strong>Gender:</strong> {user.gender}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
