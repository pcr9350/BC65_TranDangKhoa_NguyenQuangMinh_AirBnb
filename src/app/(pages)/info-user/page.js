'use client';
import { getRoomByUserIdService } from '@/app/services/bookingService';
import { getRoomByID } from '@/app/services/roomService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserService, updateUserAvatarService, updateUserService } from '@/app/services/userService';
import Compressor from 'compressorjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { setUser } from '@/app/redux/reducers/home/userSlice';
import { resetBookingRooms, setBookingRooms } from '@/app/redux/reducers/home/bookingRoomSlice';
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);// Kéo dài dayjs để hỗ trợ phân tích định dạng tùy chỉnh


const InfoUser = () => {
  const { user } = useSelector((state) => state.user);
  const { bookingrooms } = useSelector((state) => state.bookingrooms);
  const [bookingRoomData, setBookingRoomData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!user || !user.id) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const datPhongData = await getRoomByUserIdService(user.id);
        setBookingRoomData(datPhongData);
        if (!datPhongData || datPhongData.length === 0) {
          
          dispatch(resetBookingRooms());
          return; 
        }

        // Extract unique room IDs
        const arrayMaPhong = [...new Set(bookingRoomData.map(item => item.maPhong))];

        // Fetch room details for each unique ID
        const roomDetailsPromises = arrayMaPhong.map(id => getRoomByID(id));
        const fetchedRoomData = await Promise.all(roomDetailsPromises);

        
        dispatch(setBookingRooms(fetchedRoomData));
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    };
    fetchData();
  }, [user, bookingrooms]);
  

  //Xử lý upload avatar
  const validationSchemaAvatar = Yup.object({
    avatar: Yup.mixed()
      .required('Vui lòng chọn ảnh đại diện.')

  });
  const [showModalAvatar, setShowModalAvatar] = useState(false);

  const handleUpdateAvatarClick = async (values) => {
    try {
      const formData = new FormData();
      
      formData.append("formFile", values.avatar);

      // Gửi formData lên server để xử lý
      await updateUserAvatarService(values.avatar);
      alert('Cập nhật avatar thành công');
    } catch (error) {
      console.error('Lỗi khi upload avatar:', error);
      // Hiển thị thông báo lỗi cho người dùng
    } finally {
      setShowModalAvatar(false); // Đóng modal sau khi xử lý
    }
  };

  //Xử lý chỉnh sửa thông tin user
  const formatBirthday = (birthdayString) => {
    // Kiểm tra xem chuỗi có phải định dạng ISO 8601 hay không
    if (dayjs(birthdayString, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', true).isValid()) {
      return dayjs(birthdayString).format('YYYY-MM-DD');
    }

    // Nếu không phải định dạng ISO 8601, thử phân tích theo định dạng "DD/MM/YYYY"
    if (dayjs(birthdayString, 'DD/MM/YYYY', true).isValid()) {
      return dayjs(birthdayString, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }

    // Nếu không phải định dạng ISO 8601, thử phân tích theo định dạng "YYYY-MM-DD"
    if (dayjs(birthdayString, 'YYYY-MM-DD', true).isValid()) {
      return dayjs(birthdayString, 'YYYY-MM-DD').format('YYYY-MM-DD');
    }
    // Nếu không khớp với định dạng nào, trả về null hoặc giá trị mặc định khác
    return null;
  };
  const validationSchemaUpdateUser = Yup.object({
    name: Yup.string().required('Vui lòng nhập tên người dùng.'),
    email: Yup.string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số.')
      .required('Vui lòng nhập số điện thoại.'),
    birthday: Yup.date().required('Vui lòng nhập ngày sinh.'),
    gender: Yup.boolean().required('Vui lòng chọn giới tính.'),
  });

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const dispatch = useDispatch();

  const handleEditProfileClick = async (values) => {
    try {
      await updateUserService(values);
      const userData = await getUserService(user.id);
      dispatch(setUser(userData));
      alert('Cập nhật thông tin thành công');
      setShowModalUpdate(false);
    }
    catch (error) {
      alert('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
    }
  };

  return (
    <div className="container mt-4">
      {!user || !user.id ? (
        <p>
          Vui lòng <Link href="/login">Đăng nhập</Link> để xem thông tin người dùng.
        </p>
      ) : (
        <div className="row info-user">
          <div className="col-md-4 mb-4"> {/* User Card */}
            <div className="card">
              <div className="card-body text-center d-flex flex-column align-items-center"> {/* Added flexbox classes */}
                <Image
                  src={user.avatar ? user.avatar : "https://airbnbnew.cybersoft.edu.vn/avatar/25-06-2024-05-39-00-avatar-model.png"}
                  alt="Avatar"
                  width={150}
                  height={150}
                  className="rounded-circle mb-3"
                />
                <a
                  href="#"
                  className="link-update-info mb-3"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn chuyển hướng mặc định của thẻ <a>
                    setShowModalAvatar(true);
                  }}
                >
                  Cập nhật ảnh
                </a>

                {showModalAvatar && (
                  <div className="modal fade show d-block" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">

                        <Formik
                          initialValues={{ avatar: null }}
                          validationSchema={validationSchemaAvatar}
                          onSubmit={handleUpdateAvatarClick}
                        >
                          <Form>
                            <div className="modal-header">
                              <h1 className="modal-title fs-5">Cập nhật ảnh đại diện</h1>
                              <button type="button" className="btn-close" onClick={() => setShowModalAvatar(false)}></button>
                            </div>
                            <div className="modal-body">
                              <Field name="avatar" type="file" accept="image/*" className="form-control" />
                              <ErrorMessage name="avatar" component="div" className="text-danger" />
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={() => setShowModalAvatar(false)}>Đóng</button>
                              <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-flex align-items-center mb-3">
                  <Image src={"/iconDanhTinh.png"} alt='...' height={20} width={20} className='w-6 me-2' />
                  <span className="align-middle text-danhtinh">Xác minh danh tính</span> {/* Add align-middle class */}
                </div>
                <p className='mb-3'>Xác minh danh tính của bạn với huy hiệu xác minh danh tính.</p>
                <button className='btn btn-outline-success mb-3'>Nhận huy hiệu</button>
                <hr />
                <p className='mb-3 text-xacnhan'>{user.name.toUpperCase()} ĐÃ XÁC NHẬN</p>
                <span className='mb-3'><i className="fa fa-check"></i>  {user.email}</span>
              </div>
            </div>
          </div>
          <div className="col-md-8"> {/* Booked Rooms */}
            <p className='mb-3 text-danhtinh'>Xin chào, tôi là {user.name}</p>
            <p>Bắt đầu tham gia vào 2023</p> {/* Replace with actual join date */}
            <a
              href="#" // Thay thế # bằng đường dẫn đích của bạn
              className="link-update-info mb-3"
              onClick={(e) => {
                e.preventDefault(); // Ngăn chuyển hướng mặc định
                setShowModalUpdate(true);
              }}
            >
              Chỉnh sửa hồ sơ
            </a>

            {showModalUpdate && (
              <div className="modal fade show d-block" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">


                    <Formik
                      initialValues={{
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        birthday: formatBirthday(user.birthday),
                        gender: user.gender,
                        role: "USER"
                      }}
                      validationSchema={validationSchemaUpdateUser}
                      onSubmit={handleEditProfileClick}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                          <div className="modal-header">
                            <h1 className="modal-title fs-5">Chỉnh sửa thông tin</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModalUpdate(false)}></button>
                          </div>
                          <div className="modal-body">

                            {/* Tên người dùng */}
                            <div className="row mb-3"> {/* Thêm row */}
                              <label htmlFor="name" className="col-4 col-form-label">Tên người dùng</label>
                              <div className="col-8"> {/* Thêm col-8 */}
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  className="form-control"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                              </div>
                            </div>

                            {/* Email */}
                            <div className="row mb-3">
                              <label htmlFor="email" className="col-4 col-form-label">Email</label>
                              <div className="col-8">
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  className="form-control"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                              </div>
                            </div>


                            {/* Số điện thoại */}
                            <div className="row mb-3">
                              <label htmlFor="phone" className="col-4 col-form-label">Số điện thoại</label>
                              <div className="col-8">
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  className="form-control"
                                  value={values.phone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name="phone" component="div" className="text-danger" />
                              </div>
                            </div>

                            {/* Ngày sinh */}
                            <div className="row mb-3">
                              <label htmlFor="birthday" className="col-4 col-form-label">Ngày sinh</label>
                              <div className="col-8">
                                <input
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  className="form-control"
                                  value={dayjs(values.birthday).format('YYYY-MM-DD')}
                                  onChange={(e) => {
                                    const date = dayjs(e.target.value, 'YYYY-MM-DD').toDate();
                                    setFieldValue('birthday', date);
                                  }}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name="birthday" component="div" className="text-danger" />
                              </div>
                            </div>

                            {/* Giới tính (vẫn giữ nguyên Field vì là radio button) */}
                            <div className="row mb-3">
                              <label htmlFor="gender" className="col-4 col-form-label">Giới tính</label>
                              <div className="col-8 d-flex align-items-center"> {/* Căn giữa radio button */}
                                <div className="form-check me-3"> {/* Thêm margin-right */}
                                  <Field type="radio" id="genderMale" name="gender" value={true} className="form-check-input" />
                                  <label className="form-check-label" htmlFor="genderMale">Nam</label>
                                </div>
                                <div className="form-check">
                                  <Field type="radio" id="genderFemale" name="gender" value={false} className="form-check-input" />
                                  <label className="form-check-label" htmlFor="genderFemale">Nữ</label>
                                </div>
                              </div>
                            </div>

                          </div> {/* Kết thúc modal-body */}
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModalUpdate(false)}>Đóng</button>
                            <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            )}

            <hr />
            <p className='mb-3 text-phong-thue'>Phòng đã thuê</p>
            <div className="row row-cols-1 row-cols-md-1 g-4 mb-4">
              {bookingrooms && bookingrooms.length > 0 ? ( // Conditionally render room cards or message
                bookingrooms.map((room, index) => (
                  <div key={index} className="col">
                    <Link href={`/room-detail/${room.id}`} className='link-room-user'>
                      <div className="card card-room">
                        <div className="row g-0">
                          <div className="col-md-6">
                            <Image src={room.hinhAnh} alt="Room Image" width={1200} height={300} className="img-fluid rounded-start h-100" />
                          </div>
                          <div className="col-md-6">
                            <div className="card-body">
                              <h6 className="card-title card-room-user">{room.tenPhong}</h6>
                              <hr />
                              <p className='mb-2 text-room-user'>
                                {room.khach} khách - {room.phongNgu} phòng ngủ - {room.giuong} giường - {room.phongTam} phòng tắm
                              </p>
                              <p className='mb-2 text-room-tien-nghi'>
                                {room.mayGiat && "Máy giặt -"}
                                {room.banLa && " Bàn là -"}
                                {room.tivi && " Tivi -"}
                                {room.dieuHoa && " Điều hòa -"}
                                {room.wifi && " Wifi -"}
                                {room.bep && " Bếp -"}
                                {room.doXe && " Đậu xe -"}
                                {room.hoBoi && " Hồ bơi -"}
                                {room.banUi && " Bàn ủi"}
                              </p>
                              {/* Add more room details here as needed */}
                            </div>
                            <div className="card-footer footer-room-user d-flex justify-content-end align-items-center">
                              <p className="text-giaTien mb-0">
                                $ {room.giaTien}/đêm
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                  </div>
                ))
              ) : (
                <p>Bạn chưa có lịch sử thuê phòng</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoUser;