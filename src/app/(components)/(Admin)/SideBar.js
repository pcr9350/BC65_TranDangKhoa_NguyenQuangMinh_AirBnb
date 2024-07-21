"use client";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/reducers/admin/appSlice";
import MuiDrawer from "@mui/material/Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import GroupIcon from "@mui/icons-material/Group";
import RoomIcon from "@mui/icons-material/Room";
import BeenhereIcon from "@mui/icons-material/Beenhere";
//   import { useLocation, useNavigate } from "react-router-dom";
import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

const items = [
  {
    text: "Dashboard",
    icon: <DashboardIcon color="info" />,
    href: "/admin/db-admin",
  },
  {
    text: "Users",
    icon: <GroupIcon color="info" />,
    href: "/admin/users",
  },
  {
    text: "Rooms",
    icon: <HolidayVillageIcon color="info" />,
    href: "/admin/rooms",
  },
  {
    text: "Booking",
    icon: <BeenhereIcon color="info" />,
    href: "/admin/book-room",
  },
  {
    text: "Locations",
    icon: <RoomIcon color="info" />,
    href: "/admin/places",
  },
];

const SideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const pathname = useSearchParams();
  const router = useRouter();

  // console.log(window.location?.pathname);

  const { showSidebar } = useSelector((state) => state.app);

  const handleDrawerClose = () => {
    dispatch(toggleSidebar());
  };

  const openedMixin = (theme) => ({
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: 240,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <Drawer variant="permanent" open={showSidebar} className="hidden md:block">
      <DrawerHeader className="flex flex-row items-center w-full">
        <Typography
          textAlign={"center"}
          fontSize={30}
          fontWeight={600}
          color={"#E15457"}
          sx={{ mr: 3 }}
        >
          Airbnb
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem
            key={item?.href}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => router.push(item.href)}
            className={`${
              item.href === window.location?.pathname &&
              "bg-gray-800 text-white"
            }`}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
