"use client";
import React, { useEffect, useState } from "react";
import { loginServiceUser } from "../../services/authService";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Link from "next/link";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    loginServiceUser(data).then((res) => {
      if (res === true) {
        alert("Đăng nhập thành công")
        router.push("/");
        setIsLoading(false);
      } else {
        alert(`${res} Vui lòng thử lại.`);
        setIsLoading(false);
      }
    });
  };

  return (
    <div className=" p-5 vh-100 d-flex flex-column justify-content-center align-items-center w-100">
      <h1 className="text-danger display-4" style={{ fontFamily: "fantasy" }}>
        Airbnb
      </h1>
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center fs-5">Đăng nhập</h2>
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
            <div className="row">
                <div className="col-6">
                <button
              type="submit"
              disabled={isLoading}
              className="btn btn-dang-nhap"
            >
              {isLoading ? <CircularProgress size={24} /> : "Đăng nhập"}
            </button>
                </div>
                <div className="col-6 text-end">
                <Link href={"/register"} className="btn btn-dang-ki">Đăng kí <i className="fa fa-hand-point-right"></i></Link>
                </div>
            </div>
            
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
