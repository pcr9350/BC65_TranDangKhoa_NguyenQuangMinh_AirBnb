import Link from 'next/link'
import React from 'react'
import { MdPerson } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="container-fluid home-footer">
        <div className='row'>
          <div className='col-12 col-md-6 col-lg-3 mt-4'>
            <h5>GIỚI THIỆU</h5>
            <Link href={'/'} className='home-footer-link'>Phương thức hoạt động của airbnb</Link>
            <Link href={'/'} className='home-footer-link'>Trang tin tức</Link>
            <Link href={'/'} className='home-footer-link'>Nhà đầu tư</Link>
            <Link href={'/'} className='home-footer-link'>AirBnb Plus</Link>
            <Link href={'/'} className='home-footer-link'>AirBnb Luxe</Link>
            <Link href={'/'} className='home-footer-link'>HotelTonight</Link>
            <Link href={'/'} className='home-footer-link'>AirBnb for Work</Link>
            <Link href={'/'} className='home-footer-link'>Nhờ có host, mọi điều đều có thể</Link>
            <Link href={'/'} className='home-footer-link'>Cơ hội nghề nghiệp</Link>
            <Link href={'/'} className='home-footer-link'>Thơ của nhà sáng lập</Link>
          </div>
          <div className='col-12 col-md-6 col-lg-3 mt-4'>
            <h5>CỘNG ĐỒNG</h5>
            <Link href={'/'} className='home-footer-link'>Sự đa dạng và cảm giác thân thuộc</Link>
            <Link href={'/'} className='home-footer-link'>Tiện nghi phù hợp cho người khuyết tật</Link>
            <Link href={'/'} className='home-footer-link'>Đối tác liên kết AirBnb</Link>
            <Link href={'/'} className='home-footer-link'>Chỗ ở cho tuyến đầu</Link>
            <Link href={'/'} className='home-footer-link'>Lượt giới thiệu của khách</Link>
            <Link href={'/'} className='home-footer-link'>Airbnb.org</Link>
          </div>
          <div className='col-12 col-md-6 col-lg-3 mt-4'>
            <h5>ĐÓN TIẾP KHÁCH</h5>
            <Link href={'/'} className='home-footer-link'>Cho thuê nhà</Link>
            <Link href={'/'} className='home-footer-link'>Tổ chức trải nghiệm trực tuyến</Link>
            <Link href={'/'} className='home-footer-link'>Tổ chức trải nghiệm</Link>
            <Link href={'/'} className='home-footer-link'>Đón tiếp khách có trách nhiệm</Link>
            <Link href={'/'} className='home-footer-link'>Trung tâm tài nguyên</Link>
            <Link href={'/'} className='home-footer-link'>Trung tâm cộng đồng</Link>
          </div>
          <div className='col-12 col-md-6 col-lg-3 mt-4'>
            <h5>HỖ TRỢ</h5>
            <Link href={'/'} className='home-footer-link'>Biện pháp ứng phó đại dịch COVID-19</Link>
            <Link href={'/'} className='home-footer-link'>Trung tâm trợ giúp</Link>
            <Link href={'/'} className='home-footer-link'>Các tùy chọn hủy</Link>
            <Link href={'/'} className='home-footer-link'>Hỗ trợ khu dân cư</Link>
            <Link href={'/'} className='home-footer-link'>Tin cậy và an toàn</Link>
          </div>
        </div>
        <hr />
      <div className='row'>
        <div className='col-12 col-lg-5'>
          <ul className="list-inline text-start text-xl-center">
            <li className="list-inline-item mx-2"><i className="fa fa-copyright"></i> 2022 Airbnb, Inc</li>
            <li className="list-inline-item mx-2"><Link href={'/'} className='home-footer-link'>Quyền riêng tư</Link></li>
            <li className="list-inline-item mx-2"><Link href={'/'} className='home-footer-link'>Điều khoản</Link></li>
            <li className="list-inline-item mx-2"><Link href={'/'} className='home-footer-link'>Sơ đồ web</Link></li>
          </ul>

        </div>
        <div className='col-12 col-lg-7'>
        <ul className="list-inline text-start">
            <li className="list-inline-item mx-2"> <Link href={'/'} className='home-footer-link'><i className="fa fa-globe"></i> Tiếng Việt (VN)</Link></li>
            <li className="list-inline-item mx-2"><Link href={'/'} className='home-footer-link'>USD</Link></li>
            <li className="list-inline-item mx-2">
            <span style={{ textDecoration: 'underline' }}>Triển khai dự án:</span>
            <span className='mx-2'>
            <MdPerson
              className="text-primary mx-1"
            />
            Trần Đăng Khoa
            </span>
            <span>
            <MdPerson
              className="text-primary mx-1"
            />
            Nguyễn Quang Minh
            </span>
            </li>
          </ul>
        </div>
      </div>

      </footer>
  )
}

export default Footer