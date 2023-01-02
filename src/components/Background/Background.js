import React, {useState} from 'react';

import background_image from './background_image.jpg'
import './Background.css'

function Background() {
  const [zoom, setZoom] = useState(2.5);

  const sens = (2.26 / document.documentElement.scrollHeight);
  window.addEventListener('wheel', function(event) {

    let newZoom = zoom - event.deltaY * sens;
    if(newZoom < 1) newZoom = 1;
    if(newZoom > 2.5) newZoom = 2.5;

    setZoom(newZoom);

});


  return(
    <div className="backgroung-image" >
      <img src={background_image} alt="backgroung" style={{transform: 'scale(' + zoom + ')'}} />
    </div>
  );

}

export default Background;
