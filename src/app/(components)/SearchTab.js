'use client';
import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { getsLocationService } from '../services/locationService';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationsID } from '../redux/reducers/home/locationSlice';
import { setSearch } from '../redux/reducers/home/searchSlice';


const SearchTab = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [checkInDate, setCheckInDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, 'day').format('YYYY-MM-DD'));
    const [guestCount, setGuestCount] = useState(1);
    const [locations, setLocations] = useState([]);

    const { search } = useSelector((state) => state.search)
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchData = async () => {
            await getsLocationService().then((res) => setLocations(res));
          };
          fetchData();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSearch = () => {
        if (selectedLocation) {
            const selectedLocationLatin = selectedLocation
              .normalize('NFD')                // Chuẩn hóa Unicode để tách dấu
              .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tiếng Việt
              .replace(/đ/g, 'd')               // Thay 'đ' thành 'd'
              .replace(/Đ/g, 'D')               // Thay 'Đ' thành 'D'
              .replace(/\s+/g, '-')            // Thay khoảng trắng bằng '-'
              .toLowerCase();                  // Chuyển thành chữ thường
            
            // Dispatch action setSearch với dữ liệu mới
            dispatch(setSearch({
                ...search,
                checkInDate: dayjs(checkInDate).format("YYYY-MM-DD"),
                checkOutDate: dayjs(checkOutDate).format("YYYY-MM-DD"),
                soLuongKhach: guestCount,
            }));
            router.push(`/rooms/${selectedLocationLatin}`); 

          } else {
            alert('Vui lòng chọn địa điểm trước khi tìm kiếm.');
          }
    };
    const handleGuestCountChange = (increment) => {
        setGuestCount(prevCount => Math.max(1, prevCount + increment)); // Đảm bảo guestCount >= 1
      };
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-around rounded-pill bg-secondary p-2">
                <ul className="nav nav-pills flex-grow-1 d-flex justify-content-around border-0">
                    {/* flex-grow-1 để chia đều không gian */}
                    <li
                className="nav-item flex-fill text-center"
            >
                        <a
                    className={`nav-link custom-tab ${activeTab === 'location' ? 'active' : ''}`}
                    onClick={() => handleTabClick('location')}
                >
                    Địa điểm
                </a>
                
                    </li>

                    <li className="nav-item flex-fill text-center">
                        <a className={`nav-link custom-tab ${activeTab === 'dates' ? 'active' : ''}`} onClick={() => handleTabClick('dates')}>
                            Thời gian
                        </a>
                    </li>

                    <li className="nav-item flex-fill text-center">
                        <a className={`nav-link custom-tab ${activeTab === 'guests' ? 'active' : ''}`} onClick={() => handleTabClick('guests')}>
                            Thêm khách
                        </a>
                    </li>

                    <li className='nav-item flex-fill text-center'>
                        <button
                            className="btn btn-search rounded rounded-circle"
                            onClick={handleSearch}
                        >
                            <i className="fa fa-search-location"></i>
                        </button>
                    </li>

                </ul>
            </div>

            <div className="tab-content  mt-3">
            {activeTab === 'location' && (
                    <div className="tab-pane tab-content-locations active">
                        <div className="row">
                            {locations?.map((location, index) => (
                                <div key={index} className="col-6 col-md-4 mb-3"> {/* Điều chỉnh kích thước cột */}
                                    <div
                                        className="card location-item"
                                        onClick={() => {
                                            setSelectedLocation(location.tinhThanh);
                                            dispatch(setLocationsID(location));
                                        }}
                                    >
                                        <Image
                                            src={location.hinhAnh}
                                            alt={location.tinhThanh}
                                            className="card-img-top location-image"
                                            width={200} 
                                            height={300}
                                        />
                                        <div className="card-body">
                                            <p className="card-text location-name">{location.tinhThanh}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'dates' && (
                    <div className="tab-pane tab-content-date active">
                        <div className='row'>
                        <div className="form-group col-6">
                            <label htmlFor="checkInDate">Nhận phòng:</label>
                            <input type="date" className="form-control" id="checkInDate" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="checkOutDate">Trả
                                phòng:</label>
                            <input type="date" className="form-control" id="checkOutDate" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                        </div>
                        </div>
                    </div>
                )}
                {activeTab === 'guests' && (
        <div className="tab-pane tab-content-guest active">
          <div className="form-group d-flex align-items-center">
            <label htmlFor="guestCount" className="me-2">Số lượng khách:</label>
            <div className="input-group w-50">
              <button 
                className="btn btn-header-guest-count" 
                type="button" 
                onClick={() => handleGuestCountChange(-1)}
                disabled={guestCount === 1} // Vô hiệu hóa nút giảm khi guestCount = 1
              >
                <i className="fa fa-minus"></i>
              </button>
              <input 
                type="number" 
                className="form-control text-center" 
                id="guestCount" 
                value={guestCount} 
                readOnly // Chỉ cho phép thay đổi thông qua nút
              />
              <button 
                className="btn btn-header-guest-count" 
                type="button" 
                onClick={() => handleGuestCountChange(1)}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      )}
            </div>
        </div>
    )
}

export default SearchTab