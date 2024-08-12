'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
    TextField, FormControl, FormLabel, RadioGroup, 
    FormControlLabel, Radio, 
    CircularProgress
  } from '@mui/material';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import dayjs from 'dayjs'; // Import dayjs
import { createUserService } from '@/app/services/userService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const validationSchema = Yup.object({
    name: Yup.string().required('Vui lòng nhập tên người dùng'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
      .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
      .required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
    birthday: Yup.date().required('Vui lòng chọn ngày sinh'),
    gender: Yup.string().required('Vui lòng chọn giới tính'),
  });

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    password: '',
    birthday: null,
    gender: 'true',
  };

  
const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const data = { ...values, role: 'USER', birthday: dayjs(values.birthday).format('DD/MM/YYYY')};
            await createUserService(data);
            setIsLoading(false);
        }
        catch (error) {
            setIsLoading(false);
        }
      }
  return (
    <div className=" p-5 vh-100 d-flex flex-column justify-content-center align-items-center w-100 register-user">
      <h1 className="text-danger display-4" style={{ fontFamily: "fantasy" }}>
        Airbnb
      </h1>
      <div className="card w-100" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h2 className="card-title text-center fs-5">Đăng kí</h2>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (           
        <Form className="container 
 mt-1">
          <div className="mb-1">
            <Field as={TextField} name="name" label="Tên người dùng" fullWidth error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
          </div>
          <div className="mb-1">
          <Field as={TextField} name="email" label="Email" fullWidth error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
          </div>
          <div className="mb-1">
          <Field as={TextField} name="password" type="password" label="Mật khẩu" fullWidth error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password} />
          </div>
          <div className="mb-1">
          <Field as={TextField} name="phone" label="Số điện thoại" fullWidth error={touched.phone && Boolean(errors.phone)} helperText={touched.phone && errors.phone} />
          </div>
          <div className="mb-1">
          
            <DatePicker
              label="Ngày sinh"
              value={values.birthday}
              onChange={(newValue) => {
                setFieldValue('birthday', newValue);
              }}
              renderInput={(params) => <TextField {...params} fullWidth error={touched.birthday && Boolean(errors.birthday)} helperText={touched.birthday && errors.birthday} />}
            />
            
          </div>
          <div className="mb-1">
          <FormControl component="fieldset" className="mb-1">
            <FormLabel component="legend">Giới tính</FormLabel>
            <Field as={RadioGroup} row name="gender">
              <FormControlLabel value="true" control={<Radio />} label="Nam" />
              <FormControlLabel value="false" control={<Radio />} label="Nữ" />
            </Field>
            {touched.gender && Boolean(errors.gender) && <div className="text-danger">{errors.gender}</div>}
          </FormControl>
          </div>
          <div className="row">
                <div className="col-6">
          <button
              type="submit"
              disabled={isLoading}
              className="btn btn-dang-nhap" // Sử dụng các class của Bootstrap
            >
              {isLoading ? <CircularProgress size={24} /> : <span>Đăng kí</span>}
            </button>
            </div>
                <div className="col-6 text-end">
                <Link href={"/login"} className="btn btn-dang-ki"><span>Đăng nhập </span><i className="fa fa-hand-point-right"></i></Link>
                </div>
                </div>
        </Form>
        
      )}
    </Formik>
   </LocalizationProvider>
   </div>
   </div>
   </div>
  )
}

export default Register