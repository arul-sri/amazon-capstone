import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import amazonPicture from './images/amazon-logo-transparent.webp';
import './css/Header.css';
import './css/Footer.css';
// import ChartPage from './ChartPage';

// layout.jsx is for reusability - includes the header and footer styling
const Layout = ({ children, onLanguageChange, currentLanguage }) => {
  const location = useLocation();
  const showLanguageDropdown = (location.pathname !== '/admin' && location.pathname !== '/admin/'
  && location.pathname !== '/login' && location.pathname !== '/login/');

  const showChartDataOption = (location.pathname === '/admin' || location.pathname === '/admin/');
  const headerLinks = {
    english: {
      headerTitle: 'Employee Badge Image Validation Tool',
      aboutAmazon: 'About Amazon',
      amazonCulture: 'Amazon Culture',
      logout: 'Logout',
      chartPage: 'Chart Data',
      evaluate: 'Manually Review',
      footerText: '© 2024, Amazon Web Services, Inc. or its affiliates. All rights reserved.'
    },
    spanish: {
      headerTitle: 'Herramienta de Validación de Imágenes de Insignias de Empleado',
      aboutAmazon: 'Acerca de Amazon',
      amazonCulture: 'Cultura de Amazon',
      logout: 'Cerrar sesión',
      footerText: '© 2024, Amazon Web Services, Inc. o sus filiales. Todos los derechos reservados.'
    },
    french: {
      headerTitle: 'Outil de Validation d\'Image d\'Insigne d\'Employé',
      aboutAmazon: 'À propos d\'Amazon',
      amazonCulture: 'Culture Amazon',
      logout: 'Se déconnecter',
      footerText: '© 2024, Amazon Web Services, Inc. ou ses sociétés apparentées. Tous droits réservés.'
    },
    japanese: {
      headerTitle: '従業員バッジ画像検証ツール',
      aboutAmazon: 'アマゾンについて',
      amazonCulture: 'アマゾンの文化',
      logout: 'ログアウト',
      footerText: '© 2024、Amazon Web Services, Inc.またはその関連会社。全著作権所有。'
    },
    arabic: {
      headerTitle: 'أداة التحقق من صور شارات الموظفين',
      aboutAmazon: 'حول أمازون',
      amazonCulture: 'ثقافة أمازون',
      logout: 'تسجيل الخروج',
      footerText: '© 2024، شركة Amazon Web Services, Inc. أو الشركات التابعة لها. جميع الحقوق محفوظة.'
    }
  };

  // Logout and clear user
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', '');
    localStorage.setItem('userEmail', '');
  };

  const renderHeaderContent = () => {
    const { headerTitle } = headerLinks[currentLanguage];
    return (
      <>
        <li className="header-list-element"><a>
          <img className="amazon-image" src={amazonPicture} alt="Amazon Logo" /></a>
        </li>

        <li className="header-list-element">
          <p className="header-title"><strong>{headerTitle}</strong></p>
        </li>
      </>
    );
  };

  const renderNavLinks = () => {
    const { aboutAmazon, amazonCulture, logout, chartPage, evaluate } = headerLinks[currentLanguage];
    // Initialize local storage if it doesn't exist
    if (localStorage.getItem('isLoggedIn') === null && localStorage.getItem('userEmail') === null) {
      localStorage.setItem('isLoggedIn', '');
      localStorage.setItem('userEmail', '');
    }
    const userName = localStorage.getItem('userEmail').split('@')[0];

    return (
      <>
        <li className='header-list-element'>
          <a className="amazon-link" href="https://www.aboutamazon.com/">{aboutAmazon}</a>
        </li>
        <li className='header-list-element'>
          <a className="amazon-link" href="https://www.amazon.jobs/en/landing_pages/working-at-amazon">{amazonCulture}</a>
        </li>
        {showLanguageDropdown && (
          <li className='lang-element'>
            <select className='amazon-link-dropdown' value={currentLanguage} onChange={(e) => onLanguageChange(e.target.value)}>
              <option value="english">English</option>
              <option value="spanish">Español</option>
              <option value="french">Français</option>
              <option value="japanese">日本語</option>
              <option value="arabic">عربي</option>
            </select>
          </li>
        )}
        {(location.pathname === '/chart' || location.pathname === '/chart/') && (
          <li className='header-list-element'>
            <a className='amazon-link' href="/admin">{evaluate}</a>
          </li>
        )}
        {(location.pathname === '/admin' || location.pathname === '/home' || location.pathname === '/admin/' || location.pathname === '/home/' || location.pathname === '/chart' || location.pathname === '/chart/') && (
          <li className='header-list-element'>
            <a className='amazon-link' onClick={handleLogout} href="/login">{logout}</a>
          </li>
        )}
        {showChartDataOption && (
          <li className='header-list-element'>
            <a className='amazon-link' href="/chart">{chartPage}</a>
          </li>
        )}
        {(location.pathname !== '/login' && location.pathname !== '/login/') && (
        <li className='header-list-element'>
          <a id="username">{userName}</a>
        </li>
        )}
      </>
    );
  };

  const renderFooter = () => {
    const { footerText } = headerLinks[currentLanguage];
    return <p>{footerText}</p>;
  };

  return (
    <div className="page-wrapper">
      <header>
        {/* Header Styling */}
        <ul className="header-content">
          {/* Amazon Image*/}
          {renderHeaderContent()}
        </ul>
        <ul className='small-banner'>
          {renderNavLinks()}
        </ul>
      </header>

      {/* Main content of page - different for each page */}
      <main>{children}</main>

      {/* Footer Styling */}
      <footer className="footer">
        <div id="footer-container">
          {renderFooter()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;