import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter and Routes
import Homepage from './Homepage';
import HomepageSpanish from "./HomepageSpanish";
import HomepageFrench from './HomepageFrench';
import HomepageJapanese from './HomepageJapanese';
import HomepageArabic from './HomepageArabic';
import Admin from "./Admin";
import Layout from "./layout";
import Login from "./Login";
import Signup from "./Signup"
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ChartPage from "./ChartPage";
import { beginning_map, custom_map } from './ConfidenceUpdating';


// ReactDOM.render(
//   <Router> {/* Wrap your Routes with the Router component */}
//     <Routes>
//       <Route path='/' element={<Homepage />} />
//       <Route path='/homepage-es' element={<HomepageSpanish />} />
//       <Route path='/admin' element={<Admin />} />
//     </Routes>
//   </Router>,
//   document.getElementById('root')
// );

const App = () => {
  const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'english');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLanguageChange = (selectedLanguage) => {
    beginning_map.Labels.forEach(item => {
      item.Confidence = -1;
    })

    custom_map.Labels.forEach(item => {
      item.Confidence = -1;
    })
    setLanguage(selectedLanguage);
    localStorage.setItem('preferredLanguage', selectedLanguage);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <Router>
      <Layout onLanguageChange={handleLanguageChange} currentLanguage={language}>
        <Routes>
          {/* Redirect default to login page */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/home" element={
            language === 'english' ? <Homepage /> :
            language === 'spanish' ? <HomepageSpanish /> :
            language === 'french' ? <HomepageFrench /> :
            language === 'japanese' ? <HomepageJapanese /> :
            language === 'arabic' ? <HomepageArabic /> : null
          } />
          <Route path='/admin' element={<Admin />} />
          <Route path='/chart' element={<ChartPage />}/>
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          {/* <Route path='/reset-password' element={<ResetPassword/>} /> */}
          {/* <Route path='/admin' element={isLoggedIn ? <Admin /> : <Login />} /> */}
          {/* <Route
            path="/admin"
            element={<Login isLoggedIn={isLoggedIn} setLoggedIn={handleLoginStatusChange} />}
          />
          <Route path="/admin" element={isLoggedIn ? <Admin /> : <Login />} /> */}

       </Routes>
      </Layout>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));