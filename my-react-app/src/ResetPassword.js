import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getItem, updateItem } from './DynamoDB'; // Assuming you have a method to update the user's password
import CryptoJS from 'crypto-js';
import Layout from './layout.jsx';
import './css/Fonts.css';
import './css/FileSelect.css';
import "./css/requirements.css";
import "./css/ExamplePhotos.css";
import "./css/Login.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const query = useQuery();
  const resetToken = query.get('token');
  const email = query.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation for example purposes
    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    try {
      const user = await getItem('users', { user_email: email });
      if (user) {
        const resetTokenFromDB = user.resetToken;
        if (resetToken != resetTokenFromDB){
            setMessage('Invalid or expired reset token.');
            return;
        }
      } else {
        setMessage('User does not exist.');
        return;
      }

      // Encrypt the password using SHA256
      const encryptedPassword = CryptoJS.SHA256(password).toString();
      console.log("Reset token: ", resetToken);
      console.log("New password: ", encryptedPassword);

      await updateItem('users', { user_email: email }, 'set user_password = :password', { ':password': encryptedPassword });

      setMessage('Your password has been successfully reset. Routing you to login page in 5 seconds.');
      setTimeout(() => {
        navigate('/login'); // Use navigate to redirect
      }, 5000);
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage('Failed to reset password. Please try the link again or request a new one.');
    }
  };

  return (
    <div class="login-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="button-container">
            <button className="info_icon" type="submit">Reset Password</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
