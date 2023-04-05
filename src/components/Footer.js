import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import backgroundWave from '../assets/images/background-wave.png';
import routes from '../constants/routes.json';

const Footer = () => {
  const location = useLocation();

  return (
    <footer
      className="fixed-bottom d-flex align-items-center justify-content-center py-2 bg-light"
      style={{ fontSize: '2rem' }}
    >
      Copyright © 2023 Danussh
      <a
        href="https://github.com/danussh"
        target="_blank"
        rel="noopener"
        className="d-flex ms-2 text-dark"
        style={{ fontSize: '2rem' }}
        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
      >
        <FaGithub />
      </a>
      {location.pathname !== routes.PRODUCTS && (
        <img
          src={backgroundWave}
          alt="background image"
          className="position-absolute bottom-0 start-0"
          style={{ zIndex: -100, height: 50 }}
        />
      )}
    </footer>
  );
};

export default Footer;
