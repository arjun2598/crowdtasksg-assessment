import React, { useState } from 'react'
import PasswordInput from '../PasswordInput';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Login = () => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevents default submission of form

        if (!username) {
            setError("Please enter a username.");
            return;
        }

        if (!password) {
            setError("Please enter a password.");
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
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken); // store access token if present
                navigate("/dashboard"); // route to home page
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); 
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className='h-screen bg-cyan-50 overflow-hidden relative'> 
            <div className='login-ui-box right-10 -top-40' />
            <div className='login-ui-box bg-cyan-200 -bottom-40 right-1/2' />

            <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
                <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl font-semibold mb-7'>Login</h4>

                        <input
                            type='text'
                            placeholder='Username'
                            className='input-box'
                            value={username}
                            onChange={({ target }) => {
                                setUsername(target.value)
                            }}
                        />

                        <PasswordInput
                            value={password}
                            onChange={({ target }) => {
                                setPassword(target.value)
                            }}
                        />

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                        <button type='submit' className='btn-primary'>
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login