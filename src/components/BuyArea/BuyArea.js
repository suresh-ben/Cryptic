import React, {useState} from 'react';

import './BuyArea.css'
import ETH_Arr from './EthImgManager.js'

function BuyArea(props) {

  function BuyTickets(event) {
    event.preventDefault();

    let tickets = event.target.tickets.value;
    props.BuyTickets(tickets);
  }

  return (
    <div id="buy" className="BuyArea row">
      <img alt="" className="col-lg-6 col-md-6" src={ETH_Arr[Math.floor(Math.random() * 18)]}/>

      <div className="buy-content col-lg-6 col-md-6">
        <p> Test your luck - Buy tickets to a win chance of getting <br/><span>100 Atoms (sepolia)</span> </p><br/>
        <p> Each ticket cost 1 Atom ( = 0.1 Eth sepolia Testnet)</p>

        <form className="buy-tickets" onSubmit={BuyTickets}>
          <input type="number" id="tickets" placeholder="Enter Number Tickets to buy"/> <br/>

          <button className="buy-button" type={"submit"}>
            Buy Tickets
          </button>
          <p style={props.buyMessageStyle} >{props.buyMessage}</p>
          
        </form>

      </div>
    </div>
  );
}

export default BuyArea;
