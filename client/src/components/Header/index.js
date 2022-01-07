import React from "react";
import { Link } from 'react-router-dom';

import './styles.css';

function Header() {
  return (
    <header>
      <Link to="/">Liberty Lake Portal</Link>    
    </header>
  );
}

export default Header;