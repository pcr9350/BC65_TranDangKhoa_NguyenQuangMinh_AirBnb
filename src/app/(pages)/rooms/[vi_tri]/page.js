'use client'
import SearchTab from '@/app/(components)/SearchTab';
import { setSearch } from '@/app/redux/reducers/home/searchSlice';
import { getRoomByLocationService } from '@/app/services/roomService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//import thư viện google map
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ViTri = (props) => {
  const router = useRouter();
  const { locations } = useSelector((state) => state.locations);
  const { search } = useSelector((state) => state.search);
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      if (locations.id) { // Kiểm tra locations.id trước khi gọi API
        const res = await getRoomByLocationService(locations.id);
        setRooms(res);
      }
    };
    fetchData();
  }, [locations.id]);
  let soLuongPhong = rooms.length;

  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const toggleFavorite = (roomId) => {
    setFavoriteRooms(prevFavorites => {
      if (prevFavorites.includes(roomId)) {
        return prevFavorites.filter(id => id !== roomId);
      } else {
        return [...prevFavorites, roomId];
      }
    });
  };

// xử lý google maps
// const [map, setMap] = useState(null);
//   const googleMapRef = useRef();

//   useEffect(() => {
//     const googleMapScript = document.createElement('script');
//     googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBEJFAqiOz1jmwhZIWbxe1ozz95X1UQDOA&libraries=places`; 
//     window.document.head.appendChild(googleMapScript);   


//     googleMapScript.addEventListener('load', () => {
//       if (window.google && window.google.maps) {
//         const geocoder = new window.google.maps.Geocoder();
//         geocoder.geocode({ address: locations.tinhThanh }, (results, status) => {
//           if (status === "OK" && results[0]) {
//             const { lat, lng } = results[0].geometry.location;
//             setMap({ lat, lng }); // Lưu ý không gọi lat() và lng()
//             const map = new window.google.maps.Map(googleMapRef.current, {
//               center: { lat, lng },
//               zoom: 8, // Tùy chọn mức zoom bạn muốn
//             });
//             new window.google.maps.Marker({ // Thêm marker cho vị trí tìm được
//               map,
//               position: { lat, lng },
//             });
//           }
//         });
//       }
//     });
//   }, [locations.tinhThanh]);


  return (
    <div className="container mt-4">
      <SearchTab />
      <h4>Có {soLuongPhong} chỗ ở tại {locations.tinhThanh}</h4> {/* Hiển thị tổng số lượng phòng */}
      <h2>Chỗ ở tại khu vực bản đồ đã chọn</h2>
      <div className="row">

        <div className="col-md-6 d-flex flex-wrap">
          {rooms.map((room) => (
            <div key={room.id} className="card room-card mb-3 shadow-sm position-relative" onClick={() => {
              dispatch(setSearch({
                ...search,
                roomID: room.id,
              }))
              router.push(`/room-detail/${room.id}`)
            }}> {/* Thêm shadow và position-relative */}
              <div className="row g-0 h-100">
                <div className="col-md-6">
                  <div className="room-card-image-wrapper"> {/* Thêm wrapper cho ảnh */}
                    <Image
                      src={room.hinhAnh}
                      alt={room.tenPhong}
                      width={500}
                      height={300}

                      objectFit="cover" // Giữ tỉ lệ ảnh và cắt bớt phần thừa
                      className="img-fluid rounded-start room-card-image"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h6 className="card-title">{room.tenPhong}</h6>
                    <hr />
                    <p className="card-text">
                      {room.khach} khách - {room.phongNgu} phòng ngủ - {room.giuong} giường - {room.phongTam} phòng tắm
                    </p>
                    <p className="card-text">
                      {room.wifi && 'Wifi - '}
                      {room.mayGiat && 'Máy giặt - '}
                      {room.banLa && 'Bàn là - '}
                      {room.tivi && 'Tivi - '}
                      {room.dieuHoa && 'Điều hòa - '}
                      {room.bep && 'Bếp - '}
                      {room.doXe && 'Đậu xe - '}
                      {room.hoBoi && 'Hồ bơi - '}
                      {room.banUi && 'Bàn ủi'}
                    </p>
                    <p className="card-text">
                      <strong>Giá tiền:</strong> {room.giaTien}$/đêm
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="position-absolute top-0 end-0 m-2" // Vị trí cho trái tim
                onClick={() => toggleFavorite(room.id)} // Thêm sự kiện click
                style={{ cursor: 'pointer' }} // Thay đổi con trỏ khi hover
              >
                {favoriteRooms.includes(room.id) ? (
                  <i className="fa fa-hand-holding-heart text-danger"></i>
                ) : (
                  <i className="fa fa-heart text-danger"></i>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          {/* Chèn code Google Maps vào đây */}
          {/* {map && (
        <div ref={googleMapRef} style={{ width: '100%', height: '500px' }} />
      )} */}
        </div>
      </div>
    </div>
  )
}
export default ViTri