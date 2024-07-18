import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import DaumPostcode from "react-daum-postcode";
import Modal from 'react-modal';
import '../css/Running/RunningCreatePage.css';
import '../css/Common/Common.css';
import Header from '../components/Header';
import NavBar from '../components/NavBar'

Modal.setAppElement('#root');

const CrewCreatePage = () => {
  const [step, setStep] = useState(1); // 현재 단계
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState('');



  const navigate = useNavigate();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('location', location);
    formData.append('bannerImage', bannerImage);

    try {
      const response = await axiosInstance.post('/api/crews/create', formData, {
       headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.status === 200) {
        navigate('/crew');
        setMessage(response.data);
        alert('크루장이 되신걸 축하합니다.');
      }
    } catch (error) {
      setMessage(error.response.data.errorMessage);
      alert(error.response.data.errorMessage);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleFileChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const handleAddressComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ' (' + extraAddress + ')' : '');
    }

    setLocation(fullAddress);
    closeModal(); // 주소 선택 후 모달 닫기
  };

  return (
    <div className='container'>
        <div>
            <Header />
        </div>
        <div>
            <NavBar />
        </div>
    <div className='card'>
      <div className='card-header'>
        <h2 className='header-main clickable-text' onClick={() => navigate("/")}>RUNNING CREW</h2>
        <h2 className='header-sub'>크루 만들기</h2>
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
              <label>활동지역 :</label>
              <input
                type="text"
                value={location}
                onClick={() => openModal()}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
                <label>크루배너사진 :</label>
                <input
                    type="file"
                    id="bannerImage"
                    accept="image/*"
                    onChange={handleFileChange}
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
    </div>
  );
};

export default CrewCreatePage;
