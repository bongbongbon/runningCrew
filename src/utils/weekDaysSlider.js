import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/WeekDaysSlider.css';

const WeekDays = () => {
  const currentDate = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const daysToShow = 14; // 14일 동안 보여줍니다

  const days = [];
  for (let i = 0; i < daysToShow; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);

    const formattedDate = `${date.getDate()}`;
    const dayOfWeek = week[date.getDay()];



    days.push(
      <div key={i} className="dateWrap isSun clickable-text">
        <p>{formattedDate}</p>
        <span>{dayOfWeek}</span>
      </div>
    );
  }


  // 캐러셀 동작을 구성하기 위한 설정 객체
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // 동시에 보여질 슬라이드 개수
    slidesToScroll: 7, // 한 번에 스크롤할 슬라이드 개수
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}> {/* 설정된 캐러셀 옵션을 전달 */}
        {days}
      </Slider>
    </div>
  );
};

export default WeekDays;
