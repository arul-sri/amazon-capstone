import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { putItem, getItem } from './DynamoDB.js';
import CryptoJS from 'crypto-js';
import Layout from './layout';
import './css/Fonts.css';
import './css/FileSelect.css';
import './css/requirements.css';
import './css/ExamplePhotos.css';
import './css/Login.css';

// Define the Signup component
function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
});
const [emailError, setEmailError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData =>({
      ...prevFormData,
      [name]: value
    }));
    if (name === 'email') setEmailError('');
  };

  // Helper function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Simple regex for email validation
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
        setEmailError('Please enter a valid email address.');
        return;
    }

    // Check if the email already exists in the database
    try {
      const existingUser = await getItem('users', { user_email: formData.email });
      if (existingUser) {
          setEmailError('Email already in use. Please log in or use a different email.');
          return;
      }
    } catch (error) {
      console.error('Error checking user email:', error);
      return;
    } 

    console.log('Form submitted', formData);

    const hashedPassword = CryptoJS.SHA256(formData.password).toString();
    const userItem = {
        user_email: formData.email,
        user_password: hashedPassword,
        admin_access: false,
    };

    try {
        await putItem('users', userItem);
        console.log('User created:', userItem);
        navigate('/login');
    } catch (error) {
        console.error('Error creating user:', error);
    }
  };

  return (
    <div className="login-container"> {/* Use the same container class as in the login */}
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            {emailError && <div className="error-message">{emailError}</div>}
            <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
            />
            <div className="button-container"> {/* New wrapper div for buttons */}
              <button className="info_icon" type="submit">Sign Up</button>
              <button className="account-exists-button" type="button" onClick={() => navigate('/login')}>
                Already have an account?
              </button>
            </div>
        </form>
    </div>
  );
}

export default Signup;
