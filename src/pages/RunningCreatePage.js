import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import DaumPostcode from "react-daum-postcode";
import Modal from 'react-modal';
import '../css/Running/RunningCreatePage.css';
import '../css/Common.css';

Modal.setAppElement('#root');

const App = () => {
  const [step, setStep] = useState(1); // 현재 단계
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [distance, setDistance] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [startDetailLocation, setStartDetailLocation] = useState('');
  const [finishLocation, setFinishLocation] = useState('');
  const [finishDetailLocation, setFinishDetailLocation] = useState('');
  const [limitedPeople, setLimitedPeople] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addressType, setAddressType] = useState(''); // 추가: 주소 타입 구분용 상태



  const navigate = useNavigate();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleAddressComplete = (data) => {
    if(addressType === 'start') {
      setStartLocation(data.address);
    }else if(addressType === 'finish') {
      setFinishLocation(data.address);
    }
    closeModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post('/api/runnings/create', {
        title,
        content,
        distance,
        startLocation,
        startDetailLocation,
        finishLocation,
        finishDetailLocation,
        limitedPeople,
        date,
        time
      });

      if (response.status === 200) {
        setMessage(response.data);
        alert('즐거운 런닝되세요~');
        navigate('/');
      }
    } catch (error) {
      setMessage(error.response.data.errorMessage);
      alert(error.response.data.errorMessage);
    }
  };

  const openModal = (type) => {
    setModalIsOpen(true);
    setAddressType(type);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h2 className='header-main clickable-text' onClick={() => navigate("/")}>RUNNING CREW</h2>
        <h2 className='header-sub'>런닝 만들기</h2>
      </div>

      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <div className='card-write'>
            <div className='title-w'>
              <label>제목 :</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요."
              />
            </div>

            <div className='content-w'>
              <label>내용 :</label>
              <textarea
                placeholder='경로설명, 소개 등등 내용을 입력해주세요.'
                className='content-input'
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <button type="button" onClick={handleNext}>다음</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div className='card-write'>
            <div>
              <label>거리:</label>
              <input
                className='distance-input'
                placeholder='소숫점 숫자를 입력해주세요. (단위 km)'
                type="number"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>

            <div>
              <label>시작지점:</label>
              <input
                type="text"
                value={startLocation}
                onClick={() => openModal('start')}
                onChange={(e) => setStartLocation(e.target.value)}
              />
            </div>

            <div>
              <label className='detail-address'>상세주소 :</label>
              <input
                type="text"
                value={startDetailLocation}
                onChange={(e) => setStartDetailLocation(e.target.value)}
              />
            </div>

            <div>
              <label>도착지점:</label>
              <input
                type="text"
                onClick={() => openModal('finish')}
                value={finishLocation}
                onChange={(e) => setFinishLocation(e.target.value)}
              />
            </div>

            <div>
              <label className='detail-address'>상세주소 :</label>
              <input
                type="text"
                value={finishDetailLocation}
                onChange={(e) => setFinishDetailLocation(e.target.value)}
              />
            </div>
          </div>
          <button type="button" onClick={handlePrevious}>이전</button>
          <button type="button" onClick={handleNext}>다음</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <div className='card-write'>
            <div>
              <label>제한인원 :</label>
              <input
                className='distance-input'
                placeholder='인원을 입력해주세요.'
                type="number"
                step="0"
                value={limitedPeople}
                onChange={(e) => setLimitedPeople(e.target.value)}
              />
            </div>

            <div>
              <label>날짜 :</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
          <label>시간 :</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

          </div>

          <button type="button" onClick={handlePrevious}>이전</button>
          <button type="submit">완료</button>
        </form>
      )}

      <p>{message}</p>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="주소 검색"
      >
        <h2>주소 검색</h2>
        <DaumPostcode onComplete={handleAddressComplete}/>

        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};

export default App;
