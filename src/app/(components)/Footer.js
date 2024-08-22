'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdPerson } from "react-icons/md";

const Footer = () => {
  const [showFixedFooter, setShowFixedFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra nếu người dùng đã cuộn đến cuối trang
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setShowFixedFooter(true); 
      } else {
        setShowFixedFooter(false); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <footer className="container-fluid home-footer">
        <div className='row'>
          <div className='col-12 col-md-6 col-lg-3 mt-4'>
            <h5>GIỚI THIỆU</h5>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>Phương thức hoạt động của airbnb</Link>
            <Link href={'https://news.airbnb.com/'} className='home-footer-link'>Trang tin tức</Link>
            <Link href={'https://investors.airbnb.com/home/default.aspx'} className='home-footer-link'>Nhà đầu tư</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>AirBnb Plus</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>AirBnb Luxe</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>HotelTonight</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>AirBnb for Work</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>Nhờ có host, mọi điều đều có thể</Link>
            <Link href={'https://careers.airbnb.com/'} className='home-footer-link'>Cơ hội nghề nghiệp</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>Thơ của nhà sáng lập</Link>
          </div>
          <div className='col-12 col-md-6 col-lg-3 mt-4'>
            <h5>CỘNG ĐỒNG</h5>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>Sự đa dạng và cảm giác thân thuộc</Link>
            <Link href={'https://www.airbnb.com.vn/accessibility'} className='home-footer-link'>Tiện nghi phù hợp cho người khuyết tật</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>Đối tác liên kết AirBnb</Link>
            <Link href={'https://www.airbnb.org/?locale=vi'} className='home-footer-link'>Chỗ ở cho tuyến đầu</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>Lượt giới thiệu của khách</Link>
            <Link href={'https://www.airbnb.com.vn/'} className='home-footer-link'>Airbnb.org</Link>
          </div>
          <div className='col-12 col-md-6 col-lg-3 mt-4'>
            <h5>ĐÓN TIẾP KHÁCH</h5>
            <Link href={'https://www.airbnb.com.vn/host/homes?from_footer=1'} className='home-footer-link'>Cho thuê nhà</Link>
            <Link href={'https://www.airbnb.com.vn/host/homes?from_footer=1'} className='home-footer-link'>Tổ chức trải nghiệm trực tuyến</Link>
            <Link href={'https://www.airbnb.com.vn/host/homes?from_footer=1'} className='home-footer-link'>Tổ chức trải nghiệm</Link>
            <Link href={'https://www.airbnb.com.vn/help/article/1397'} className='home-footer-link'>Đón tiếp khách có trách nhiệm</Link>
            <Link href={'https://www.airbnb.com.vn/resources/hosting-homes'} className='home-footer-link'>Trung tâm tài nguyên</Link>
            <Link href={'https://community.withairbnb.com/t5/Community-Center/ct-p/community-center'} className='home-footer-link'>Trung tâm cộng đồng</Link>
          </div>
          <div className='col-12 col-md-6 col-lg-3 mt-4'>
            <h5>HỖ TRỢ</h5>
            <Link href={'https://www.airbnb.com.vn/help/article/3218'} className='home-footer-link'>Biện pháp ứng phó đại dịch COVID-19</Link>
            <Link href={'https://www.airbnb.com.vn/help'} className='home-footer-link'>Trung tâm trợ giúp</Link>
            <Link href={'https://www.airbnb.com.vn/help/article/1320'} className='home-footer-link'>Các tùy chọn hủy</Link>
            <Link href={'https://www.airbnb.com.vn/help/article/3290'} className='home-footer-link'>Hỗ trợ khu dân cư</Link>
            <Link href={'https://www.airbnb.com.vn/aircover-for-hosts'} className='home-footer-link'>Tin cậy và an toàn</Link>
          </div>
        </div>
        <hr />
      <div className={`row ${showFixedFooter ?  '' : 'fixed-bottom-footer'}`}>
        <div className='col-12 col-lg-5'>
          <ul className="list-inline text-start text-xl-center">
            <li className="list-inline-item"><i className="fa fa-copyright"></i> 2022 Airbnb, Inc</li>
            <li className="list-inline-item mx-2"><Link href={'https://www.airbnb.com.vn/help/article/2855'} className='home-footer-link'>Quyền riêng tư</Link></li>
            <li className="list-inline-item mx-2"><Link href={'https://www.airbnb.com.vn/help/article/2908'} className='home-footer-link'>Điều khoản</Link></li>
            <li className="list-inline-item mx-2"><Link href={'https://www.airbnb.com.vn/sitemaps/v2'} className='home-footer-link'>Sơ đồ web</Link></li>
          </ul>

        </div>
        <div className='col-12 col-lg-7'>
          <div className='row'>
              <div className='col-7'>
              <ul className="list-inline text-end">
                <li className="list-inline-item mx-2"> <Link href={'/'} className='home-footer-link'><i className="fa fa-globe"></i> Tiếng Việt (VN)</Link></li>
                <li className="list-inline-item mx-2"><Link href={'/'} className='home-footer-link'>USD</Link></li>
              </ul>
              </div>
              <div className='col-5'>
              <ul className="list-inline text-start">
                <li className="list-inline-item mx-2"> <Link href={'https://www.facebook.com/airbnb'} className='home-footer-social'><i className="fab fa-facebook"></i></Link></li>
                <li className="list-inline-item mx-2"><Link href={'https://x.com/airbnb'} className='home-footer-social'><i className="fab fa-twitter-square"></i></Link></li>
                <li className="list-inline-item mx-2"><Link href={'https://www.instagram.com/airbnb/'} className='home-footer-social'><i className="fab fa-instagram"></i></Link></li>
              </ul>
              </div>
              
          </div>
        
        </div>
      </div>
      <div className={`row`}>
        <div className='col-12 col-lg-5'>
          <ul className="list-inline text-start text-xl-center">
            <li className="list-inline-item"><i className="fa fa-copyright"></i> 2022 Airbnb, Inc</li>
            <li className="list-inline-item mx-2"><Link href={'https://www.airbnb.com.vn/help/article/2855'} className='home-footer-link'>Quyền riêng tư</Link></li>
            <li className="list-inline-item mx-2"><Link href={'https://www.airbnb.com.vn/help/article/2908'} className='home-footer-link'>Điều khoản</Link></li>
            <li className="list-inline-item mx-2"><Link href={'https://www.airbnb.com.vn/sitemaps/v2'} className='home-footer-link'>Sơ đồ web</Link></li>
          </ul>

        </div>
        <div className='col-12 col-lg-7'>
          <div className='row'>
              <div className='col-7'>
              <ul className="list-inline text-end">
                <li className="list-inline-item mx-2"> <Link href={'/'} className='home-footer-link'><i className="fa fa-globe"></i> Tiếng Việt (VN)</Link></li>
                <li className="list-inline-item mx-2"><Link href={'/'} className='home-footer-link'>USD</Link></li>
              </ul>
              </div>
              <div className='col-5'>
              <ul className="list-inline text-start">
                <li className="list-inline-item mx-2"> <Link href={'https://www.facebook.com/airbnb'} className='home-footer-social'><i className="fab fa-facebook"></i></Link></li>
                <li className="list-inline-item mx-2"><Link href={'https://x.com/airbnb'} className='home-footer-social'><i className="fab fa-twitter-square"></i></Link></li>
                <li className="list-inline-item mx-2"><Link href={'https://www.instagram.com/airbnb/'} className='home-footer-social'><i className="fab fa-instagram"></i></Link></li>
              </ul>
              </div>
              
          </div>
        
        </div>
      </div>
              
      </footer>
  )
}

export default Footer