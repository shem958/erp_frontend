import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing the icons
import "./Login.css";
/*
> Use navigate : A hook from 'react-router-dom' used for navigation between routes
> "./Login.css" CSS file for styling the component 
*/
const Login = () => {
  const [email, setEmail] = useState("");
  // email - A state variable used to hold the user's email input
  const [password, setPassword] = useState("");
  // password -  A state variable to hold the user's password
  const [showPassword, setShowPassword] = useState(false); // State to track if password is shown
  const navigate = useNavigate();
  // navigate - A function used to programmatically navigate to a different route within the application

  //handleSubmit function - (purpose : to handle the form submission)
  // Parameters : 'event' - the form submission event
  const handleSubmit = (event) => {
    event.preventDefault();
    // Simple authentication logic (you can replace this with actual authentication)
    if (email === "admin@example.com" && password === "password") {
      navigate("/data-table");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleCreateAccount = () => {
    navigate("/create-account");
  };
  return (
    <div className="login-container">
      <div className="login-image">
        {/* Add your image or background here */}
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Log In</h2>
          <p>To access your account</p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <a href="#forgot-password" className="forgot-password">
            I forgot my password
          </a>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        <div className="create-account-container">
          <p>Don’t have an account?</p>
          <button
            type="button"
            className="create-account-button"
            onClick={handleCreateAccount}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
