import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/First/FirstPage.css'; // 스타일 파일을 임포트
// import WeekDaysSlider from '../utils/weekDaysSlider';
import BannerSlider from '../utils/bannerSlider';
import { AuthContext } from '../contexts/AuthContext';
import RunningList from './RunningPage';



const FirstPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext); // AuthContext에서 사용자 정보와 로그아웃 함수 가져오기
    // const [selectedDate, setSelectedDate] = useState(''); // State to hold selected date
    const [selectedPage, setSelectedPage] = useState('바로러닝'); // State to hold selected page



    const handlePageChange = (path, page) => {
        setSelectedPage(page);
        navigate(path);
    }

    // const handleDateClick = (formattedDate) => {
        // setSelectedDate(formattedDate); // Update selected date
    // }


    return (
        <div className='container'>
            <div className='navbar'>
                <div className='userMenu'>
                    <div>
                        <h1 onClick={() => handlePageChange('/')} className='clickable-text'>RUNNING CREW</h1>
                    </div>

                    <div className='searchBox'>
                        <input type="text"
                            placeholder='지역 크루로 찾기'
                            className='searchInput'/>

                        <button className='search-btn'>
                                버튼
                        </button>
                        </div>

                        <div className='login'>
                        {user ? (
                            <>
                                <p onClick={() => handlePageChange('/mypage')} className='clickable-text'>{user.nickname}</p>
                                <button onClick={logout}>로그아웃</button>
                            </>
                        ) : (
                            <h1 onClick={() => handlePageChange('/login')} className='clickable-text'>로그인</h1>
                        )}
                    </div>
                </div>
            </div>

            <div className='navigation__wrapper'>
                <div className={`navigation__item ${selectedPage === '바로러닝' ? 'on' : ''}`}>
                    <h2 onClick={() => handlePageChange('/', '바로러닝')} className='clickable-text'>바로러닝</h2>
                </div>
                <div className={`navigation__item ${selectedPage === '크루' ? 'on' : ''}`}>
                    <h2 onClick={() => handlePageChange('/crew', '크루')} className='clickable-text'>크루</h2>
                </div>
                <div className={`navigation__item ${selectedPage === '챌린지' ? 'on' : ''}`}>
                    <h2 onClick={() => handlePageChange('/chalange', '챌린지')} className='clickable-text'>챌린지</h2>
                </div>
                <div className={`navigation__item ${selectedPage === '러닝만들기' ? 'on' : ''}`}>
                    <h2 onClick={() => handlePageChange('/running/create', '러닝만들기')} className='clickable-text'>러닝만들기</h2>
                </div>
            </div>
           
            <div>
                <BannerSlider />
            </div>
            <div>
                <RunningList  />
            </div>

        </div>
               

        
     
    );
};

export default FirstPage;