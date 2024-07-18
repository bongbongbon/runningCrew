import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/First/FirstPage.css'; // 스타일 파일을 임포트
import { AuthContext } from '../contexts/AuthContext';



const NavBar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext); // AuthContext에서 사용자 정보와 로그아웃 함수 가져오기
    const [selectedPage, setSelectedPage] = useState('바로러닝'); // State to hold selected page
    const location = useLocation();



    const handlePageChange = (path, page) => {
        navigate(path);
    }

    useEffect(() => {
        const pathToPage = {
            '/': '바로러닝',
            '/crew': '크루',
            '/running/create': '러닝만들기',
            '/crew/create': '크루만들기',
        };

        setSelectedPage(pathToPage[location.pathname] || '바로러닝');
    }, [location.pathname]);


    return (

            <div className='navigation__wrapper'>
                <div className={`navigation__item ${selectedPage === '바로러닝' ? 'on' : ''}`}>
                    <h2 onClick={() => handlePageChange('/', '바로러닝')} className='clickable-text'>바로러닝</h2>
                </div>
                <div className={`navigation__item ${selectedPage === '크루' ? 'on' : ''}`}>
                    <h2 onClick={() => handlePageChange('/crew', '크루')} className='clickable-text'>크루</h2>
                </div>
                <div className={`navigation__item ${selectedPage === '러닝만들기' ? 'on' : ''}`}>
                    <h2 onClick={() => handlePageChange('/running/create', '러닝만들기')} className='clickable-text'>러닝만들기</h2>
                </div>
                <div className={`navigation__item ${selectedPage === '크루만들기' ? 'on' : ''}`}>
                    <h2 onClick={() => handlePageChange('/crew/create', '크루만들기')} className='clickable-text'>크루만들기</h2>
                </div>
            </div>
               

        
     
    );
};

export default NavBar;