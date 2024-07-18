"use client";
import { Box, Modal, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUserRoomModal } from "../../../redux/reducers/admin/modalSlice";
import { memo } from "react";
import PhotoViewFull from "../common/PhotoView";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 660,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  maxHeight: "80%",
  overflowY: "auto",
};

const UserRoomsModal = () => {
  const { open, data } = useSelector((state) => state.modal.userRoom);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      setUserRoomModal({
        open: false,
        data: null,
      })
    );
  };
  if (!data?.user) return;
  const { user, rooms } = data;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            {user?.name}
          </Typography>
          <Typography component="h2" textAlign={"center"}>
            {user?.phone}
          </Typography>
          <Typography component="h2" textAlign={"center"}>
            {user?.email}
          </Typography>
        </Box>
        {!!rooms?.length ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 2,
              mb: 2,
            }}
          >
            {rooms?.map((room) => (
              <Paper key={room?.id} className="p-2">
                <Typography
                  fontSize={10}
                  fontStyle={"italic"}
                  color={"#333"}
                  fontWeight={600}
                >
                  #{room?.id}
                </Typography>
                <Typography>
                  <b>Số lượng khách:</b> <i>{room?.soLuongKhach}</i>
                </Typography>
                <Typography>
                  <b>Ngày đến:</b> <i>{room?.ngayDen}</i>
                </Typography>
                <Typography>
                  <b>Ngày đi:</b> <i>{room?.ngayDi}</i>
                </Typography>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography textAlign={"center"} mt={3} fontSize={20}>
            Khách hàng chưa đặt phòng
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default memo(UserRoomsModal);
