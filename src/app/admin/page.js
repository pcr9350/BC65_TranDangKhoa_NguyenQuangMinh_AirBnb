'use client';
import React, { useState } from 'react';
import { LoadingButton } from "@mui/lab"; // Giữ nguyên LoadingButton từ MUI
import { loginService } from "../services/authService";
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    loginService(data)
      .then((res) => {
        res && router.push("/admin/users");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container p-5 vh-100 d-flex flex-column justify-content-center align-items-center bg-dark">
    <h1 className="text-danger display-4" style={{ fontFamily: "fantasy" }}>
      Airbnb
    </h1>
    <div className="card w-100" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h2 className="card-title text-center fs-5">Admin Login Page</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
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
            <label htmlFor="password" className="form-label">Password</label>
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
          <LoadingButton type="submit" loading={isLoading} variant="outline-primary">
            Login
          </LoadingButton>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin