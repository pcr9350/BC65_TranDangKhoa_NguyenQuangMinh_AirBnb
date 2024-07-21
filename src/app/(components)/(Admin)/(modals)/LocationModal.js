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
import { setLocationModal } from "../../../redux/reducers/admin/modalSlice";
import { LoadingButton } from "@mui/lab";
import {
  createLocationService,
  updateLocationService,
} from "../../../services/locationService";
import { uploadImage } from "../../../utils/index";
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
  maxHeight: 500,
  overflowY: "auto",
};

const LocationModal = () => {
  const { type, open, data } = useSelector((state) => state.modal.location);
  const dispatch = useDispatch();
  const [locationData, setLocationData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (type === "edit" && data) setLocationData(data);
  }, [type, data]);

  const handleClose = () => {
    setLocationData(null);
    setIsLoading(false);
    setErrors(null);
    dispatch(
      setLocationModal({
        type: null,
        open: false,
        data: null,
      })
    );
  };

  const handleChangeData = (e) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = false;

    if (!locationData?.hinhAnh) {
      err = true;
      toast.error("Vui lòng thêm hình ảnh");
    }

    if (!locationData?.tenViTri) {
      err = true;
      setErrors((prev) => ({
        ...prev,
        ten: "Tên vị trí không được để trống",
      }));
    }

    if (!locationData?.tinhThanh) {
      err = true;
      setErrors((prev) => ({
        ...prev,
        ten: "Tỉnh thành không được để trống",
      }));
    }

    if (!locationData?.quocGia) {
      err = true;
      setErrors((prev) => ({
        ...prev,
        ten: "Tên quốc gia không được để trống",
      }));
    }
    if (err) return;

    setIsLoading(true);

    try {
      await uploadImage(imageSelected);
      if (type === "edit") {
        await updateLocationService(locationData).then(
          (data) => data && handleClose()
        );
      } else {
        await createLocationService(locationData).then(
          (data) => data && handleClose()
        );
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
      setLocationData((prev) => ({
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
      className="w-full md:w-2/3 mx-auto"
    >
      <Box sx={style} component={"form"} onSubmit={handleSubmit}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
        >
          {type === "edit" ? `Edit Location` : "Create Location"}
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
              width: "100%",
            }}
          >
            {locationData?.hinhAnh && (
              <img
                src={locationData?.hinhAnh}
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
            value={locationData?.tenViTri}
            onChange={handleChangeData}
            error={!!errors?.tenViTri}
            helperText={errors?.tenViTri}
          />
          <TextField
            label="Tỉnh thành"
            name="tinhThanh"
            value={locationData?.tinhThanh}
            onChange={handleChangeData}
            required
            error={!!errors?.tinhThanh}
            helperText={errors?.tinhThanh}
          />
          <TextField
            label="Quốc gia"
            name="quocGia"
            value={locationData?.quocGia}
            onChange={handleChangeData}
            required
            error={!!errors?.quocGia}
            helperText={errors?.quocGia}
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

export default memo(LocationModal);
