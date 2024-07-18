import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import '../css/Crew/CrewDetailPage.css'; // CSS 파일 import
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ReplyForm from '../components/ReplyForm'; // Import the reply form component
import NavBar from '../components/NavBar';
import { AuthContext } from '../contexts/AuthContext';

const CrewDetailPage = () => {
  const { id } = useParams();
  const [crew, setCrew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const { user: currentUser } = useContext(AuthContext); // AuthContext 사용
  const [replyId, setReplyId] = useState(null); // 답글을 달 게시물의 ID
  const [replyContent, setReplyContent] = useState('');
  const [replyForms, setReplyForms] = useState({});
  const [replies, setReplies] = useState({});
  const [showReplies, setShowReplies] = useState({});

  // 런닝 게시판 데이터 가져오기
  useEffect(() => {
    const fetchRunningDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/crews/get/${id}`);
        setCrew(response.data.data); // API에서 반환하는 데이터 구조에 따라 설정
        setUser(response.data.data.user);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching running detail:', error);
        setError('런닝 상세 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRunningDetail();
  }, [id]);

  // 수정 버튼 클릭 시 처리
  const handleEdit = () => {
    navigate(`/crew/update/${id}`)
  };

  // 삭제 버튼 클릭 시 처리
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/crews/delete/${id}`);
      alert('크루가 성공적으로 삭제되었습니다.');
      navigate('/crew');
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

  if (!crew) {
    return <p>Crew not found.</p>;
  }

  const handlePageChange = (path) => {
    navigate(path);
  }

  // 좋아요 버튼 클릭 시 처리
  const handleLike = async () => {
    try {
      if (liked) {
        console.log(liked);
        await axiosInstance.post(`/api/likes/delete/${id}`);
      } else {
        await axiosInstance.post(`/api/likes/create/${id}`);
      }
      setLiked(!liked); // 좋아요 상태 토글
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReplySubmit = async (replyId) => {
    try {
      await axiosInstance.post(`/api/rereplies/create/${replyId}`, {
        content: replyContent,
      });
      alert('답글이 성공적으로 등록되었습니다.');
      setReplyForms((prevForms) => ({
        ...prevForms,
        [replyId]: false,
      }));
      setReplyContent('');
      fetchReplies(replyId);
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('답글 등록 중 오류가 발생했습니다.');
    }
  };

  const toggleReplyForm = (replyId) => {
    setReplyForms((prevForms) => ({
      ...prevForms,
      [replyId]: !prevForms[replyId],
    }));
  };

  const toggleReplies = async (replyId) => {
    if (showReplies[replyId]) {
      setShowReplies((prev) => ({
        ...prev,
        [replyId]: false,
      }));
    } else {
      await fetchReplies(replyId);
      setShowReplies((prev) => ({
        ...prev,
        [replyId]: true,
      }));
    }
  };

  const fetchReplies = async (replyId) => {
    try {
      const response = await axiosInstance.get(`/api/rereplies/reply/${replyId}`);
      setReplies((prev) => ({
        ...prev,
        [replyId]: response.data.data,
      }));
    } catch (error) {
      console.error('Error fetching replies:', error);
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
      <div className="crew-detail-container">
        <div className="crew-detail">
          {crew.bannerImg && (
            <img src={crew.bannerImg} alt="크루 배너" className="crew-banner" />
          )}
          <div className='likes-container'>
            <FontAwesomeIcon
              icon={faHeart}
              className={`clickable heart-icon ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            />
            <p>{crew.likeCount}</p>
          </div>
          <h2>{crew.title}</h2>
          <p>런닝장: {user.nickname}</p>
          <p>소개: {crew.content}</p>
          <p>지역: {crew.location}</p>

          {currentUser && currentUser.id === user.id && (
            <div>
              <button onClick={handleEdit}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          )}
                      {currentUser && currentUser.email !== user.email && (
                      <div>
                        <button>가입 신청하기</button>
                      </div>
                    )}
          <ReplyForm crewId={id} />
          <div className="replies">

            {crew.replies && crew.replies.map((reply, index) => (
              <div key={index} className="reply">
                {reply && (
                  <>
                    <div className="reply-user-info">
                      <img
                        src={reply.user.profileImg}
                        alt="프로필 이미지"
                        className="profile-image"
                      />
                      <p>{reply.user.nickname}</p>
                    </div>
                    <h3>{reply.content}</h3>
                    <div className='reply-actions'>

                    {currentUser && currentUser.id === reply.user.id && (
                      <div className='reply-actions'>
                        <a className='clickable'>수정</a>
                        <a className='clickable'>삭제</a>
                      </div>
                      )}
        

                      <a className='clickable' onClick={() => toggleReplies(reply.id)}>답글보기</a>
                      <a className='clickable' onClick={() => toggleReplyForm(reply.id)}>답글달기</a>
                    </div>
                    {replyForms[reply.id] && (
                      <div className="reply-form">
                        <input
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="답글을 입력하세요..."
                        />
                        <button onClick={() => handleReplySubmit(reply.id)}>답글 달기</button>
                      </div>
                    )}
                    {showReplies[reply.id] && replies[reply.id] && (
                      <div className="replies">
                        {replies[reply.id].map((rereply, index) => (
                          <div key={index} className="reply">
                            <div className="reply-user-info">
                              <img
                                src={rereply.user.profileImg}
                                alt="프로필 이미지"
                                className="profile-image"
                              />
                              <p>{rereply.user.nickname}</p>
                            </div>
                            <h3>{rereply.content}</h3>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewDetailPage;
