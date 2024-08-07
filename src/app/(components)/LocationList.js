'use client'
import React, { useEffect, useState } from 'react'
import { getsLocationService } from '../services/locationService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setLocationsID } from '../redux/reducers/home/locationSlice';
import { useDispatch } from 'react-redux';

const LocationList = () => {
    const [locationsList, setLocationsList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const locationsPerPage = 8;
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getsLocationService();
            setLocationsList(res);
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        };
        fetchData();
      }, []);
      
    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations
        = locationsList.slice(
            indexOfFirstLocation,
            indexOfLastLocation
        );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-4">
    <h4>Khám phá những điểm đến gần đây</h4>
    <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {currentLocations.map((location, index) => (
        <div key={index} className="col d-flex">
          <button 
            className="btn btn-light rounded-4 d-flex align-items-center shadow p-4 flex-grow-1 position-relative overflow-hidden" // Added rounded-4, shadow, p-4
            style={{
              transition: "transform 0.2s ease",
              justifyContent: "flex-start"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.querySelector('.hover-shadow').style.opacity = 1; // Show shadow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.querySelector('.hover-shadow').style.opacity = 0; // Hide shadow
            }}
            onClick={() => {
              const selectedLocationLatin = location.tinhThanh
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
                .replace(/\s+/g, '-')
                .toLowerCase();
              dispatch(setLocationsID(location));
              router.push(`/rooms/${selectedLocationLatin}`); // Chuyển trang
            }}
          >
            <div className="hover-shadow position-absolute top-0 start-0 w-100 h-100 rounded-4" 
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent black shadow
                transition: "opacity 0.2s ease",
                opacity: 0
              }}
            ></div> {/* Shadow element */}

            <Image
              src={location.hinhAnh}
              alt={location.tinhThanh}
              width={80}
              height={80}
              className="rounded me-3 location-image"
            />
            <div>
              <h6 className="mb-1 text-dark">
                {location.tinhThanh}
              </h6>
            </div>
          </button>
        </div>
      ))}
    </div>

          {/* Pagination Controls */}
          <nav className="mt-4">
              <ul className="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(locationsList.length / locationsPerPage) }).map(
                      (_, index) => (
                          <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => paginate(index + 1)}>
                                  {index + 1}
                              </button>

                          </li>
                      )
                  )}
              </ul>
          </nav>
      </div>

  )
}

export default LocationList