'use client'
import AdminDashboardLayout from '@/app/templates/AdminDashboardLayout'
import { useEffect, useState } from "react";
import Table from "../../(components)/(Admin)/common/Table";
import TopPage from "../../(components)/(Admin)/TopPage";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import {
  deleteBookingService,
  getsBookingService,
} from "../../services/bookingService";
import BookingModal from "../../(components)/(Admin)/(modals)/BookingModal";

const AdminBookRoom = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "maPhong", headerName: "Room ID", width: 130 },
    { field: "ngayDen", headerName: "Check-in Date", width: 250 },
    { field: "ngayDi", headerName: "Check-out Date", width: 250 },
    { field: "soLuongKhach", headerName: "Number of Guests", width: 150 },
    { field: "maNguoiDung", headerName: "User ID", width: 120 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          {/* <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon color="warning" />
          </IconButton> */}
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

  const { open } = useSelector((state) => state.modal.user);

  useEffect(() => {
    getsBookingService().then((data) => {
      setRows(data);
    });
  }, [open]);

  useEffect(() => {
    if (!searchQuery) return setDataResearch(rows);
    setDataResearch(
      rows.filter(
        (item) =>
          item?.maPhong
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchQuery?.toString()?.toLowerCase()) ||
          item?.maNguoiDung
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchQuery?.toString()?.toLowerCase())
      )
    );
  }, [searchQuery, rows]);

  // const handleEdit = (id) => {
  //   dispatch(
  //     setUserModal({
  //       open: true,
  //       type: "edit",
  //       data: rows.find((row) => row.id === id),
  //     })
  //   );
  // };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete"))
      await deleteBookingService(id).then((data) => {
        if (!data) return;
        setRows(rows.filter((row) => row.id !== id));
        setDataResearch(dataResearch.filter((row) => row.id !== id));
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
      <BookingModal />
    </div>
    </AdminDashboardLayout>
    
  )
}

export default AdminBookRoom