"use client"
import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getLocationService } from '../services/locationService';
import { useDispatch } from 'react-redux';
import { setLocationsID } from '../redux/reducers/home/locationSlice';
const HomeBottom = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="container mt-4 mb-4">
      <h4 className='mb-4'>Ở bất cứ đâu</h4>
        <div className="row">
          {/* Card 1 */}
          <div className="col-6 col-md-3 mb-4">
            <div className="card card-home shadow-sm h-100" onClick={async () => {
              try {
                const data = await getLocationService("1");
                dispatch(setLocationsID(data));
                router.push("/rooms/ho-chi-minh")
                }
               catch (error) {
                // Xử lý lỗi nếu có (ví dụ: hiển thị thông báo lỗi cho người dùng)
                console.error("Error fetching location data:", error);
              }
            }}>
                <Image 
                src="/hinh1.webp" // Đường dẫn hình ảnh trong thư mục public
                alt="Card image 1"
                width={400} // Điều chỉnh kích thước theo nhu cầu
                height={250}
                className="card-img-top"
              />
              <div className="card-body">
                <h6 className="card-title">Toàn bộ nhà</h6>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-6 col-md-3 mb-4">
            <div className="card card-home shadow-sm h-100" onClick={ async () => {
              try {
                const data = await getLocationService("2");
                dispatch(setLocationsID(data));
                router.push("/rooms/can-tho")
                }
               catch (error) {
                // Xử lý lỗi nếu có (ví dụ: hiển thị thông báo lỗi cho người dùng)
                console.error("Error fetching location data:", error);
              }
            }}>
                <Image 
                src="/hinh2.webp" // Đường dẫn hình ảnh trong thư mục public
                alt="Card image 2"
                width={400} // Điều chỉnh kích thước theo nhu cầu
                height={250}
                className="card-img-top"
              />
              <div className="card-body">
                <h6 className="card-title">Chỗ ở độc đáo</h6>
              </div>
              </div>
          </div>
           {/* Card 3 */}
           <div className="col-6 col-md-3 mb-4">
            <div className="card card-home shadow-sm h-100" onClick={async () => {
              try {
                const data = await getLocationService("3");
                dispatch(setLocationsID(data));
                router.push("/rooms/nha-trang")
                }
               catch (error) {
                // Xử lý lỗi nếu có (ví dụ: hiển thị thông báo lỗi cho người dùng)
                console.error("Error fetching location data:", error);
              }
            }}>
                <Image 
                src="/hinh3.webp" // Đường dẫn hình ảnh trong thư mục public
                alt="Card image 3"
                width={400} // Điều chỉnh kích thước theo nhu cầu
                height={250}
                className="card-img-top"
              />
              <div className="card-body">
                <h6 className="card-title">Trang trại và thiên nhiên</h6>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="col-6 col-md-3 mb-4">
            <div className="card card-home shadow-sm h-100" onClick={async () => {
              try {
                const data = await getLocationService("5");
                dispatch(setLocationsID(data));
                router.push("/rooms/phu-quoc")
                }
               catch (error) {
                // Xử lý lỗi nếu có (ví dụ: hiển thị thông báo lỗi cho người dùng)
                console.error("Error fetching location data:", error);
              }
            }}>
                <Image 
                src="/hinh4.webp" // Đường dẫn hình ảnh trong thư mục public
                alt="Card image 4"
                width={400} // Điều chỉnh kích thước theo nhu cầu
                height={250}
                className="card-img-top"
              />
              <div className="card-body">
                <h6 className="card-title">Cho phép mang theo thú cưng</h6>
              </div>
            </div>
          </div> 
          
        </div>
      </div>
  )
}

export default HomeBottom