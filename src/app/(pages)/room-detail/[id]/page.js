'use client'
import { setRoom } from '@/app/redux/reducers/home/roomSlice';
import { createBinhLuanService, getBinhLuanByRoomIDService } from '@/app/services/binhLuanService';
import { getRoomByID } from '@/app/services/roomService';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createBookingService, getsBookingService } from '@/app/services/bookingService';
import dayjs from 'dayjs';
import Link from 'next/link';

import moment from 'moment';
import { getLocationService } from '@/app/services/locationService';
import { setLocationsID } from '@/app/redux/reducers/home/locationSlice';

const RoomDetail = (props) => {
  const { id } = props.params;
  const { room } = useSelector((state) => state.room);
  const [binhLuanData, setBinhLuanData] = useState([]);

  const { search } = useSelector((state) => state.search);
  const { locations } = useSelector((state) => state.locations);
  const [frmCheckInDate, setFrmCheckInDate] = useState(search?.checkInDate);
  const [frmCheckOutDate, setFrmCheckOutDate] = useState(search?.checkOutDate);
  const formikRef = useRef(null); // Tạo ref cho Formik
  const { user } = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);
  const [night, setNight] = useState(0);

  const dispatch = useDispatch();

  let LocationLatin;

  if (locations && locations.tinhThanh) {
    LocationLatin = locations.tinhThanh
      .normalize('NFD')           // Normalize Unicode to separate diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/đ/g, 'd')          // Replace 'đ' with 'd'
      .replace(/Đ/g, 'D')          // Replace 'Đ' with 'D'
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .toLowerCase();              // Convert to lowercase
  } else {
    LocationLatin = "" // Set a default value if locations or tinhThanh is undefined
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const roomData = await getRoomByID(id);
        dispatch(setRoom(roomData));
        const getBinhLuanByRoomID = await getBinhLuanByRoomIDService(id);
        setBinhLuanData(getBinhLuanByRoomID);
        const location = await getLocationService(room.maViTri);
        dispatch(setLocationsID(location));

      }
    };
    fetchData();
  }, [id, binhLuanData]);

  let soLuongBinhLuan = binhLuanData.length;
  // Tính trung bình đánh giá
  let tongSoSao = binhLuanData.reduce((sum, item) => {
    // Kiểm tra xem item.binhLuan và item.binhLuan.saoBinhLuan có tồn tại không
    if (item && item.saoBinhLuan) {
      return sum + item.saoBinhLuan;
    } else {
      return sum; // Nếu không có đánh giá, giữ nguyên tổng
    }
  }, 0); // Khởi tạo giá trị ban đầu của sum là 0
  let trungBinhDanhGia = binhLuanData.length > 0 ? (tongSoSao / soLuongBinhLuan).toFixed(1) : 0;

  // Formik validation schema
  const validationSchema = Yup.object({
    checkInDate: Yup.date()
      .required('Vui lòng chọn ngày nhận phòng')
      .min(new Date(new Date().setDate(new Date().getDate() - 1)), 'Ngày nhận phòng phải từ hôm nay trở đi'),
    checkOutDate: Yup.date()
      .required('Vui lòng chọn ngày trả phòng')
      .min(Yup.ref('checkInDate'), 'Ngày trả phòng phải sau ngày nhận phòng'),
    soLuongKhach: Yup.number().required('Vui lòng nhập số lượng khách').min(1, 'Số lượng khách phải lớn hơn 0'),
  });

  //Phần Bình Luận
  const validationSchemaBinhLuan = Yup.object({
    noiDung: Yup.string().required('Nội dung bình luận là bắt buộc'),
  });

  const handleSubmitBinhLuan = async (values) => {
    try {
      const data = {
        maPhong: room.id,
        maNguoiBinhLuan: user.id,
        ngayBinhLuan: dayjs().format("YYYY-MM-DD"),
        noiDung: values.noiDung,
        saoBinhLuan: rating,
      };
      await createBinhLuanService(data);
      // alert('Cám ơn bạn đã đánh giá!');
      const getBinhLuanByRoomID = await getBinhLuanByRoomIDService(id);
      setBinhLuanData(getBinhLuanByRoomID);
    } catch (error) {

    }
  };

  const handleSubmit = async (values) => {
    if (!user || !user.id) {
      toast.error("Vui lòng đăng nhập để đặt phòng");
      return; // Dừng xử lý nếu chưa đăng nhập
    }
  
    try {
      const data = {
        maPhong: room.id,
        ngayDen: dayjs(values.checkInDate).format("YYYY-MM-DD"),
        ngayDi: dayjs(values.checkOutDate).format("YYYY-MM-DD"),
        soLuongKhach: values.soLuongKhach,
        maNguoiDung: user.id
      };
  
      const dataDanhSachDatPhong = await getsBookingService();
  
      if (dataDanhSachDatPhong && dataDanhSachDatPhong.length > 0) {
        // Lọc các đặt phòng có cùng mã phòng
        const datPhongCungPhong = dataDanhSachDatPhong.filter(item => item.maPhong === room.id);
  
        // Kiểm tra trùng lặp ngày
        const isTrungNgay = datPhongCungPhong.some(item => {
          const ngayDenHienTai = new Date(data.ngayDen);
          const ngayDiHienTai = new Date(data.ngayDi);
          const ngayDenDaDat = new Date(item.ngayDen);
          const ngayDiDaDat = new Date(item.ngayDi);
  
          return (
            (ngayDenHienTai >= ngayDenDaDat && ngayDenHienTai <= ngayDiDaDat) || 
            (ngayDiHienTai >= ngayDenDaDat && ngayDiHienTai <= ngayDiDaDat) ||
            (ngayDenDaDat >= ngayDenHienTai && ngayDenDaDat <= ngayDiHienTai)
          );
        });
  
        if (isTrungNgay) {
          toast.error("Đã có người đặt phòng vào ngày này. Bạn vui lòng chọn ngày khác !");
          return; 
        }
      } 
  
      await createBookingService(data);
    } catch (error) {
      // Xử lý lỗi ở đây nếu cần
      console.error("Lỗi khi tạo đặt phòng:", error); 
    }
  };
  function calculateRoomPrice(values, room) {
    if (!values.checkOutDate || !values.checkInDate) {
      return 0; // No dates, no price
    }

    const checkIn = new Date(values.checkInDate);
    const checkOut = new Date(values.checkOutDate);
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

    if (checkOut <= checkIn) {
      return 0;
    }
    const totalPrice = (room.giaTien * nights);
    setNight(nights);
    return totalPrice;
  }

  const calculateTimeAgo = (ngayBinhLuan) => {
    const diffDays = moment().diff(moment(ngayBinhLuan), 'days');
    if (diffDays === 0) return "hôm nay";
    if (diffDays < 30) return `${diffDays} ngày trước`;
    if (diffDays < 60) return "một tháng trước";
    const diffMonths = Math.floor(diffDays / 30); // Calculate approximate months
    return `${diffMonths} tháng trước`;
  };

  //Popup Image
  const [showPopup, setShowPopup] = useState(false);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container mt-4">
      {room && (
        <>
          <h2 className="mb-3">{room.tenPhong}</h2>
          <span><i className="fa fa-award icon-award mb-3"></i> Chủ nhà siêu cấp {!locations ? "" : <Link className='mx-3' href={`/rooms/${LocationLatin}`}>{locations?.tinhThanh}, Việt Nam</Link>}</span>
          <div
            className="mb-3"> {/* Loại bỏ các lớp carousel */}
            <div className="carouselImageContainer" onClick={handleImageClick}>
              <Image
                src={room.hinhAnh}
                width={1400}
                height={350}
                className="d-block w-100 rounded carouselImage img-fluid"
                alt="..."
              />
            </div>

            {showPopup && (
              <div className="popupOverlay" onClick={handleClosePopup}>
                <div className="popupContent">
                  <Image
                    src={room.hinhAnh}
                    width={1200} // Hoặc kích thước khác tùy ý
                    height={350}
                    alt="..."
                    className="img-fluid image-content-pop-up"
                  />
                  {/* Thêm nội dung khác vào popup nếu cần */}
                  <button className="btn btn-secondary btn-image-popup mt-2" onClick={handleClosePopup}>Đóng</button>
                </div>
              </div>
            )}
          </div>

          <Formik
            initialValues={{
              checkInDate: frmCheckInDate,
              checkOutDate: frmCheckOutDate,
              soLuongKhach: search?.soLuongKhach,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef} // Gán ref vào Formik
          >
            {({ values, errors, touched, handleChange, setFieldValue }) => (
              <Form>
                <div className='row'>
                  <div className='col-md-6 col-lg-7'>
                    <div className='row'>
                      <div className='col-9'>
                        <h5 className='mb-1 fw-bold'>
                          Toàn bộ căn hộ. Chủ nhà <span className='text-chu-nha'>NNhatSang</span>
                        </h5>
                        <h6 className="mb-3 text-room-mota">
                          {room.khach} khách - {room.phongNgu} phòng ngủ - {room.giuong} giường - {room.phongTam} phòng tắm
                        </h6>
                      </div>
                      <div className='col-3'>
                        <div className="imageContainer">
                          <Image src={"https://avatars.githubusercontent.com/u/93591100?v=4"} height={50} width={50} className='image-avatar-room rounded rounded-circle' alt='image-avatar'></Image>

                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className='row'>
                        <div className='col-1'><i className="fab fa-houzz icon-mota"></i></div>
                        <div className='col-11'>
                          <span className='fw-bold text-room-mota'>Toàn bộ nhà</span>
                          <p className='text-mota'>Bạn sẽ có chung cư cao cấp cho riêng mình.</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-1'><i className="fa fa-broom icon-mota"></i></div>
                        <div className='col-11'>
                          <span className='fw-bold text-room-mota'>Vệ sinh tăng cường</span>
                          <p className='text-mota'>Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb. <span className='text-decoration-mota'> Hiển thị thêm</span></p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-1'><i className="fa fa-crown icon-mota"></i></div>
                        <div className='col-11'>
                          <span className='fw-bold text-room-mota'>Phong là Chủ nhà siêu cấp</span>
                          <p className='text-mota'>Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-1'><i className="fa fa-undo-alt icon-mota"></i></div>
                        <div className='col-11'>
                          <span className='fw-bold text-room-mota'>Miễn phí hủy trong 48 giờ</span>

                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className='mota mb-3'>
                      <p className="mota-text">{room.moTa}</p>
                      <p className="mota-text-underline fw-bold">Hiển thị thêm</p>
                    </div>
                    <hr />

                    <div className="mb-3">
                      <h5 className="fw-bold">Các tiện ích đi kèm:</h5>
                      <div className='row'>
                        <div className='col-6'>
                          {room.mayGiat && <p><i className="fa fa-dumpster"></i>  Máy giặt</p>}
                          {room.banLa && <p><i className="fa fa-bacon"></i>  Bàn là</p>}
                          {room.tivi && <p><i className="fa fa-tv"></i>  Tivi</p>}
                          {room.dieuHoa && <p><i className="fa fa-snowflake"></i>  Điều hòa</p>}
                          {room.wifi && <p><i className="fa fa-wifi"></i>  Wifi</p>}
                        </div>
                        <div className='col-6'>
                          {room.bep && <p><i className="fa fa-utensils"></i>  Bếp</p>}
                          {room.doXe && <p><i className="fa fa-car-side"></i>  Đậu xe</p>}
                          {room.hoBoi && <p><i className="fa fa-swimmer"></i>  Hồ bơi</p>}
                          {room.banUi && <p><i className="fa fa-bacon"></i>  Bàn ủi</p>}
                        </div>
                      </div>


                    </div>

                  </div>
                  <div className='col-md-6 col-lg-5
                  '>
                    <div className='bookingForm'>
                      <div className="room-details-container">
                        <div className="row">
                          <div className="col-4 col-lg-3 mb-3">
                            <label htmlFor="giaTien">{room.giaTien}$/đêm</label>
                          </div>
                          <div className="col-8 col-lg-9 mb-3 d-flex align-items-center justify-content-end"> {/* Combined column with flexbox */}
                            <label htmlFor="soSao" className="me-2">
                              <i className="fa fa-star so-sao-danh-gia"></i>{' '}
                              {soLuongBinhLuan > 0 ? trungBinhDanhGia : "Chưa có đánh giá"}
                            </label>
                            <label htmlFor="soLuongBinhLuan" className="mota-danhgia-underline">
                              ({soLuongBinhLuan}) lượt đánh giá
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row"> {/* Added row wrapper */}
                        <div className="col-6 mb-3"> {/* Check-in date column */}
                          <label htmlFor="checkInDate">Nhận phòng</label>
                          <input
                            type="date"
                            className={`form-control ${touched.checkInDate && errors.checkInDate ? 'is-invalid' : ''}`}
                            id="checkInDate"
                            name="checkInDate"
                            value={values.checkInDate}
                            setFieldValue={search?.checkInDate}
                            onChange={handleChange}
                          />
                          <ErrorMessage name="checkInDate" component="div" className="text-danger" />
                        </div>
                        <div className="col-6 mb-3"> {/* Check-out date column */}
                          <label htmlFor="checkOutDate">Trả phòng</label>
                          <input
                            type="date"
                            className={`form-control ${touched.checkOutDate && errors.checkOutDate ? 'is-invalid' : ''}`}
                            id="checkOutDate"
                            name="checkOutDate"
                            value={values.checkOutDate}
                            setFieldValue={search?.checkOutDate}
                            onChange={handleChange}
                          />
                          <ErrorMessage name="checkOutDate" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="form-group mb-3 ">
                        <label htmlFor="soLuongKhach" className="me-2 mb-2">Khách</label>
                        <div className='d-flex align-items-center'>
                          <div className="input-group">
                            <button type="button" className="btn btn-outline-secondary btn-guest-count" onClick={() => setFieldValue('soLuongKhach', Math.max(1, values.soLuongKhach - 1))}>
                              <i className="fa fa-minus"></i>
                            </button>
                            <Field type="number" className="form-control text-center no-spinners" id="soLuongKhach" name="soLuongKhach" min="1" />
                            <button type="button" className="btn btn-outline-secondary btn-guest-count" onClick={() => setFieldValue('soLuongKhach', values.soLuongKhach + 1)}>
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>

                        </div>
                        <ErrorMessage name="soLuongKhach" component="div" className="text-danger ms-2" />

                      </div>
                      <button type="submit" className="btn btn-primary w-100 mb-3">Đặt phòng</button>

                      {/* Tính toán và hiển thị giá tiền */}
                      <div className="form-group mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="giaTien" className="me-2 giaTien price-value">${room.giaTien} X {night} đêm</label>
                          <p className="form-control-static price-value">{calculateRoomPrice(values, room)} $</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="giaTien" className="me-2 giaTien price-value">Phí vệ sinh</label>
                          <p className="form-control-static price-value">8 $</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="giaTien" className="me-2 giaTien price-total">Tổng tiền</label>
                          <p className="form-control-static price-value">
                            {calculateRoomPrice(values, room) === 0 ? 0 : calculateRoomPrice(values, room) + 8} $
                          </p>
                        </div>
                      </div>


                    </div>

                  </div>
                </div>
              </Form>
            )}
          </Formik>


        </>
      )}
      <hr />
      <div className='binhluan mb-3'>
        <div className='form-binh-luan mb-3'>

          {!user ? (
            <p className="login-message">Cần đăng nhập để bình luận</p>
          ) : (
            <Formik
              initialValues={{ noiDung: '' }}
              validationSchema={validationSchemaBinhLuan}
              onSubmit={handleSubmitBinhLuan}
            >
              <Form>
                <div className="d-flex align-items-center mb-1">
                  <Image src={user.avatar ? user.avatar : "https://airbnbnew.cybersoft.edu.vn/avatar/25-06-2024-05-39-00-avatar-model.png"} alt="Avatar" width={50} height={50} className="rounded-circle me-3" />
                  <h4>{user.name}</h4>
                </div>
                <div className="mb-3">

                  <div className="d-flex">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        onClick={() => setRating(i + 1)}
                        className={`fa fa-star bi-star-fill ${i < rating ? 'text-warning' : ''} cursor-pointer`}
                      ></i>
                    ))}
                  </div>

                </div>
                <div className="mb-3">
                  <Field as="textarea" name="noiDung" className="form-control" placeholder="Nhập nội dung bình luận..." />
                  <ErrorMessage name="noiDung" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Đánh giá
                </button>
              </Form>
            </Formik>
          )}

        </div>
        <hr />
        <div className='danh-sach-binh-luan mb-4'>
          <h5>Bình luận</h5>

          {binhLuanData.length === 0 ? ( // Check if there are no comments
            <p>Chưa có bình luận</p>
          ) : (
            <div className="binh-luan-container">
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {binhLuanData.map((item, index) => (
                  <div key={index} className="col">
                    <div className="card card-binhluan h-100 shadow">
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex align-items-center">
                          <Image src={item.avatar ? item.avatar : "https://airbnbnew.cybersoft.edu.vn/avatar/25-06-2024-05-39-00-avatar-model.png"} alt="Avatar" width={40} height={40} className="rounded-circle me-3 image-avatar-binhluan" />
                          <div>
                            <h6>{item.tenNguoiBinhLuan}</h6>
                            <div className="d-flex">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fa fa-star bi-star-fill ${i < item.saoBinhLuan ? 'text-warning' : ''}`}></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <small className="text-muted mt-2">{calculateTimeAgo(item.ngayBinhLuan)}</small>
                        <p className="card-text flex-grow-1 mt-3">{item.noiDung}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;