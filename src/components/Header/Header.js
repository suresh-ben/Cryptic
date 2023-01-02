import React from 'react';

import './Header.css';
import Logo from './MyLogo.png'

function Header(){
  return(
    <div className="header-main">
      <a className="head-link" href="/">
        <img src={Logo} alt="Logo"/>
        <h2> Cryptic </h2>
      </a>
    </div>
  );
}

export default Header;
