import React from 'react';

import SideLink from './SideLinks/SideLink'

import './SideBar.css'
import Owner from './SideLinks/Owner.png'
import About from './SideLinks/About.png'
import Buy from './SideLinks/Buy.png'

function SideBar() {

  const sideLinks = [
    {
      id : "Owner",
      link : "https://www.linkedin.com/in/suresh-bennabatthula-836854252/",
      target : "_blank",
      img : Owner
    },
    {
      id : "Buy",
      link : "/#buy",
      target : "",
      img : Buy
    },
    {
      id : "About",
      link : "/#about",
      target : "",
      img : About
    }
  ];

  return (
    <div className="side-main">
        {sideLinks.map((option) => {
          return <SideLink target={option.target} key={option.id} id={option.id} link={option.link} img={option.img} />;
        })}
    </div>
  );
}

export default SideBar;
