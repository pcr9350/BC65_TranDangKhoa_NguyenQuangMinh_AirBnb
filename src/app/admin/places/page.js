'use client'
import AdminDashboardLayout from '@/app/templates/AdminDashboardLayout'
import React from 'react'
import { useEffect, useState } from "react";
import Table from "../../(components)/(Admin)/common/Table";
import TopPage from "../../(components)/(Admin)/TopPage";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { setLocationModal } from "../../redux/reducers/admin/modalSlice";
import {
  deleteLocationService,
  getsLocationService,
} from "../../services/locationService";
import LocationModal from "../../(components)/(Admin)/(modals)/LocationModal";
import PhotoViewFull from "../../(components)/(Admin)/common/PhotoView";

const AdminPlaces = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "tenViTri", headerName: "Location Name", width: 250 },
    { field: "tinhThanh", headerName: "City", width: 250 },
    { field: "quocGia", headerName: "Country", width: 250 },
    {
      field: "hinhAnh",
      headerName: "Image",
      width: 250,
      renderCell: ({ row }) => (
        <Box sx={{ width: 400, height: "100%" }}>
          <PhotoViewFull img={row?.hinhAnh} />
        </Box>
      ),
    },
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
        </>
      ),
    },
  ];

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataResearch, setDataResearch] = useState([]);

  const { open } = useSelector((state) => state.modal.location);

  const dispatch = useDispatch();

  useEffect(() => {
    getsLocationService().then((data) => {
      setRows(data);
    });
  }, [open]);

  useEffect(() => {
    if (!searchQuery) return setDataResearch(rows);
    setDataResearch(
      rows.filter(
        (item) =>
          item?.tenViTri
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchQuery?.toString()?.toLowerCase()) ||
          item?.tinhThanh
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchQuery?.toString()?.toLowerCase()) ||
          item?.quocGia
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchQuery?.toString()?.toLowerCase())
      )
    );
  }, [searchQuery, rows]);

  const handleEdit = (id) => {
    dispatch(
      setLocationModal({
        open: true,
        type: "edit",
        data: rows.find((row) => row.id === id),
      })
    );
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete"))
      await deleteLocationService(id).then((data) => {
        if (!data) return;
        setRows(rows.filter((row) => row.id !== id));
        setDataResearch(dataResearch.filter((row) => row.id !== id));
      });
  };
  return (
    <AdminDashboardLayout>
      <div>
      <TopPage
        title={"Location Page"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Table rows={dataResearch} columns={columns} height={80} />
      <LocationModal />
    </div>
    </AdminDashboardLayout>
    
  )
}

export default AdminPlaces