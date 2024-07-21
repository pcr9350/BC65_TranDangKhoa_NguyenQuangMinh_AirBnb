"use client";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { toggleSidebar } from "../../redux/reducers/admin/appSlice";
import MuiAppBar from "@mui/material/AppBar";
import { storageData } from "../../utils/storage";
//   import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();
  const { showSidebar } = useSelector((state) => state.app);

  const [width, setWidth] = useState(window.innerWidth);
  const [isShowMenu, setIsShowMenu] = useState(false);

  window.addEventListener("resize", function (event) {
    setWidth(event?.currentTarget.innerWidth);
  });

  const handleClick = () => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    dispatch(toggleSidebar());
  };

  const items = [
    {
      text: "Dashboard",
      href: "/admin/db-admin",
    },
    {
      text: "Users",
      href: "/admin/users",
    },
    {
      text: "Rooms",
      href: "/admin/rooms",
    },
    {
      text: "Booking",
      href: "/admin/book-room",
    },
    {
      text: "Locations",
      href: "/admin/places",
    },
  ];

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(width >= 768 &&
      open && {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
  }));

  const handleLogout = () => {
    storageData.removeData("token");
    storageData.removeData("userId");
    window.location.href = "/admin";
  };

  return (
    <AppBar position="fixed" open={showSidebar} className="">
      <Toolbar className="flex flex-row items-center justify-between bg-gray-800">
        <button
          className="md:hidden"
          onClick={() => setIsShowMenu(!isShowMenu)}
        >
          <MenuIcon />
          <Menu
            anchorEl={anchorEl}
            open={isShowMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {items?.map((item) => (
              <MenuItem
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setIsShowMenu(false);
                }}
              >
                {item?.text}
              </MenuItem>
            ))}
          </Menu>
        </button>
        <div className="flex flex-row items-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(showSidebar && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <h1 className="text-white text-xl md:text-2xl">
            Welcome, {user?.name}
          </h1>
        </div>
        <div className="items-end">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="flex flex-row items-center gap-2"
          >
            <Avatar src={user?.avatar} />
            <Typography className="text-white">{user?.name}</Typography>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 60,
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
