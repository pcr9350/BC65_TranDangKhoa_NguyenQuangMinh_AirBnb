'use client'
import React from 'react'
// import redux
import { Provider } from "react-redux";
import { store } from '../redux/store';
import Footer from '../(components)/Footer';
import BackToTopButton from '../(components)/BackToTopButton';
import HeaderClient from '../(components)/Header';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import AdminCustomTheme from '../admin/_app';
import { Box } from '@mui/material'; // Thêm Box từ MUI
import { NextUIProvider } from '@nextui-org/react';
import NextNProgress from 'nextjs-progressbar';
const HomeTemplate = ({ children }) => {
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
              <HeaderClient />
              <Box // Sử dụng Box để tạo padding
                sx={{
                  paddingTop: { // Sử dụng padding để tạo khoảng cách
                    xs: '48px', // Khoảng cách nhỏ trên mobile
                    sm: '48px', // Khoảng cách lớn hơn trên tablet
                    md: '64px', // Khoảng cách lớn nhất trên desktop
                  },
                }}
              >
                <div className="w-100" style={{ minHeight: 800 }}>
                  {children}
                </div>
              </Box>
              <Footer />
              <BackToTopButton />
            </AdminCustomTheme>


          </AppRouterCacheProvider>
        </Provider>
      </NextUIProvider>

    </>
  )
}

export default HomeTemplate