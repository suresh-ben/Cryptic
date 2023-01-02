import React, { useState } from 'react';
import { ethers } from 'ethers';

import Background from '../components/Background/Background'
import Header from '../components/Header/Header'
import SideBar from '../components/SideBar/SideBar'
import HomeBody from '../components/HomeBody/HomeBody'
import BuyArea from '../components/BuyArea/BuyArea'
import About from '../components/About/About'

import './Home.css'

import atom_abi from './atom_abi.json';
import cryptic_abi from './cryptic_abi.json';

function Home() {
  
  const [ connectionMessage, SetConnectionMessage ] = useState("connect");
  const [ connectionStyle, SetConnectionStyle ] = useState({});
  const [ connectionError, SetConnectionError ] = useState("");
  const [ isConnected, SetIsConnected ] = useState(false);
  
  const atomAddress = "0x2eBD9a4E16b7dE2Af9cAC774D1E08087091093D2";
  const crypticAddress = "0xC31C405ba7C833382501f40a34e9D38E38cf063c";
  const [ atomContract, SetAtomContract ] = useState();
  const [ crypticContract, SetCrypticContract ] = useState();

  const [ buyMessage, SetBuyMessage ] = useState("");
  const [ buyMessageStyle, SetBuyMessageStyle] = useState({});

  function connetWallet() {
    if(window.ethereum) 
      ConnectEthers()
        .then(() => {
          SetIsConnected(true);
          SetConnectionMessage("Connected");
          SetConnectionStyle({color : "green"});
          SetBuyMessage("");
        })
        .catch((err) => {
          console.log(err);
          SetConnectionError("Please check internet connection...!!!");
        });
    else
      SetConnectionError("Error with MetaMask, Make sure you installed metamask on your browser!!!");
  }

  async function ConnectEthers() {
    let provider = await  new ethers.providers.Web3Provider(window.ethereum);
    //To verify connection
    window.ethereum.request({method : 'eth_requestAccounts'})
      .then( result => {console.log(result)});
    
    let singer = await provider.getSigner();

    let tempAtomContract = await  new ethers.Contract(atomAddress, atom_abi, singer);
    SetAtomContract(tempAtomContract);

    let tempCrypticContrat = await new ethers.Contract(crypticAddress, cryptic_abi, singer);
    SetCrypticContract(tempCrypticContrat);
  }

  //buy tickets
  async function BuyTickets(tickets) {

    if(!isConnected) {
      SetBuyMessage("Please connect your wallet...!!!");
      SetBuyMessageStyle({color : "red"});
      return;
    }

    SetBuyMessage("buying tickets...Hurray!!!");
    SetBuyMessageStyle({ color : "white" });

    try {
      let approveReiept = await atomContract.approve(crypticAddress, tickets * 1000);
      await approveReiept.wait(1);

      let BuyReciept = await crypticContract.BuyTickets(tickets);
      await BuyReciept.wait(1);

      SetBuyMessage("Bought " + tickets + " ticket/s successfully...!!!");
      SetBuyMessageStyle({color : "green"});
    }
    catch (err) {
      SetBuyMessage("Please check your balanec");
      SetBuyMessageStyle({color : "red"});
      
      console.log(err.data.data);
    }
  }

  return(
    <div>
      <Background />
      <Header connectionStyle={connectionStyle} connectionMessage={connectionMessage} connect={connetWallet} />
      {connectionError}
      <SideBar />

      <HomeBody />
      <BuyArea buyMessage={buyMessage} buyMessageStyle={buyMessageStyle} BuyTickets={BuyTickets} />
      <About />
    </div>
  );
}

export default Home;
