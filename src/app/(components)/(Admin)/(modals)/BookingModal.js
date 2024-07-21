"use client";
import {
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookingModal } from "../../../redux/reducers/admin/modalSlice";
import { LoadingButton } from "@mui/lab";
import { updateBookingService } from "../../../services/bookingService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  maxHeight: "80%",
  overflowY: "auto",
};

const BookingModal = () => {
  const { type, open, data } = useSelector((state) => state.modal.booking);
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);

  useEffect(() => {
    if (type === "edit" && data) setBookingData(data);
  }, [type, data]);

  const handleClose = () => {
    setBookingData(null);
    dispatch(
      setBookingModal({
        type: null,
        open: false,
        data: null,
      })
    );
  };

  const handleChangeData = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      // toast(res.content);
      if (type === "edit") {
        await updateBookingService(bookingData).then(
          (data) => data && handleClose()
        );
      } else {
        // await createBook(bookingData).then(
        //   (data) => data && handleClose()
        // );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSelected(file);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBookingData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
        >
          {type === "edit" ? `Edit Booking` : "Create Booking"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {bookingData?.hinhAnh && (
              <Avatar
                src={bookingData?.hinhAnh}
                sx={{ width: 100, height: 100, objectFit: "cover" }}
              />
            )}
            <input type="file" onChange={handleImageChange} />
          </Box>

          {type === "edit" && (
            <TextField
              label="Mã vị trí"
              name="id"
              defaultValue={data?.id}
              disabled
            />
          )}
          <TextField
            label="Tên tên vị trí"
            name="tenViTri"
            required
            value={bookingData?.tenViTri}
            onChange={handleChangeData}
          />
          <TextField
            label="Tỉnh thành"
            name="tinhThanh"
            value={bookingData?.tinhThanh}
            onChange={handleChangeData}
            required
          />
          <TextField
            label="Quốc gia"
            name="quocGia"
            value={bookingData?.quocGia}
            onChange={handleChangeData}
            required
          />
        </Box>
        <Box sx={{ display: "flex", mt: 3, justifyContent: "center", gap: 3 }}>
          <Button color="warning" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            color="success"
            variant="contained"
            onClick={handleSubmit}
            loading={isLoading}
          >
            {type === "edit" ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(BookingModal);
