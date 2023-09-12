import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.querySelector('h1').style.marginTop = '150px';
    } else {
      document.querySelector('h1').style.marginTop = '50px';
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MindfulJourneyHub</Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
        <ul className="nav-links">
        <li>
  <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>
    Home
  </Link>
</li>
<li>
  <Link to="/articles" className={location.pathname === '/articles' ? 'active-link' : ''}>
    Articles
  </Link>
</li>
<li>
  <Link to="/about" className={location.pathname === '/about' ? 'active-link' : ''}>
    About
  </Link>
</li>
<li>
  <Link to="/contact" className={location.pathname === '/contact' ? 'active-link' : ''}>
    Contact
  </Link>
</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
