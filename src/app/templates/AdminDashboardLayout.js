'use client'
import React, { useEffect, useState } from 'react'
// import { storeAdmin } from '../redux/storeAdmin'
// import Link from 'next/link'
import Header from '../(components)/(Admin)/Header'

import { Box } from "@mui/material";
import SideBar from '../(components)/(Admin)/SideBar'
import DrawerHeader from '../(components)/(Admin)/common/DrawerHeader'
import ToggleActions from '../(components)/(Admin)/common/ToggleActions'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { storageData } from '../utils/storage'
import { setUser } from '../redux/reducers/admin/userSlice'
import LoadingGlobal from '../(components)/(Admin)/common/LoadingGlobal'
import { getUserService } from '../services/userService'

const AdminDashboardLayout = (props) => {


  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const token = storageData.getData("token");
  const userId = storageData.getData("userId");

  useEffect(() => {
    if (!token || !userId) {
      return router.push("/admin");
    }

    getUserService(userId).then((data) => {
      dispatch(setUser(data));
      setIsLoading(false);
    });
  }, [token, userId, router]);

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
