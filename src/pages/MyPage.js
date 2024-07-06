import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import '../css/User/Mypage.css';
import '../css/Common/NavBar.css';
import Navbar from '../components/NavBar';

const Mypage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const response = await axiosInstance.post('/api/user/profile');
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                alert(error.response.data.errorMessage);
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (

        <div className="container">
        <div><Navbar /></div>
            <div className="mypage-content">
                <div className="mypage-left">
                    <h2>{user.nickname}</h2>
                    <p>{user.email}</p>
                </div>
                <div className="mypage-right">
                    <h3>나의 런닝</h3>
                    <a href='/mypage/myrunnging' className='mypage-right-list'>런닝 내역</a>
                    <a href='/mypage/change/profile' className='mypage-right-list'>프로필 수정</a>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
