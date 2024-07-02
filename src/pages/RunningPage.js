import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import '../css/Running/RunningPage.css'; // 스타일 파일을 임포트
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/WeekDaysSlider.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


const RunningList = () => {
  const [runnings, setRunnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getKoreanDate()); // 초기 날짜 설정
  const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달 변수 설정
  const [modalType, setModalType] = useState('');
  const [selectedStartLocation, setSelectedStartLocation] = useState('');
  // const [selectedFinishLocation, setSelectedFinishLocation] = useState('');
  const [distance, setDistance] = useState({ min: '', max: ''});


  const navigate = useNavigate();



  console.log(selectedStartLocation);
  const currentDate = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const daysToShow = 14; // 14일 동안 보여줍니다

  const days = [];
  for (let i = 0; i < daysToShow; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);

    const formattedViewDate = `${date.getDate()}`;
    const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    const dayOfWeek = week[date.getDay()];

    days.push(
      <div key={i} className="dateWrap isSun clickable-text" onClick={() => handleDateClick(formattedDate)}>
        <p>{formattedViewDate}</p>
        <span>{dayOfWeek}</span>
      </div>
    );
  }


  const openModal = (type) => {
    setModalIsOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType('');
  };


  function getKoreanDate() {
    // 한국 표준시를 기준으로 현재 시간을 가져옵니다.
    const now = new Date();

    // 한국 시간대의 형식을 지정합니다.
    const options = {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    // 한국 시간대로 포맷된 날짜를 가져옵니다.
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    const formattedDateParts = formatter.formatToParts(now);

    // 각 부분을 추출합니다.
    const year = formattedDateParts.find(part => part.type === 'year').value;
    const month = formattedDateParts.find(part => part.type === 'month').value;
    const day = formattedDateParts.find(part => part.type === 'day').value;

    // yyyy-mm-dd 형식으로 문자열을 반환합니다.
    return `${year}-${month}-${day}`;
}

  const handleDateClick = (date) => {
    setSelectedDate(date);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
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

  useEffect(() => {
    console.log(selectedDate);
    const fetchRunnings = async () => {
      try {
        const response = await axiosInstance.get('/api/runnings/get', {
          params: {
            date: selectedDate, // 선택된 날짜로 API 호출
            startLocation: selectedStartLocation,
            minDistance: distance.min,
            maxDistance: distance.max,
          },
        });
        setRunnings(response.data.data || []); // 데이터를 설정하고, 없으면 빈 배열로 초기화
      } catch (error) {
        console.error('Error fetching boards:', error);
        setError('게시판 목록을 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRunnings();
  }, [selectedDate, selectedStartLocation, distance]);


  const navigateToDetail = (id) => {
    navigate(`/running/detail/${id}`);
  };

  // 필터 모달창
  const renderModalContent = () => {
    switch(modalType) {
      case 'startLocation':
        return (
          <div>
            <h2>시작 지역 선택</h2>
            <ul className='filter--list'>
              <li className='filter--list--item' onClick={() => {setSelectedStartLocation(''); closeModal(); }}>
                <p>모든시작지역</p>
              </li>
              <li className='filter--list--item' onClick={() => {setSelectedStartLocation('서울'); closeModal(); }}>
                <p>서울</p>
              </li>
              <li className='filter--list--item' onClick={() => {setSelectedStartLocation('전남'); closeModal(); }}>
                <p>전남</p>
              </li>
            </ul>
          </div>
        );
      case 'distance':
        return (
          <div>
          <h2>거리 선택</h2>
          <ul className='filter--list'>
            <li className='filter--list--item' onClick={() => {setDistance({min: '', max: ''}); closeModal(); }}>
              <p>모든거리</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 0, max: 1}); closeModal(); }}>
                <p>1km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 1, max: 1.5}); closeModal(); }}>
              <p>1km ~ 1.5km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 1.5, max: 2}); closeModal(); }}>
              <p>1.5km ~ 2.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 2, max: 2.5}); closeModal(); }}>
              <p>2.0km ~ 2.5km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 2.5, max: 3}); closeModal(); }}>
              <p>2.5km ~ 3.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 3, max: 3.5}); closeModal(); }}>
              <p>3.0km ~ 3.5km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 3.5, max: 4}); closeModal(); }}>
              <p>3.5km ~ 4.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 4, max: 4.5}); closeModal(); }}>
              <p>4.0km ~ 4.5km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 4.5, max: 5}); closeModal(); }}>
              <p>4.5km ~ 5.0km 미만</p>
            </li>
            <p>5km 이상</p>
            <li className='filter--list--item' onClick={() => {setDistance({min: 5, max: 6}); closeModal(); }}>
              <p>5.0km ~ 6.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 6, max: 7}); closeModal(); }}>
              <p>6.0km ~ 7.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 7, max: 8}); closeModal(); }}>
              <p>7.0km ~ 8.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 8, max: 9}); closeModal(); }}>
              <p>8.0km ~ 9.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 9, max: 10}); closeModal(); }}>
              <p>9.0km ~ 10.0km 미만</p>
            </li>
            <p>10.0km 이상</p>
            <li className='filter--list--item' onClick={() => {setDistance({min: 10, max: 15}); closeModal(); }}>
              <p>10.0km ~ 15.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 15, max: 20}); closeModal(); }}>
              <p>15.0km ~ 20.0km 미만</p>
            </li>
            <li className='filter--list--item' onClick={() => {setDistance({min: 20, max: 100}); closeModal(); }}>
              <p>20.0km 이상</p>
            </li>
          </ul>
        </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }



  return (
    <div>
      <Slider {...settings}>
        {days}
      </Slider>
      <div className='main__filter'>
        <div className='filter--wrapper'>
          <ul>
            <li className='clickable-text' onClick={() => openModal('startLocation')}>
              <span>{selectedStartLocation === '' ? '모든시작지역' :  selectedStartLocation}</span>
            </li>
            
            <li className='clickable-text' onClick={() => openModal('distance')}>
              <span>{distance.min === '' ? '모든거리' : distance.min + 'km ~ ' + distance.max + 'km 미만'} </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        {runnings.length === 0 ? (
          <div className='no-data-message'><p>런닝이 없습니다.</p></div>
        ):(
          <ul className="running-list">
            {runnings.map((running) => (
              <li key={running.id} className="running-item clickable" onClick={() => navigateToDetail(running.id)}>
                <div className="running-item__time">
                  <p>{running.time}</p>
                </div>
                <div className="running-item__info">
                  <h3>{running.title}</h3>
                  <p>{running.content}</p>
                  <div className="item-details">
                    <p>제한 인원: {running.limitedPeople}명</p>
                    <p>시작 위치: {running.startLocation}</p>
                    <p>도착 위치: {running.finishLocation}</p>
                    <p>거리: {running.distance}km</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          {renderModalContent()}
          <button onClick={closeModal}>닫기</button>
        </Modal>
      </div>
    </div>
  );
};

export default RunningList;
