import React from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import './SideLink.css'

function SideLink(props) {

  return (
    <Tippy content={props.id} placement="left">
      <a target={props.target} id={props.id} className="side-link" href={props.link}>
        <img src={props.img} alt=""/>
      </a>
    </Tippy>
  );
}

export default SideLink;
