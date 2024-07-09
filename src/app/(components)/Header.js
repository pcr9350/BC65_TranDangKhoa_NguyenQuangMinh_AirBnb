'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa";

const Header = () => {

  // set fixed-top nav-bar
  const [isFixed, setIsFixed] = useState(false);
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  return (
    <nav className={`navbar navbar-customize navbar-expand-md navbar-light ${isFixed ? "fixed-top" : ""
      }`}>
      <div className="container-fluid">
        <div className="d-flex align-items-center mx-4">
          <i className="fab fa-airbnb fs-2 navbar-logo"></i>
          <Link className="brand-header navbar-brand fs-2 fw-bold mx-2" href="/">AirBnb</Link>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          
          <FaBars className='text-white' /> {/* Use the bars icon for the toggle */}
        </button>
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbarSupportedContent" style={{
            position: isMobileMenuOpen ? 'absolute' : '',
            top: 50,
            left: 0,
            backgroundColor: isMobileMenuOpen ? '#505763' : '',
            width: '100%',
            zIndex: 1000
          }}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item mx-3">
              <Link className="nav-link nav-link-header text-center active" aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link nav-link-header text-center" href="/">About</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link nav-link-header text-center" href="/">Services</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link nav-link-header text-center" href="/">Pricing</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link nav-link-header text-center" href="/">Contact</Link>
            </li>

          </ul>

          <ul className="navbar-nav d-flex justify-content-end mx-3">
            <li className="nav-item dropstart text-end">
              <button className="btn border-0" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-user-circle fs-1 user-button "></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-light dropdown-menu-down dropdown-menu-sm dropdown-menu-lg-start">
                <li className='text-end text-md-start'><Link className="dropdown-item" href="/">Đăng nhập</Link></li>
                <li className='text-end text-md-start'><Link className="dropdown-item" href="/">Đăng ký</Link></li>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>

  );
};

export default Header;