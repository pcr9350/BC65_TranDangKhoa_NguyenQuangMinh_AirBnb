'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { storeAdmin } from '../redux/storeAdmin'
import Link from 'next/link';
const AdminTemplate = (props) => {
  const links = [
    { text: 'Users', href: '/admin/users' },
    { text: 'Vị Trí', href: '/admin/places' },
    { text: 'Rooms', href: '/admin/rooms' },
    { text: 'Book Room', href: '/admin/book-room' },
  ];
  return (
    <Provider store={storeAdmin}>
    <div className='d-flex' style={{minHeight:'100vh'}}>
    <div className="sidebar w-25 bg-dark text-white p-3 d-flex flex-column"> 
          <h4 className="text-center mb-4">Dashboard</h4> {/* Đưa tiêu đề lên trên cùng */}
          <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1"> {/* Phần này giúp các liên kết nằm giữa */}
            <ul className="list-unstyled">
              {links.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link href={link.href} className="text-white text-decoration-none btn btn-dark">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
            <div className='content w-75 h-100 p-4'>
                {props.children}
            </div>
        </div>
        </Provider>
  )
}

export default AdminTemplate