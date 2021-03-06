import React from 'react';
import '../styles/Home.css'
import homeImage from '../images/home.jpg';

function Home() {
  return <>
    <div className='homeDiv'>
      <div className='introDiv'>
          <h3>Welcome to the Coaches Corner</h3>
          <p>Customized strength and conditioning programming aimed at taking athletes to the next level in physical performance. All programming can be scaled to suit each individuals capablity.</p>
          <p>CAUTION: Pervious experience with strength and conditioning programmes or other types training regimes is required. What this programming contains is not designed for the beginner or entry level athlete.</p>
      </div>
      <img className='homeImage' src={homeImage} alt='homepageImage'/>
      <div className='equip'>
          <h3>What Equipment Will I Need?</h3>
          <p>For maximum progression with this program, you will need access to a full range of gym equipment.</p>
          <p>Minimum equipment requiremnts below:</p>
          <p>
            Olympic Barbel - 90kg total weight plates - Squat Rack - Bench - Rubber Hex Dumbells (M x2 15kg - F x2 12.5kg) - Kettlebell (M 20kg - F 15kg) - Rubber Gym Flooring - Plyo Box - Speed Rope - Pull Up Rig - Rower 
          </p>
      </div>
    </div>
  </>
};

export default Home
