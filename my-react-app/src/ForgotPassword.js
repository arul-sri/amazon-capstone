import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, updateItem } from './DynamoDB';
import { sendEmail } from './Email';
import './css/Fonts.css';
import './css/FileSelect.css';
import "./css/requirements.css";
import "./css/ExamplePhotos.css";
import "./css/Login.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Entering handleSubmit");
      console.log("Past email: ", {email});
      const user = await getItem('users', { user_email: email });
      console.log("LOOK HERE", user); 

      if (!user) {
        setMessage('Email does not exist.');
        return;
      }

      const resetToken = Math.random().toString(36).substring(2, 15);
      console.log("token: ", resetToken);
      
      await updateItem('users', { user_email: email }, 'set resetToken = :token', { ':token': resetToken });

      
      //const resetPasswordLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`; //use for localhost
      const resetPasswordLink = `https://www.main.d31olj4k4f139w.amplifyapp.com/reset-password?token=${resetToken}&email=${email}`; //use for amplifyapp
      await sendEmail(email, `Please click on the link to reset your password: ${resetPasswordLink}`);

      setMessage('If your email is in our system, you will receive a password reset email shortly.');
    } catch (error) {
      console.error("Error handling forgot password request:", error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="button-container">
            <button type="submit" className="info_icon">Submit</button>
            <button className="account-exists-button" type="button" onClick={() => navigate('/login')}>
                    Remember password?
            </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
