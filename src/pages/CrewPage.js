import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Crew/CrewPage.css'; // 스타일 파일을 임포트
import Header from '../components/Header';
import axiosInstance from '../utils/axiosInstance';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import NavBar  from '../components/NavBar';



const CrewPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [crews, setCrews] = useState([]);

    const [orderFilter, setOrderFilter] = useState('최신순');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const [selectedStartLocation, setSelectedStartLocation] = useState('');
    const [modalType, setModalType] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달 변수 설정
    const [etcOrder, setEtcOrder] = useState('');



    useEffect(() => {
        const fetchCrew = async () => {
            try {
                const response = await axiosInstance.get('/api/crews/get', {
                  params: {
                    location,
                    orderFilter
                  },
                });
                setCrews(response.data.data || []); // 데이터를 설정하고, 없으면 빈 배열로 초기화
                console.log(response.data.data);
              } catch (error) {
                console.error('Error fetching boards:', error);
                setError('게시판 목록을 가져오는 중 오류가 발생했습니다.');
              } finally {
                setLoading(false);
              }
        }

        fetchCrew();
    }, [location, orderFilter]);

    const navigateToDetail = (id) => {
        navigate(`/crew/detail/${id}`);
      };

   
  const openModal = (type) => {
    setModalIsOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType('');
  };

      const renderModalContent = () => {
        switch(modalType) {
          case 'location':
            return (
              <div>
                <h2>시작 지역 선택</h2>
                <ul className='filter--list'>
                  <li className='filter--list--item' onClick={() => {setLocation(''); closeModal(); }}>
                    <p>모든지역</p>
                  </li>
                  <li className='filter--list--item' onClick={() => {setLocation('서울'); closeModal(); }}>
                    <p>서울</p>
                  </li>
                  <li className='filter--list--item' onClick={() => {setLocation('전남'); closeModal(); }}>
                    <p>전남</p>
                  </li>
                </ul>
              </div>
            );
          case 'orderFilter':
            return (
              <div>
              <h2>차순</h2>
              <ul className='filter--list'>
              <li className='filter--list--item' onClick={() => {setOrderFilter('최신순'); closeModal(); }}>
                    <p>최신순</p>
                  </li>
                  <li className='filter--list--item' onClick={() => {setOrderFilter('오랜된순'); closeModal(); }}>
                    <p>오랜된순</p>
                  </li>
                  <li className='filter--list--item' onClick={() => {setOrderFilter('댓글많은순'); closeModal(); }}>
                        <p>댓글많은순</p>
                      </li>
                      <li className='filter--list--item' onClick={() => {setOrderFilter('좋아요많은순'); closeModal(); }}>
                        <p>좋아요많은순</p>
                      </li>
              </ul>
            </div>
            );
            case 'etcOrder':
                return (
                  <div>
                  <h2>여러가지 순서</h2>
                  <ul className='filter--list'>
          
                  </ul>
                </div>
                );
          default:
            return null;
        }
      };

    return (
        <div className='container'>
            <div>
                <Header />
            </div>
            <div>
                <NavBar />
            </div>

            <div className='main__filter'>
        <div className='filter--wrapper'>
          <ul>
            <li className='clickable-text' onClick={() => openModal('location')}>
              <span>{location === '' ? '모든지역' :  location}</span>
            </li>
            <li className='clickable-text' onClick={() => openModal('orderFilter')}>
              <span>{orderFilter}</span>
            </li>
          </ul>
        </div>
      </div>

        {crews.length === 0 ? (
          <div className='no-data-message'><p>크루가 없습니다.</p></div>
        ):(
          <ul className="crew-list">
            {crews.map((crew) => (
              <li key={crew.id} className="crew-item clickable" onClick={() => navigateToDetail(crew.id)}>
                <div className="crew-item__info">
                  <h3>{crew.title}</h3>
                  <p>{crew.content}</p>
            
                  <div className="item-details">
                    <p>크루 지역: {crew.location}</p>
                  </div>
           
                </div>
                <div className="likes-container">
                            <p>{crew.likeCount}</p>
                            <FontAwesomeIcon icon={faHeart} className="crew-heart-icon" />
                            <p>댓글:</p>
                            <p>{crew.replyCount}</p>
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
    );
};

export default CrewPage;