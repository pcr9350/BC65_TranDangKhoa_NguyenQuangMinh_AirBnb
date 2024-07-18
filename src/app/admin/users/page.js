"use client";
import AdminDashboardLayout from "@/app/templates/AdminDashboardLayout";
import React from "react";

import { useEffect, useState } from "react";
import Table from "../../(components)/(Admin)/common/Table";
import {
  deleteUserService,
  getUsersService,
  searchUserService,
} from "../../services/userService";
import TopPage from "../../(components)/(Admin)/TopPage";
import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import UserModal from "../../(components)/(Admin)/(modals)/UserModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserModal,
  setUserRoomModal,
} from "../../redux/reducers/admin/modalSlice";
import { getRoomByUserIdService } from "../../services/bookingService";
import UserRoomsModal from "../../(components)/(Admin)/(modals)/UserRoomsModal";

const AdminUsers = () => {
  var columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "birthday", headerName: "Birthday", width: 120 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: ({ row }) => (
        <Avatar src={row?.avatar} alt={row?.name}>
          {row?.name?.slice(0, 1)}
        </Avatar>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      valueGetter: (params) => (params ? "Male" : "Female"),
    },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon color="warning" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton onClick={() => handleViewRooms(params.row)}>
            <MeetingRoomIcon color="info" />
          </IconButton>
        </>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataResearch, setDataResearch] = useState([]);

  const { open } = useSelector((state) => state.modal.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsersService().then((data) => {
      setRows(data);
    });
  }, [open]);

  useEffect(() => {
    if (!searchQuery) return setDataResearch(rows);
    searchUserService(searchQuery).then((data) => setDataResearch(data));
  }, [searchQuery, rows]);

  const handleEdit = (id) => {
    dispatch(
      setUserModal({
        open: true,
        type: "edit",
        data: rows.find((row) => row.id === id),
      })
    );
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete"))
      await deleteUserService(id).then((data) => {
        if (!data) return;
        setRows(rows.filter((row) => row.id !== id));
        setDataResearch(dataResearch.filter((row) => row.id !== id));
      });
  };

  const handleViewRooms = (user) => {
    getRoomByUserIdService(user?.id).then((rooms) => {
      dispatch(
        setUserRoomModal({
          open: true,
          data: { user, rooms },
        })
      );
    });
  };
  return (
    <AdminDashboardLayout>
      <div>
        <TopPage
          title={"Users Page"}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Table rows={dataResearch} columns={columns} />
        <UserModal />
        <UserRoomsModal />
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminUsers;
