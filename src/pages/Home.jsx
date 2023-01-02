import React from 'react';

import Background from '../components/Background/Background'
import Header from '../components/Header/Header'
import SideBar from '../components/SideBar/SideBar'
import HomeBody from '../components/HomeBody/HomeBody'
import BuyArea from '../components/BuyArea/BuyArea'
import About from '../components/About/About'

import './Home.css'

function Home() {
  return(
    <div>
      <Background />
      <Header />
      <SideBar />

      <HomeBody />
      <BuyArea />
      <About />
    </div>
  );
}

export default Home;
