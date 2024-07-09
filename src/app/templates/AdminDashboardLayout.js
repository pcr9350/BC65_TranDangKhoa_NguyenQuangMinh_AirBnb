'use client'
import React, { useEffect, useState } from 'react'
import { storeAdmin } from '../redux/storeAdmin'
import Link from 'next/link'
import Header from '../(components)/(Admin)/Header'

import { Box } from "@mui/material";
import SideBar from '../(components)/(Admin)/SideBar'
import DrawerHeader from '../(components)/(Admin)/common/DrawerHeader'
import ToggleActions from '../(components)/(Admin)/common/ToggleActions'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { getData } from '../utils/storage'
import { setUser } from '../redux/reducers/admin/userSlice'
import LoadingGlobal from '../(components)/(Admin)/common/LoadingGlobal'
import { getUserService } from '../services/userService'

const AdminDashboardLayout = (props) => {
  // const links = [
  //   { text: 'Dashboard', href: '/admin/dashboard' },
  //   { text: 'Users', href: '/admin/users' },
  //   { text: 'Vị Trí', href: '/admin/places' },
  //   { text: 'Rooms', href: '/admin/rooms' },
  //   { text: 'Book Room', href: '/admin/book-room' },
  // ];

  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push('/admin'); // Chuyển hướng đến trang login nếu không có token
  //   }
  // }, [router]);


  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const token = getData("token");
  const userId = getData("userId");

  useEffect(() => {
    if (!token || !userId) {
      return router.push("/admin");
    }

    getUserService(userId).then((data) => {
      dispatch(setUser(data));
      setIsLoading(false);
    });
  }, [token, userId, router]);

  // return (
    // <>
    // <div className='d-flex' style={{minHeight:'100vh'}}>
    // <div className="sidebar w-25 bg-dark text-white p-3 d-flex flex-column"> 
    //       <h4 className="text-center mb-4">Dashboard</h4>
    //       <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
    //         <ul className="list-unstyled">
    //           {links.map((link) => (
    //             <li key={link.href} className="mb-3">
    //               <Link href={link.href} className="text-white text-decoration-none btn btn-dark">
    //                 {link.text}
    //               </Link>
                  
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //         <div className='content w-75 h-100 p-4'>
    //             {props.children}
    //         </div>
    //     </div>
    //   </>
  // )

  return isLoading ? (
    <LoadingGlobal />
  ) : (
    <Box sx={{ display: "flex" ,  position:'relative'}}>
      <Header />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <DrawerHeader />
        {props.children}
        <ToggleActions />
      </Box>
    </Box>
  );

};

export default AdminDashboardLayout;
