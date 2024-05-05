import React from 'react';
import { Container, Image } from 'react-bootstrap';
import '../../Testing.css';
function AboutScreen() {
  const defaultImage = process.env.PUBLIC_URL + '/images/playstation.jpg';

  return (
<div className='main-container'>
      <div className='flex-row-ebc'>
        <div className='site-logo'>
          <div className='line' />
          <div className='line-1' />
          <div className='line-2' />
          <div className='site-logo-3'>
            <span className='site'>Site</span>
            <span className='logo'>Logo</span>
          </div>
        </div>
        <div className='menu-header'>
          <span className='about'>About</span>
          <span className='features'>Features</span>
          <span className='pricing'>Pricing</span>
          <span className='gallery'>Gallery</span>
          <span className='team'>Team</span>
        </div>
      </div>
      <div className='mercedes-glk-matic-coupe'>
        <span className='mercedes'>Honda </span>
        <span className='glk-300-4matic'>Civic Type R</span>
        <span className='mercedes-4'> Hatchback</span>
      </div>
      <button className='button'>
        <span className='more'>More</span>
      </button>
      <div className='flex-row-ff'>
        <div className='image' />
        <span className='engine'>Engine</span>
        <span className='max-speed'>Max Speed</span>
        <span className='hp'>315 hp</span>
        <span className='km-h'>275 km/h </span>
        <span className='kmpl'>2.0 L 4-cylinder</span>
        <span className='sec'>
          5.3 sec <br />
        </span>
      </div>
      <div className='flex-row-bfb'>
        <div className='social'>
          <div className='vector' />
        </div>
        <div className='social-5' />
        <div className='instagram' />
        <div className='vector-6' />
        <div className='ellipse' />
        <div className='ellipse-7' />
        <div className='ellipse-8' />
      </div>
    </div>
  );
}

export default AboutScreen;
