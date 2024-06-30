'use client'
import React from 'react'
import Header from '../(components)/Header';
// import redux
import { Provider } from "react-redux";
import { store } from '../redux/store';

const HomeTemplate = ({children}) => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <div className='w-100' style={{minHeight:800}}>
            {children}
        </div>
        <footer className='bg-primary text-center'>Footer</footer>
        </Provider>
    </>
  )
}

export default HomeTemplate