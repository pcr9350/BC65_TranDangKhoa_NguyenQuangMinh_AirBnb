'use client'
import SearchTab from '@/app/(components)/SearchTab'
import { getsRoomService } from '@/app/services/roomService';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import { setSearch } from '@/app/redux/reducers/home/searchSlice';
import { Spinner, Pagination } from 'react-bootstrap';

const Allrooms = () => {
  const { search } = useSelector((state) => state.search)
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const
    roomsPerPage = 9; // Số lượng phòng trên mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getsRoomService().then((res) => setRooms(res));
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const soLuongPhong = rooms.length;

  // Logic phân trang
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);


  const paginate
    = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <SearchTab />
      <div className="container mt-4">
        <h4>Có {soLuongPhong} chỗ ở phù hợp với bạn</h4>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>

            </Spinner>
          </div>
        ) : (
          <>
            <div className="row">
              {currentRooms.map((room, index) => (
                <div
                  key={index}
                  className="col-md-4 col-sm-6 mb-4 position-relative rooms-card"
                  onClick={() => {
                    dispatch(setSearch({
                      ...search,
                      roomID: room.id
                    }));
                    router.push(`/room-detail/${room.id}`)
                  }}
                >
                  <div className="card h-100 shadow-sm hover-zoom">
                    <Image
                      src={room.hinhAnh}
                      alt={room.tenPhong}
                      className="card-img-top"
                      width={200}
                      height={200}
                      layout="responsive"
                      objectFit="cover"
                    />
                    <div className="card-img-overlay d-flex justify-content-between align-items-start">
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

            {/* Hiển thị phân trang nếu có nhiều hơn 1 trang */}
            {Math.ceil(soLuongPhong / roomsPerPage) > 1 && (
              <div className="d-flex justify-content-center"> {/* Thêm div để căn giữa */}
                <Pagination>
                  {[...Array(Math.ceil(soLuongPhong / roomsPerPage)).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                      {number + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>

              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Allrooms 