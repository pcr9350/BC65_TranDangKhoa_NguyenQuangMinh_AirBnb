"use client";
import AdminDashboardLayout from "@/app/templates/AdminDashboardLayout";
import { useEffect, useState } from "react";
import Table from "../../(components)/(Admin)/common/Table";
import TopPage from "../../(components)/(Admin)/TopPage";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { setRoomModal } from "../../redux/reducers/admin/modalSlice";
import {
  deleteRoomService,
  getRoomByLocationService,
  getsRoomService,
} from "../../services/roomService";
import RoomModal from "../../(components)/(Admin)/(modals)/RoomModal";
import PhotoViewFull from "../../(components)/(Admin)/common/PhotoView";
import { getsLocationService } from "../../services/locationService";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

const AdminRooms = () => {
  var columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "tenPhong", headerName: "Name", width: 430 },
    { field: "khach", headerName: "Guests", width: 100 },
    { field: "phongNgu", headerName: "Bedrooms", width: 100 },
    { field: "giuong", headerName: "Beds", width: 100 },
    { field: "phongTam", headerName: "Bathrooms", width: 100 },
    { field: "giaTien", headerName: "Price ($)", width: 100 },
    { field: "moTa", headerName: "Description", width: 300 },
    {
      field: "hinhAnh",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ width: 400, height: "100%" }}>
          <PhotoViewFull img={params?.row?.hinhAnh} />
        </Box>
      ),
    },
    {
      field: "mayGiat",
      headerName: "Washing Machine",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.mayGiat ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "banLa",
      headerName: "Iron",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.banLa ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "tivi",
      headerName: "TV",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.tivi ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "dieuHoa",
      headerName: "Air Conditioning",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.dieuHoa ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "wifi",
      headerName: "WiFi",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.wifi ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "bep",
      headerName: "Kitchen",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.bep ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "doXe",
      headerName: "Parking",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.doXe ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "hoBoi",
      headerName: "Swimming Pool",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.hoBoi ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    {
      field: "banUi",
      headerName: "Ironing Board",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params?.row?.banUi ? (
            <CheckCircleIcon color="success" />
          ) : (
            <DoNotDisturbAltIcon color="error" />
          )}
        </Box>
      ),
    },
    { field: "maViTri", headerName: "Location ID", width: 150 },
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
  const [locations, setLocations] = useState([]);
  const [optionSelected, setOptionSelected] = useState(null);

  const { open } = useSelector((state) => state.modal.room);
  const dispatch = useDispatch();

  useEffect(() => {
    getsRoomService().then((data) => {
      setRows(data);
    });
    getsLocationService().then((data) => setLocations(data));
  }, [open]);

  useEffect(() => {
    if (!searchQuery) return setDataResearch(rows);
    setDataResearch(
      rows.filter((item) =>
        item?.tenPhong?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
    );
  }, [searchQuery, rows]);

  useEffect(() => {
    if (optionSelected === "all") {
      getsRoomService().then((data) => {
        setRows(data);
      });
      // getsLocationService().then((data) => setLocations(data));
    }
    if (!optionSelected) return;
    getRoomByLocationService(optionSelected).then((data) =>
      setDataResearch(data)
    );
  }, [optionSelected]);

  const handleEdit = (id) => {
    dispatch(
      setRoomModal({
        open: true,
        type: "edit",
        data: rows.find((row) => row.id === id),
      })
    );
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete"))
      await deleteRoomService(id).then((data) => {
        if (!data) return;
        setRows(rows.filter((row) => row.id !== id));
        setDataResearch(dataResearch.filter((row) => row.id !== id));
      });
  };

  return (
    <AdminDashboardLayout>
      <div>
        <TopPage
          title={"Rooms Page"}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          options={[
            {
              id: "all",
              tenViTri: "Tất cả",
            },
            ...locations,
          ]}
          setOptions={setOptionSelected}
        />
        <Table rows={dataResearch} columns={columns} height={100} />
        <RoomModal />
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminRooms;
