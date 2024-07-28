import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem } from './DynamoDB.js';
import CryptoJS from 'crypto-js';
// import Layout from './layout.jsx';
import './css/Fonts.css';
import './css/FileSelect.css';
import "./css/requirements.css";
import "./css/ExamplePhotos.css";
import "./css/Login.css";



// make a login component that handles if the user is logged in
// for now this is without a db with any user 

// import React from 'react';

function Login() {
  // Use react navigation for smoother transition
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'https://q0onem8g1i.execute-api.us-east-2.amazonaws.com/login'; // Replace with your API Gateway endpoint URL

    const data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      // Handle the response data
      console.log(responseData);
      //console.log('Login Successful');

      // User login directing
      getItem('users', { user_email: responseData.username  }).then((acc) => {
        const hashedPassword = CryptoJS.SHA256(responseData.password).toString();
        if(responseData.username === acc.user_email && hashedPassword === acc.user_password && acc.admin_access === false){
          localStorage.setItem('isLoggedIn', 'user');
          localStorage.setItem('userEmail', acc.user_email);
          navigate('/home');
        }
        else if(responseData.username === acc.user_email && hashedPassword === acc.user_password && acc.admin_access === true){
          localStorage.setItem('isLoggedIn', 'admin');
          localStorage.setItem('userEmail', acc.user_email);
          navigate('/admin');
        }
        else {
          alert('Your password was incorrect. Try Again.');
        }
      }).catch(error => {
        // Handle errors if any
        console.error("User does not exist in database.");
        alert("Your account does not exist. Please sign up to access the portal.");
      });
      
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
    
  };
    
  return (
    // <div>
       
      <div class="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-container"> {/* New wrapper div for buttons */}
            <button className="info_icon" type="submit">Login</button>
            <button className="account-exists-button" type="button" onClick={() => navigate('/signup')}>
                Create an Account
            </button>
            <button className="account-exists-button" type="button" onClick={() => navigate('/forgot-password')}>
                Forgot password
            </button>
          </div>
        </form>

    </div>

  );
}


export default Login;
