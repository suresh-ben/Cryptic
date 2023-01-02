import React from 'react';

import './Header.css';
import Logo from './MyLogo.png'

function Header(props){
  return(
    <div className="header-main">
      <a className="head-link" href="/">
        <img src={Logo} alt="Logo"/>
        <h2> Cryptic </h2>
      </a>

      <button style={props.connectionStyle} onClick={props.connect} className="connect-button">
        {props.connectionMessage}
      </button>
    </div>
  );
}

export default Header;
