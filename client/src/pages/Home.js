import React from 'react';
import '../styles/Home.css'
import homeImage from '../images/home.jpg'

function Home() {
  return <div className='homeDiv'>
    <img className='homeImage' src={homeImage} alt='homepageImage'/>
  </div>;
};

export default Home
