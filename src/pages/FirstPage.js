import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/First/FirstPage.css'; // 스타일 파일을 임포트
// import WeekDaysSlider from '../utils/weekDaysSlider';
import BannerSlider from '../utils/bannerSlider';
import { AuthContext } from '../contexts/AuthContext';
import RunningList from './RunningPage';
import Header from '../components/Header';
import NavBar from '../components/NavBar';



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
            <div>
            <Header />
            </div>
           <div>
            <NavBar />
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