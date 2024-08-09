'use client'
import SearchTab from '@/app/(components)/SearchTab'
import { getsRoomService } from '@/app/services/roomService';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '@/app/redux/reducers/home/searchSlice';
import { Spinner } from 'react-bootstrap';
const Allrooms = () => {
  const { search } = useSelector((state) => state.search)
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Thêm state loading

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Bắt đầu loading
      try {
        await getsRoomService().then((res) => setRooms(res));
      } catch (error) {
        console.error("Error fetching room data:", error);

      } finally {
        setIsLoading(false); // Kết thúc loading, dù thành công hay thất bại
      }
    };
    fetchData();
  }, []);

  const soLuongPhong = rooms.length;


  return (
    <>
      <SearchTab />
      <div className="container mt-4">
        <h4>Có {soLuongPhong} chỗ ở phù hợp với bạn</h4> {/* Hiển thị tổng số lượng phòng */}
        {isLoading ? ( // Hiển thị Spinner nếu đang loading
          <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>

            </Spinner>
          </div>
        ) : ( // Hiển thị danh sách rooms nếu đã load xong
          <div className="row">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="col-md-4 col-sm-6 mb-4 position-relative rooms-card" // Thêm position-relative cho hiệu ứng hover
                onClick={() => {
                  dispatch(setSearch({
                    ...search, // Lấy tất cả các thuộc tính hiện tại của search
                    roomID: room.id // Cập nhật roomID
                  }));
                  router.push(`/room-detail/${room.id}`)
                }
                } // Chuyển trang khi click

              >
                <div className="card h-100 shadow-sm hover-zoom"> {/* Thêm shadow-sm và hover-zoom */}
                  <Image
                    src={room.hinhAnh}
                    alt={room.tenPhong}
                    className="card-img-top"
                    width={200}
                    height={200}
                    layout="responsive"
                    objectFit="cover"
                  />
                  <div className="card-img-overlay d-flex justify-content-between align-items-start"> {/* Overlay cho biểu tượng */}
                    <span className="badge bg-light text-dark">Yêu thích</span>
                    <i
                      className="fa fa-heart text-black fs-2"
                      style={{
                        opacity: 0.5,
                        textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
                      }}
                    ></i>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{room.tenPhong}</h5>
                    <p className="card-text fw-bold">{room.giaTien}$ đêm</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Allrooms