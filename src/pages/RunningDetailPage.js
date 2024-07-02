// src/pages/RunningDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import '../css/Running/RunningDetailPage.css'; // CSS 파일 import


const RunningDetailPage = () => {
  const { id } = useParams();
  const [running, setRunning] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const [runningUsers, setRunningUsers] = useState([]);
  // const [currentUserEmail, setCurrentUserEmail] = useState(null); // 현재 로그인한 사용자 이메일 상태 추가


  

  // 런닝 게시판 데이터 가져오기
  useEffect(() => {
    const fetchRunningDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/runnings/get/${id}`);
        setRunning(response.data.data); // API에서 반환하는 데이터 구조에 따라 설정
        setUser(response.data.data.user);


      } catch (error) {
        console.error('Error fetching running detail:', error);
        setError('런닝 상세 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRunningDetail();
  }, [id]);

  // 런닝 참여하기
  const handleJoinTeam = async () => {
    try {
      const response = await axiosInstance.post(`/api/runnings/users/join/${id}`);
      console.log('Join team response:', response.data);
      alert('팀에 성공적으로 합류했습니다.');
      navigate('/');
    } catch (error) {
      console.error('Error joining team:', error);
      alert(error.response.data.errorMessage);
    }
  };

  // 런닝유저 불러오기
  useEffect(() => {
    const fetchRunningUsers = async () => {
      try {
        const response = await axiosInstance.post(`/api/runnings/users/get/${id}`);
        setRunningUsers(response.data.data); // API에서 반환하는 데이터 구조에 따라 설정
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching running detail:', error);
        setError('런닝 유저를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRunningUsers();
  }, [id]);


  


    // 수정 버튼 클릭 시 처리
    const handleEdit = () => {
 
      };
    
      // 삭제 버튼 클릭 시 처리
      const handleDelete = async () => {
        try {
          await axiosInstance.delete(`/api/runnings/delete/${id}`);
          alert('런닝이 성공적으로 삭제되었습니다.');
          navigate('/');
        } catch (error) {
          alert(error.response.data.errorMessage);
        }
      };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!running) {
    return <p>Running not found.</p>;
  }

  const handlePageChange = (path) => {
    navigate(path);
}





  return (
    <div className="running-detail-container">
      <div className="running-detail">
        <h2 className='clickable' onClick={() => handlePageChange('/')}>RUNNING CREW</h2>
        <div className="user-info">
          <p>런닝장: {user.nickname}</p>
        </div>
        <h2>제목: {running.title}</h2>
        <p>내용: {running.content}</p>
        <p>시작 지점: {running.startLocation}</p>
        <p>상세: {running.startDetailLocation}</p>
        <p>도착 지점: {running.finishLocation}</p>
        <p>상세: {running.finishDetailLocation}</p>
        <p>거리: {running.distance}km</p>
        <p>시작 시간: {running.time}</p>
        <p>제한 인원: {running.limitedPeople}명</p>
        <button onClick={() => handleJoinTeam()}>참가하기</button>
          <div>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>

      </div>

      <div>
      <h2>참가유저</h2>

      <ul className="running-user-list">
          {runningUsers.map((runnningUser) => (
            <li key={runnningUser.id} className="running-user-item">{runnningUser.user.nickname}</li>
          ))}
        </ul>
    </div>

    </div>
  );
};

export default RunningDetailPage;
