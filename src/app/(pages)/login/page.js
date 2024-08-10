// "use client";
// import React, { useEffect, useState } from "react";
// import { loginServiceUser } from "../../services/authService";
// import { useRouter } from "next/navigation";
// import { CircularProgress } from "@mui/material";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// const Login = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const router = useRouter();
//   const { user } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (user) {
//       router.push("/");
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     setIsLoading(true);
//     e.preventDefault();

//     loginServiceUser(data).then((res) => {
//       if (res === true) {
//         alert("Đăng nhập thành công")
//         router.push("/");
//         setIsLoading(false);
//       } else {
//         setIsLoading(false);
//       }
//     });
//   };

//   return (
//     <div className=" p-5 vh-100 d-flex flex-column justify-content-center align-items-center w-100">
//       <h1 className="text-danger display-4" style={{ fontFamily: "fantasy" }}>
//         Airbnb
//       </h1>
//       <div className="card w-100" style={{ maxWidth: "400px" }}>
//         <div className="card-body">
//           <h2 className="card-title text-center fs-5">Đăng nhập</h2>
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 value={data.email}
//                 required
//                 onChange={(e) =>
//                   setData((prev) => ({ ...prev, email: e.target.value }))
//                 }
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 name="password"
//                 value={data.password}
//                 required
//                 onChange={(e) =>
//                   setData((prev) => ({ ...prev, password: e.target.value }))
//                 }
//               />
//             </div>
//             <div className="row">
//                 <div className="col-6">
//                 <button
//               type="submit"
//               disabled={isLoading}
//               className="btn btn-dang-nhap"
//             >
//               {isLoading ? <CircularProgress size={24} /> : "Đăng nhập"}
//             </button>
//                 </div>
//                 <div className="col-6 text-end">
//                 <Link href={"/register"} className="btn btn-dang-ki">Đăng kí <i className="fa fa-hand-point-right"></i></Link>
//                 </div>
//             </div>         
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


"use client";
import React, { useEffect } from "react";
import { loginServiceUser } from "../../services/authService";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
      password: Yup.string().required('Mật khẩu là bắt buộc'),
    }),
    onSubmit: async (values) => {
      formik.setSubmitting(true); 

      loginServiceUser(values).then((res) => {
        if (res === true) {
          toast.success("Đăng nhập thành công");
          router.push("/");
        } 
        formik.setSubmitting(false); 
      });
    },
  });

  return (
    <div className="container p-4 vh-100 d-flex flex-column justify-content-center align-items-center"> 
      <h1 className="text-danger display-4" style={{ fontFamily: "fantasy" }}>
        Airbnb
      </h1>
      <div className="card" style={{ maxWidth: "450px" }}>
        <div className="card-body">
          <h2 className="card-title text-center fs-5">Đăng nhập</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control   
 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                {...formik.getFieldProps('email')} 
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>   

              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control   
 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"   

                {...formik.getFieldProps('password')} 
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>   

              )}
            </div>
            <div className="row">   

              <div className="col-5 text-start">
                <button
                  type="submit"
                  disabled={formik.isSubmitting} 
                  className="btn btn-dang-nhap"
                >
                  {formik.isSubmitting ? <CircularProgress size={24} /> : "Đăng nhập"}
                </button>
              </div>
              <div className="col-5 text-end ml-4">
                <Link href={"/register"} className="btn btn-dang-ki">
                  Đăng kí <i className="fa fa-hand-point-right"></i>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;