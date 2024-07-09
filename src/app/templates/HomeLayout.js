'use client'
import React from 'react';
import Header from '../(components)/Header'

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Footer from '../(components)/Footer';
import HomeCarousel from '../(components)/HomeCarousel';

const HomeLayout = (props) => {

  return (
    <>
      <div style={{ position: 'relative'}}>
        <Header />
        <HomeCarousel />
      </div>
      <div className="w-100" style={{ minHeight: 800 }}>
        {props.children}
      </div>

      <Footer />
    </>
    
  )

}

export default HomeLayout


