'use client'
// components/BackToTopButton.js
import React, { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) { // Hiển thị khi cuộn qua 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Cuộn mượt
    });
  };

  return (
    <button
      className={`back-to-top fs-2 ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      {/* Thêm biểu tượng hoặc chữ "Lên đầu trang" ở đây */}
      <i className="fa fa-arrow-alt-circle-up"></i>
    </button>
  );
};

export default BackToTopButton;