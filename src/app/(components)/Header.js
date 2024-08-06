'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Link from 'next/link';
import { Icon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { storageData } from '../utils/storage';
import { removeUser, setUser } from '../redux/reducers/home/userSlice';
import { getUserService } from '../services/userService';





const pages = ['Home', 'Phòng'];


function HeaderClient() {
    // set fixed-top nav-bar
  const [isFixed, setIsFixed] = useState(false);
  const [settings, setSettings] = useState(['Đăng nhập', 'Đăng kí']);
  const {user} = useSelector((state) => state.user)



  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    setSettings(user ? ['Tài khoản', 'Đăng xuất'] : ['Đăng nhập', 'Đăng kí']);
  }, [user]); // Chỉ chạy lại khi user thay đổi
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);

  };
  const router = useRouter();
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Đăng nhập') {
       router.push('/login');
    } else if (setting === 'Đăng kí') {
      router.push('/register');
    }
     else if (setting === 'Đăng xuất') {
      // Xử lý đăng xuất ở đây
      storageData.removeData('token');
      storageData.removeData('userId');
      dispatch(removeUser);
      window.location.reload();   
    }
    else if (setting === 'Tài khoản') {
      router.push('/info-user');
    }
  };

  const token = storageData?.getData("token");
  const userId = storageData?.getData("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && userId) {
      getUserService(userId).then((data) => dispatch(setUser(data)));

      
    }
  }, [token, userId]);

  return (
    <>
    <AppBar position="fixed">
      <Container maxWidth="xl" className={`navbar-customize ${
       isFixed ? 'fixed-top' : ''
     }`}>
        <Toolbar disableGutters>
          <Icon className="fab fa-airbnb fs-2 navbar-logo" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className='brand-header'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.1rem',
              // color: 'inherit',
              textDecoration: 'none',
            }}
          >AirBnb
          </Typography>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link
                  href={page === "Phòng" ? "/allrooms" : "/"} 
                  className="nav-link-page nav-link-page-responsive"
                >
                  {page}
                </Link>
              </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Icon className="fab fa-airbnb fs-2 navbar-logo" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className='brand-header'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              // color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AirBnb
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link  href={page === "Phòng" ? "/allrooms" : "/"}  key={page} className='nav-link-page'>
              <Button
                
                onClick={handleCloseNavMenu}
                className='nav-link-header'
                sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                
              >
                {page}
              </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Settings">

                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user ? (
                    <Avatar alt={user.name} src={user.avatar} />
                  ) : (
                    <i className="fa fa-user-circle user-button"></i>
                  )}
                </IconButton>


              </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
    
    </>
  );
}
export default HeaderClient;
