import Image from 'next/image';
import React from 'react'
import { Carousel } from 'react-responsive-carousel';

const HomeCarousel = () => {
    const videos = [
        { url: '/videoIntro.mp4' },
      ];
  return (
    <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        className="carousel-container" 
      >
        {videos.map((video, index) => (
          <div className="video-wrapper" key={index}>
            <video width="100%" autoPlay muted loop playsInline>
              <source src={video.url} type="video/mp4" />
            </video>
            <div className="carousel-container-hero-wrapper"> 
              <Image 
                src="/swoosh-hero.png" 
                className="carousel-container-hero" 
                width={1400} 
                height={50} 
                alt="..." 
              />
            </div>
          </div>
        ))}
      </Carousel>
  )
}

export default HomeCarousel