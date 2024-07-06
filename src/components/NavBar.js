import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/Common/NavBar.css'


const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext); // AuthContext에서 사용자 정보와 로그아웃 함수 가져오기




    const handlePageChange = (path, page) => {

        navigate(path);
    }



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

                        <button
                            id='search-btn' className='search-btn'>
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
        </div>
               

        
     
    );
};

export default Navbar;