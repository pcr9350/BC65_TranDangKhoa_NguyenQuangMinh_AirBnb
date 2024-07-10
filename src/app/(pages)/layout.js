'use client'
import React from 'react'
import Header from '../(components)/Header';
// import redux
import { Provider } from "react-redux";
import { store } from '../redux/store';
import Footer from '../(components)/Footer';
import BackToTopButton from '../(components)/BackToTopButton';

const HomeTemplate = ({children}) => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <div className='w-100' style={{minHeight:800}}>
            {children}
        </div>
        <Footer />
        <BackToTopButton />
        </Provider>
    </>
  )
}

export default HomeTemplate