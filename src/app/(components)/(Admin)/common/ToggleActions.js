'use client'
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
// import SpeedDialAction from "@mui/material/SpeedDialAction";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { toggleToggleActions } from "../../../redux/reducers/admin/appSlice";
import {
  setBookingModal,
  setLocationModal,
  setRoomModal,
  setUserModal,
} from "../../../redux/reducers/admin/modalSlice";
// import { useLocation } from "react-router-dom";
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from "react";

const actions = [
  // { icon: <EditIcon color="warning" />, name: "Edit" },
  // { icon: <DeleteIcon color="error" />, name: "Delete" },
  // { icon: <AddIcon color="success" />, name: "Add" },
];

export default function ToggleActions() {
  const { toggleActions } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const pathname  = usePathname();
  

  const handleOpen = () => dispatch(toggleToggleActions({ open: true }));
  const handleClose = () =>
    dispatch(toggleToggleActions({ open: false, data: null, type: null }));

  const handleOpenModal = useCallback(() => {
    switch (pathname) {
      case "/admin/users":
        dispatch(setUserModal({ open: true, type: "add", data: null }));
        break;
      case "/admin/rooms":
        dispatch(setRoomModal({ open: true, type: "add", data: null }));
        break;
      case "/admin/places":
        dispatch(setLocationModal({ open: true, type: "add", data: null }));
        break;
      case "/admin/book-room":
        dispatch(setBookingModal({ open: true, type: "add", data: null }));
        break;
      default:
        console.error("Invalid path");
        break;
    }
  }, [pathname, dispatch]);

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      sx={{ position: "fixed", bottom: 100, right: 20 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={toggleActions.open}
      hidden={["/admin/db-admin", "/admin", "/admin/book-room"].includes(pathname)}
      onClick={handleOpenModal}
    >
      {/* {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
        />
      ))} */}
    </SpeedDial>
  );
}
