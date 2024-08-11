import Image from 'next/image';
import React from 'react'
import { Carousel } from 'react-responsive-carousel';

const HomeCarousel = () => {

  return (
    <div className='carousel-container'>

      <div className="video-wrapper">
        <video width="100%" autoPlay muted loop playsInline>
          <source src="/intro2.mp4" type="video/mp4" />
        </video>

        <div className="carousel-container-hero-wrapper">
          <Image
            src="/swoosh-hero.png"
            alt="Swoosh Hero" // Đặt alt mô tả rõ nội dung ảnh
            width={1400}
            height={50}
            priority
            className="carousel-container-hero" // Di chuyển className xuống dưới 
            quality={85}
          />
        </div>
      </div>

    </div>

  )
}

export default HomeCarousel