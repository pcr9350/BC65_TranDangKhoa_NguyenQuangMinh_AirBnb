"use client"
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getLocationService } from '../services/locationService';
import { useDispatch } from 'react-redux';
import { setLocationsID } from '../redux/reducers/home/locationSlice';
import { Spinner } from 'react-bootstrap'; // Import Spinner
const HomeBottom = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCardClick = async (locationId, destination) => {
    setIsLoading(true); // Bắt đầu loading khi click vào card
    try {
        const data = await getLocationService(locationId);
        dispatch(setLocationsID(data));
        router.push(`/rooms/${destination}`);
    } catch (error) {
        console.error("Error fetching location data:", error);
    } finally {
        setIsLoading(false); // Kết thúc loading sau khi fetch xong hoặc có lỗi
    }
};
  return (
    <div className="container mt-4 mb-4">
      <h4 className='mb-4'>Ở bất cứ đâu</h4>
        <div className="row">
        {isLoading && ( // Hiển thị Spinner nếu đang loading
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>   

                        </Spinner>
                    </div>
                )}
{!isLoading && ( // Hiển thị các card nếu không loading
                    <>
          {/* Card 1 */}
          <div className="col-6 col-md-3 mb-4">
            <div className="card card-home shadow-sm h-100" onClick={() => handleCardClick("1", "ho-chi-minh")}>
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
            <div className="card card-home shadow-sm h-100" onClick={() => handleCardClick("2", "can-tho")}>
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
            <div className="card card-home shadow-sm h-100" onClick={() => handleCardClick("3", "nha-trang")}>
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
            <div className="card card-home shadow-sm h-100" onClick={() => handleCardClick("5", "phu-quoc")}>
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
            </>
                )}
        </div>
      </div>
  )
}

export default HomeBottom