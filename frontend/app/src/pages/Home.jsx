import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.first_name} {user.last_name}</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>NRIC:</strong> {user.nric}</p>
      <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
    </div>
  );
};

export default Home;
