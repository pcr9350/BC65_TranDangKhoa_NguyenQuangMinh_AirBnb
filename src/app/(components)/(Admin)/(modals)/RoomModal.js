'use client'
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Switch,
    TextField,
    Typography,
  } from "@mui/material";
  import { memo, useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setRoomModal } from "../../../redux/reducers/admin/modalSlice";
  import { LoadingButton } from "@mui/lab";
  import {
    createRoomService,
    updateRoomService,
  } from "../../../services/roomService";
  import { getsLocationService } from "../../../services/locationService";
  import toast from "react-hot-toast";
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
    maxHeight: "80%",
    overflowY: "auto",
  };
  
  const RoomModal = () => {
    const { type, open, data } = useSelector((state) => state.modal.room);
    const dispatch = useDispatch();
    const [roomData, setRoomData] = useState(data);
    const [isLoading, setIsLoading] = useState(false);
    const [imageSelected, setImageSelected] = useState(null);
    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState(null);
  
    useEffect(() => {
      if (type === "edit" && data) setRoomData(data);
      getsLocationService().then((data) => setLocations(data));
    }, [type, data]);
  
    const handleClose = () => {
      setRoomData(null);
      setErrors(null);
      setIsLoading(false);
      dispatch(
        setRoomModal({
          type: null,
          open: false,
          data: null,
        })
      );
    };
  
    const handleChangeData = (e) => {
      setRoomData({
        ...roomData,
        [e.target.name]: ["tenPhong", "moTa"].includes(e.target.name)
          ? e.target.value
          : +e.target.value,
      });
    };
  
    const handleChangeSwitch = (e) => {
      setRoomData({ ...roomData, [e.target.name]: e.target.checked });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let err = false;
  
      if (!roomData?.hinhAnh) return toast.error("Vui lòng thêm hình ảnh");
  
      if (roomData?.tenPhong?.length < 5) {
        err = true;
        setErrors((prev) => ({
          ...prev,
          tenPhong: "Tên phòng phải có ít nhất 5 kí tự",
        }));
      }
  
      if (roomData?.moTa?.length < 10) {
        err = true;
        setErrors((prev) => ({
          ...prev,
          moTa: "Mô tả phải có ít nhất 10 kí tự",
        }));
      }
  
      if (roomData?.khach <= 0) {
        err = true;
        setErrors((prev) => ({
          ...prev,
          khach: "Số khách phải lớn hơn 0",
        }));
      }
      if (roomData?.phongNgu <= 0) {
        err = true;
        setErrors((prev) => ({
          ...prev,
          phongNgu: "Số phòng ngủ phải lớn hơn 0",
        }));
      }
      if (+roomData?.phongTam <= 0) {
        err = true;
        setErrors((prev) => ({
          ...prev,
          phongTam: "Số phòng tắm phải lớn hơn 0",
        }));
      }
      if (roomData?.giuong <= 0) {
        err = true;
        setErrors((prev) => ({
          ...prev,
          giuong: "Số giường phải lớn hơn 0",
        }));
      }
      if (roomData?.giaTien <= 0) {
        err = true;
        setErrors((prev) => ({
          ...prev,
          giaTien: "Giá tiền không hợp lệ",
        }));
      }
      console.log(errors);
      if (err) return;
  
      setIsLoading(true);
  
      try {
        if (type === "edit") {
          await updateRoomService(roomData).then((data) => data && handleClose());
        } else {
          await createRoomService(roomData).then((data) => data && handleClose());
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
        setRoomData((prev) => ({
          ...prev,
          hinhAnh: reader.result,
        }));
      };
    };
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="w-full md:w-2/3 mx-auto p-5 px-10"
      >
        <Box sx={style}  className="w-full md:w-2/3" component={"form"} onSubmit={handleSubmit}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            {type === "edit" ? `Edit Room` : "Create Room"}
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
              {roomData?.hinhAnh && (
                <img
                  src={roomData?.hinhAnh}
                  style={{maxWidth: 400, width: "auto", height: 200, objectFit: "cover" }}
                />
              )}
              <input type="file" onChange={handleImageChange} />
            </Box>
  
            {type === "edit" && (
              <TextField
                label="Mã phòng"
                name="id"
                defaultValue={data?.id}
                disabled
              />
            )}
            <TextField
              label="Tên phòng"
              name="tenPhong"
              required
              value={roomData?.tenPhong}
              onChange={handleChangeData}
              error={!!errors?.tenPhong}
              helperText={errors?.tenPhong}
              className="w-full md:w-[300px]"
            />
            <TextField
              label="Mô tả"
              name="moTa"
              required
              value={roomData?.moTa}
              onChange={handleChangeData}
              error={!!errors?.moTa}
              helperText={errors?.moTa}
              className="w-full md:w-[300px]"
            />
            <TextField
              label="Số khách"
              name="khach"
              required
              type="number"
              value={roomData?.khach}
              onChange={handleChangeData}
              error={!!errors?.khach}
              helperText={errors?.khach}
              className="w-full md:w-[300px]"
            />
            <TextField
              label="Số phòng ngủ"
              name="phongNgu"
              required
              type="number"
              value={roomData?.phongNgu}
              onChange={handleChangeData}
              error={!!errors?.phongNgu}
              helperText={errors?.phongNgu}
              className="w-full md:w-[300px]"
            />
            <TextField
              label="Số giường"
              name="giuong"
              required
              type="number"
              value={roomData?.giuong}
              onChange={handleChangeData}
              error={!!errors?.giuong}
              helperText={errors?.giuong}
              className="w-full md:w-[300px]"
            />
            <TextField
              label="Số phòng tắm"
              name="phongTam"
              required
              type="number"
              value={roomData?.phongTam}
              onChange={handleChangeData}
              error={!!errors?.phongTam}
              helperText={errors?.phongTam}
              className="w-full md:w-[300px]"
            />
            <TextField
              label="Giá phòng"
              name="giaTien"
              required
              type="number"
              value={roomData?.giaTien}
              onChange={handleChangeData}
              error={!!errors?.giaTien}
              helperText={errors?.giaTien}
              className="w-full md:w-[300px]"
            />
  
            <FormControl sx={{ minWidth: 220 }}  className="w-full md:w-[300px]">
              <InputLabel>Vị trí</InputLabel>
              <Select
                label="Vị trí"
                name="maViTri"
                required
                defaultValue={roomData?.maViTri}
                value={roomData?.maViTri}
                key={roomData?.maViTri}
                onChange={handleChangeData}
                renderValue={(e) => {
                  const item = locations[e - 1];
                  return (
                    <Box
                      key={item?.id}
                      value={item?.id}
                      className="flex flex-row gap-2 items-center"
                    >
                      <Avatar src={item?.hinhAnh} variant="square" />
                      <Typography>{item?.tenViTri}</Typography>
                    </Box>
                  );
                }}
              >
                {locations?.map((item) => {
                  return (
                    <MenuItem
                      key={item?.id}
                      value={item?.id}
                      className="flex flex-row gap-2"
                    >
                      <Avatar src={item?.hinhAnh} variant="square" />
                      <Typography>{item?.tenViTri}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
  
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.mayGiat}
                  name="mayGiat"
                  onChange={handleChangeSwitch}
                />
              }
              label="Máy giặt"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.banLa}
                  name="banLa"
                  onChange={handleChangeSwitch}
                />
              }
              label="Bàn Là"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.banUi}
                  name="banUi"
                  onChange={handleChangeSwitch}
                />
              }
              label="Bàn Ui"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.tivi}
                  name="tivi"
                  onChange={handleChangeSwitch}
                />
              }
              label="Tivi"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.dieuHoa}
                  name="dieuHoa"
                  onChange={handleChangeSwitch}
                />
              }
              label="Điều hòa"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.wifi}
                  name="wifi"
                  onChange={handleChangeSwitch}
                />
              }
              label="Wifi"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.bep}
                  name="bep"
                  onChange={handleChangeSwitch}
                />
              }
              label="Bếp"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.doXe}
                  name="doXe"
                  onChange={handleChangeSwitch}
                />
              }
              label="Đỗ xe"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={roomData?.hoBoi}
                  name="hoBoi"
                  onChange={handleChangeSwitch}
                />
              }
              label="Hồ bơi"
            />
          </Box>
          <Box sx={{ display: "flex", mt: 3, justifyContent: "center", gap: 3 }}>
            <Button color="warning" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              color="success"
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              {type === "edit" ? "Update" : "Create"}
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default memo(RoomModal);
  