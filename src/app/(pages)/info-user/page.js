'use client';
import { getRoomByUserIdService } from '@/app/services/bookingService';
import { getRoomByID } from '@/app/services/roomService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateUserAvatarService } from '@/app/services/userService';
import Compressor from 'compressorjs';


const InfoUser = () => {
  const { user } = useSelector((state) => state.user);
  const [bookingRoomData, setBookingRoomData] = useState([]);
  const [roomData, setRoomData] = useState([]); 

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
          // No bookings found, handle this case (e.g., display a message)
          setRoomData([]); // Or set it to some other default value
          return; // Exit the function early
        }

        // Extract unique room IDs
        const arrayMaPhong = [...new Set(bookingRoomData.map(item => item.maPhong))];

        // Fetch room details for each unique ID
        const roomDetailsPromises = arrayMaPhong.map(id => getRoomByID(id));
        const fetchedRoomData = await Promise.all(roomDetailsPromises);

        setRoomData(fetchedRoomData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately (e.g., display an error message to the user)
      }
    };

    fetchData();
  }, [user]); 

  //Xử lý upload avatar
  const validationSchemaAvatar = Yup.object({
    avatar: Yup.mixed()
      .required('Vui lòng chọn ảnh đại diện.')
      // .test(
      //   'fileSize',
      //   'Dung lượng ảnh quá lớn (tối đa 10MB).',
      //   async (value) => {
      //     if (!value) return false;
  
      //     // Nén ảnh trước khi kiểm tra kích thước
      //     return new Promise((resolve) => {
      //       new Compressor(value, {
      //         quality: 0.8, // Điều chỉnh chất lượng nếu cần
      //         success(result) {
      //           resolve(result.size <= 10 * 1024 * 1024); // Kiểm tra kích thước sau khi nén
      //         },
      //         error(err) {
      //           console.error('Lỗi khi nén ảnh:', err);
      //           resolve(false); 
      //         }
      //       });
      //     });
      //   }
      // )
  });
  const [showModalAvatar, setShowModalAvatar] = useState(false);

  const handleUpdateAvatarClick = async (values) => {
    try {
      const formData = new FormData();
      console.log(values.avatar)
      formData.append("formFile", values.avatar);
      
      // Gửi formData lên server để xử lý
      await updateUserAvatarService(formData);
      alert('Cập nhật avatar thành công');
    } catch (error) {
      console.error('Lỗi khi upload avatar:', error);
      // Hiển thị thông báo lỗi cho người dùng
    } finally {
      setShowModalAvatar(false); // Đóng modal sau khi xử lý
    }
  };

  const handleEditProfileClick = () => {
    // TODO: Implement logic to show the profile edit modal
    console.log('Edit profile clicked');
  };
  return (
    <div className="container mt-4">
      {!user || !user.id ? (
        <p>
          Vui lòng <Link href="/">Đăng nhập</Link> để xem thông tin người dùng.
        </p>
      ) : (
          <div className="row info-user">
            <div className="col-md-4"> {/* User Card */}
              <div className="card">
                <div className="card-body text-center d-flex flex-column align-items-center"> {/* Added flexbox classes */}
                  <Image
                    src={user.avatar ? user.avatar : "https://airbnbnew.cybersoft.edu.vn/avatar/25-06-2024-05-39-00-avatar-model.png"}
                    alt="Avatar"
                    width={150}
                    height={150}
                    className="rounded-circle mb-3"
                  />
                  <button className="btn btn-primary mb-3" onClick={() => setShowModalAvatar(true)}>
        Cập nhật ảnh
      </button>

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
              <p>Xin chào, tôi là {user.name}</p>
              <p>Bắt đầu tham gia vào 2023</p> {/* Replace with actual join date */}
              <button className="btn btn-secondary mb-3" onClick={handleEditProfileClick}>
                Chỉnh sửa hồ sơ
              </button>

              <p>Phòng đã thuê</p>
              <div className="row row-cols-1 row-cols-md-1 g-4">
                {roomData.length > 0 ? ( // Conditionally render room cards or message
                  roomData.map((room, index) => (
                    <div key={index} className="col">
                      <div className="card">
                        <div className="row g-0">
                          <div className="col-md-6">
                            <Image src={room.hinhAnh} alt="Room Image" width={300} height={200} className="img-fluid rounded-start" />
                          </div>
                          <div className="col-md-6">
                            <div className="card-body">
                              <h5 className="card-title">{room.tenPhong}</h5>
                              {/* Add more room details here as needed */}
                            </div>
                          </div>
                        </div>
                      </div>
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