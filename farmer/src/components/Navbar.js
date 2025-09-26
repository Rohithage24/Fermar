import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import LogoutButton from './LogoutButton';
import '../styles/Navbar.css';

const Navbar = () => {
  const { language,translations, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [auth] = useAuth();
  // State to manage the dropdown's open/close status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  // Links in Navbar
  const links = [
    { label: 'Home', path: '/' },
    { label: translations.aboutTitle, path: '/about' }
  ];

  // Language options
  const languages = ['English', 'Hindi', 'Marathi', 'Odia'];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const AuthButton = () => {
    if (auth.user) {
      // Note: Removed Bootstrap classes from LogoutButton for consistency
      return <LogoutButton className='btn-success ms-3 px-4' />; 
    } else {
      return (
        <button
          type='button'
          className='btn-success ms-3 px-4'
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      );
    }
  };

  return (
    <nav className='navbar navbar-expand-lg custom-navbar z-index p-3'>
      <div className='container-fluid'>
        {/* Logo */}
        <a
          className='navbar-brand custom-logo text-success fw-bold fs-5'
          href='#'
          onClick={e => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <span className='me-2'>🌾</span>AgroSanga
        </a>

        {/* Mobile Toggler (Requires Bootstrap JS for collapse, but left for structure) */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Collapsible Links */}
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav ms-auto align-items-center'>
            {/* Navbar Links */}
            {links.map((link, i) => (
              <button
                key={i}
                type='button'
                className='custom-btn' // Use custom-btn class from CSS
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </button>
            ))}

            {/* Language Dropdown - Now managed by React state */}
            <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`} 
                 onMouseLeave={() => setIsDropdownOpen(false)}> 
              <button
                className='dropdown-toggle'
                type='button'
                id='languageDropdown'
                onClick={() => setIsDropdownOpen(prev => !prev)} // Toggle state on click
                aria-expanded={isDropdownOpen}
              >
                <span className='me-2'>🌐</span>
                {language|| 'English'}
              </button>

              <ul 
                className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} // Conditionally show
                aria-labelledby='languageDropdown'
                style={{ position: 'absolute' }} // Needed to prevent layout shift
              >
                {languages.map((lang, i) => (
                  <li key={i}>
                    <a
                      className='dropdown-item'
                      href='#'
                      onClick={e => {
                        e.preventDefault();
                        handleLanguageChange(lang); 
                      }}
                    >
                      {lang}
                    </a>
                  </li>
                ))}

                <li>
                  <hr className='dropdown-divider' />
                </li>

                {/* Home button inside language dropdown */}
                <li>
                  <a
                    className='dropdown-item'
                    href='#'
                    onClick={e => {
                      e.preventDefault();
                      navigate('/'); 
                      setIsDropdownOpen(false);
                    }}
                  >
                    Home
                  </a>
                </li>
              </ul>
            </div>

            {/* Login / Logout Button */}
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;