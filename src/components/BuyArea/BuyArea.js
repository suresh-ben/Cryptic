import React, {useState} from 'react';
import {ethers} from 'ethers';

import './BuyArea.css'
import ETH_Arr from './EthImgManager.js'
import lottery_abi from './Lottery_abi.json'

function BuyArea() {

  const contactAddress = "0x0c975C6bC224339eD312122e1fb528Fc1E4fE411";
  const [contract, SetContract] = useState("");

  const [errorMessage, SetErrorMessage] = useState("");
  const [errorStyle, SetErrorStyle] = useState({});
  const [buttonText, SetButtonText] = useState("connect Wallet");
  const [status, SetStatus] = useState("");

  function connetWallet() {

    if(window.ethereum)
    {
      SetErrorMessage("connected successfully!!!");
      SetErrorStyle({color : "green"});
      SetButtonText("Connected !!!");
      ConnectEthers();
    }
    else
    {
      SetErrorMessage("Error with MetaMask, Make sure you installed metamask on your browser!!!");
      SetErrorStyle({color : "red"});
    }
  }

  function ConnectEthers() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    //To verify connection
    window.ethereum.request({method : 'eth_requestAccounts'})
      .then( result => {console.log(result)});
    let singer = provider.getSigner();

    let tempContract = new ethers.Contract(contactAddress, lottery_abi, singer);
    SetContract(tempContract);
  }


  const [canBuy, SetCanBuy] = useState(true);

  async function BuyTickets(event) {
    event.preventDefault();
    if(contract === "") {
      SetErrorMessage("Please connect the wallet befor buying tickets!!!");
      SetErrorStyle({color : "red"});
      return;
    }

    if(!canBuy) {
      SetStatus("waiting for conformation.....!!!");
      return;
    }

    SetCanBuy(false);
    SetStatus("Buying tickets....Hurray!!!");
    const value = Number(event.target.tickets.value) * 0.1;

    const transactionResponse =  await contract.BuyTickets({value : ethers.utils.parseEther( "" +value + "")});
    const transactionReceipt = await transactionResponse.wait(1);               //one block conformation
    console.log(transactionReceipt);

    console.log("Bought tickets");
    SetStatus("Bouught " + Number(event.target.tickets.value) + "ticket/s");
    SetCanBuy(true);
  }



  return (
    <div id="buy" className="BuyArea row">
      <img alt="" className="col-lg-6 col-md-6" src={ETH_Arr[Math.floor(Math.random() * 18)]}/>

      <div className="buy-content col-lg-6 col-md-6">
        <p> Test your luck - Buy tickets to win chance of getting <br/><span>100 Eth (sepolia)</span> </p><br/>
        <p> Each ticket cost 0.1 ETH (sepolia Testnet)</p>
        <button onClick={connetWallet} className="connection"> {buttonText} </button>
        <p style={errorStyle}> {errorMessage} </p> <br/>

        <form className="buy-tickets" onSubmit={BuyTickets}>
          <input type="number" id="tickets" placeholder="Enter Number Tickets to buy"/> <br/>
          <button type={"submit"}>
            Buy Tickets
          </button>
          <p>{status}</p>
        </form>

      </div>
    </div>
  );
}

export default BuyArea;
