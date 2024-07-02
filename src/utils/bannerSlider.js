import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/BannerSlider.css'

const BannerSlider = () => {
  const banners = [
    { id: 1, imageUrl: 'https://via.placeholder.com/800x300?text=Banner+1' },
    { id: 2, imageUrl: 'https://via.placeholder.com/800x300?text=Banner+2' },
    { id: 3, imageUrl: 'https://via.placeholder.com/800x300?text=Banner+3' },
    { id: 4, imageUrl: 'https://via.placeholder.com/800x300?text=Banner+4' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {banners.map(banner => (
          <div key={banner.id}>
            <img src={banner.imageUrl} alt={`Banner ${banner.id}`} className="banner-image"/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
