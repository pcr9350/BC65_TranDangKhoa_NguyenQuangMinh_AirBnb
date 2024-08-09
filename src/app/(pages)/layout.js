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

const HomeTemplate = ({ children }) => {
  return (
    <>
      
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
      

    </>
  )
}

export default HomeTemplate