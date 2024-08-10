"use client";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab"; // Giữ nguyên LoadingButton từ MUI
import { loginService } from "../services/authService";
import { useRouter } from "next/navigation";
import { Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUserService } from "../services/userService";
import { storageData } from "../utils/storage";
const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
  if (user) {
    if (user.role === 'USER') {
      router.push("/");
    } else if (user.role === "ADMIN") {
      router.push("/admin/users");
    } else {
      // Handle other roles or invalid roles here if necessary
      toast.error("lỗi user");
    }
  }
}, [user]);

  const handleLogin = async (e) => {
  setIsLoading(true);
  e.preventDefault();

  try {
    const res = await loginService(data); 

    if (res) {
      const data = await getUserService(storageData.getData("userId"));
      // Check the user's role within the response if available
      if (data?.role === 'USER') {
        toast.success("Bạn không có quyền admin, hệ thống sẽ tự động chuyển trang")
        router.push("/");
      } else if (data?.role === "ADMIN") {
        toast.success("Đăng nhập thành công")
        router.push("/admin/users");
      } else {
        toast.error("Lỗi đăng nhập");
      }
    }
  } catch (error) {
    console.log({ error });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className=" p-5 vh-100 d-flex flex-column justify-content-center align-items-center bg-dark w-100">
      <h1 className="text-danger display-4" style={{ fontFamily: "fantasy" }}>
        Airbnb
      </h1>
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center fs-5">Admin Login Page</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={data.email}
                required
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={data.password}
                required
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="outlined"
              color="primary"
            >
              {isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
