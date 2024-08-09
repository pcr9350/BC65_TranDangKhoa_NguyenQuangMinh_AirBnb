"use client";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserModal } from "../../../redux/reducers/admin/modalSlice";
import { convertDateToISO } from "../../../utils/index";
import { LoadingButton } from "@mui/lab";
import {
  createUserService,
  updateUserService,
} from "../../../services/userService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 600,
  maxHeight: "80%",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
};

const UserModal = () => {
  const { type, open, data } = useSelector((state) => state.modal.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (type === "edit" && data) setUserData(data);
    else setUserData(null);
  }, [type, data]);

  const handleClose = () => {
    setUserData(null);
    setErrors(null);
    setIsLoading(false);
    dispatch(
      setUserModal({
        type: null,
        open: false,
        data: null,
      })
    );
  };

  const handleChangeData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = false;

    if (userData?.name?.length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "Tên phải có ít nhất 2 ký tự",
      }));
      err = true;
    }
    // if (userData?.phone?.length <= 9 || userData?.phone?.length > 11) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     phone: "Số điện thoại không hợp lệ",
    //   }));
    //   err = true;
    // }
    if (userData?.password?.length <= 5 && type !== "edit") {
      setErrors((prev) => ({
        ...prev,
        password: "Mật khẩu phải có ít nhất 6 ký tự",
      }));
      err = true;
    }
    console.log(errors);
    if (err) return;
    setIsLoading(true);

    try {
      // const dataUpdate = userData;
      // await uploadImage(imageSelected).then(
      //   (res) => res && (dataUpdate.avatar = res)
      // );
      if (type === "edit") {
        await updateUserService(userData).then((data) => data && handleClose());
      } else {
        await createUserService(userData).then((data) => data && handleClose());
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
      setUserData((prev) => ({
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
      className="m-3"
    >
      <Box
        sx={style}
        component={"form"}
        onSubmit={handleSubmit}
        className="w-full bg-red p-3 md:p-4 md:w-[650px]"
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
        >
          {type === "edit" ? `Edit User` : "Create User"}
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
          {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {userData?.avatar && (
                <Avatar
                  src={userData?.avatar}
                  sx={{ width: 100, height: 100, objectFit: "cover" }}
                />
              )}
              <input type="file" onChange={handleImageChange} />
            </Box> */}

          {type === "edit" && (
            <TextField
              label="Mã người dùng"
              name="id"
              defaultValue={data?.id}
              disabled
              className="w-full md:w-[250px]"
            />
          )}
          <TextField
            label="Tên người dùng"
            name="name"
            className="w-full md:w-[250px]"
            required
            value={userData?.name}
            onChange={handleChangeData}
            error={!!errors?.name}
            helperText={errors?.name}
          />
          <TextField
            label="Số điện thoại"
            name="phone"
            value={userData?.phone}
            onChange={handleChangeData}
            className="w-full md:w-[250px]"
            // error={!!errors?.phone}
            // helperText={errors?.phone}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={userData?.email}
            onChange={handleChangeData}
            className="w-full md:w-[250px]"
            required
          />
          {type === "add" && (
            <TextField
              label="Mật khẩu"
              name="password"
              type="password"
              defaultValue={data?.id}
              onChange={handleChangeData}
              className="w-full md:w-[250px]"
              required
              error={!!errors?.password}
              helperText={errors?.password}
            />
          )}
          <TextField
            label="Ngày sinh"
            type="date"
            name="birthday"
            key={userData?.birthday}
            className="w-full md:w-[250px]"
            value={
              type === "edit"
                ? convertDateToISO(userData?.birthday)
                : userData?.birthday || new Date()
            }
            onChange={handleChangeData}
            required
          />
          <div className="w-full md:w-[250px] flex flex-row justify-between">
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                name="gender"
                required
                value={userData?.gender}
                key={userData?.gender}
                onChange={handleChangeData}
              >
                <MenuItem value={true}>Male</MenuItem>
                <MenuItem value={false}>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel>Chức vụ</InputLabel>
              <Select
                label="Chức vụ"
                name="role"
                required
                value={userData?.role}
                key={userData?.role}
                onChange={handleChangeData}
              >
                <MenuItem value={"ADMIN"}>admin</MenuItem>
                <MenuItem value={"USER"}>user</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", mt: 3, justifyContent: "center", gap: 3 }}>
          <Button color="warning" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            color="success"
            variant="contained"
            loading={isLoading}
            type="submit"
          >
            {type === "edit" ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(UserModal);
