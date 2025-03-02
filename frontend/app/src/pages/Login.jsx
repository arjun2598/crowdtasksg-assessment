import React, { useState } from "react";
import PasswordInput from "../PasswordInput";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent default submission of form

    if (!username) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        username: username,
        password: password,
      });

      // Handle Successful login response
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token); // store access token if present
        navigate("/dashboard"); // route to home page
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container bg-img">
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="login-form-wrapper">
          <form onSubmit={handleLogin}>
            <h4 className="text-4xl font-semibold mb-7 text-white text-center">
              Login
            </h4>

            <div className="relative py-2">
              <FaUser className="username-icon" />
              <input
                type="text"
                placeholder="Username"
                className="input-box"
                value={username}
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
              />
            </div>

            <PasswordInput
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <div className="py-3">
              <button type="submit" className="btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
