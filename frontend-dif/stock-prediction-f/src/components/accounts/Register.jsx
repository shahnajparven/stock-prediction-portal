import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { username, email, password };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData
      );

      console.log(response.data);
      console.log("Registration Successful");
      setSuccess(true);
    } catch (error) {
      setError(error.response.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
        <main className="flex flex-1 flex-col md:flex-row bg-[#131d46] text-white overflow-hidden">
          {/* Left Panel - Forms */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 py-10 bg-white text-black rounded-tr-[30px] md:rounded-tr-[50px] md:rounded-br-[50px] shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Create an account
            </h3>

            {/* Forms */}

            <form onSubmit={handleRegistration}>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none text-sm"
                />
                <small>
                  {error.username && (
                    <div style={{ color: "red" }}>{error.username}</div>
                  )}
                </small>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none text-sm"
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none text-sm"
                />
                <small>
                  {error.password && (
                    <div style={{ color: "red" }}>{error.password}</div>
                  )}
                </small>
              </div>
              {success && (
                <div style={{ color: "green" }}>Registration Successful</div>
              )}
              {loading ? (
                <button
                  type="submit"
                  className="w-full bg-[#131d46] hover:bg-[#1e2a60] text-white px-4 py-2 rounded"
                  disabled
                >
                  <FontAwesomeIcon icon={faSpinner} spin/> Please wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#131d46] hover:bg-[#1e2a60] text-white px-4 py-2 rounded"
                >
                  Register 
                </button>
              )}
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
