import React, {useState} from "react";
import { Link } from 'react-router-dom';

import './styles.css';

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const handleToggle = () => {
    setNavOpen(prev => !prev);
  }

  const handleLink = (location) => {
    setIsActive(location)
    handleToggle()
  }

  return (
    <div>
    <header>
      <Link to="/" onClick={() => handleLink('home')}>Liberty Lake Portal</Link>
      <i className="fas fa-bars" onClick={handleToggle}></i>
    </header>
    <ul className={ `${navOpen ? "" : "hidden"}` }>
      
        <li className={ `${isActive === 'home' ? "active" : ""}` } onClick={() => handleLink('home')}>
          <Link to="/">
            <div className="nav-li">
               Home <i className="fas fa-home"></i>
            </div>
          </Link>
        </li>
      
        <li className={ `${isActive === 'wifi' ? "active" : ""}` }  onClick={() => handleLink('wifi')}>
          <Link to="/wifi">
            <div className="nav-li">
              Wifi <i className="fas fa-wifi"></i>
            </div>
          </Link>
        </li>
      
        <li className={ `${isActive === 'settings' ? "active" : ""}` }  onClick={() => handleLink('settings')}>
          <Link to="/settings">
            <div className="nav-li">
              Settings <i className="fas fa-users-cog"></i>
            </div>
          </Link>
        </li>
      
        <li className={ `${isActive === 'tickets' ? "active" : ""}` }  onClick={() => handleLink('tickets')}>
          <Link to="/tickets">
            <div className="nav-li">
              Tickets <i className="fas fa-ticket-alt"></i>
            </div>
          </Link>
        </li>
    </ul>
    </div>
  );
}

export default Header;