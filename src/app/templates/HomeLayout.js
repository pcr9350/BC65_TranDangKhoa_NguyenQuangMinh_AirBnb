'use client'
import React from 'react';
import HeaderClient from '../(components)/Header'

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Footer from '../(components)/Footer';
import HomeCarousel from '../(components)/HomeCarousel';
import BackToTopButton from '../(components)/BackToTopButton';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import AdminCustomTheme from '../admin/_app';

import { NextUIProvider } from '@nextui-org/react';
import NextNProgress from 'nextjs-progressbar';
const HomeLayout = (props) => {

  return (
    <>
      <NextUIProvider>
      <NextNProgress
  color="#f00" // Màu đỏ
  startPosition={0.3} // Bắt đầu từ 30%
  stopDelayMs={200} // Delay 200ms trước khi ẩn
  height={3} // Chiều cao 3px
/>
        <Provider store={store}>
          <AppRouterCacheProvider>

            <AdminCustomTheme>
              <div style={{ position: 'relative' }}>
                <HeaderClient />
                <HomeCarousel />
              </div>
              <div className="w-100" style={{ minHeight: 800 }}>
                {props.children}
              </div>
              <BackToTopButton />
              <Footer />
            </AdminCustomTheme>


          </AppRouterCacheProvider>
        </Provider>
      </NextUIProvider>

    </>

  )

}

export default HomeLayout


