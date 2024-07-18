import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import '../css/Reply/ReplyForm.css';

const ReplyForm = ({ crewId }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(`/api/replies/create/${crewId}`, null, {
        params: {
          content: replyContent,
        },
      });
      setReplyContent(''); // Reset form
      if (response.status === 200) {
        window.location.reload(); // 페이지 새로고침(새로고침 없이 동기화 작업 진행 해봐야함)
      }    
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('An error occurred while submitting the reply.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <input
        className='reply-input'
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="댓글을 입력해주세요"
        required
      />
      <button type="submit">댓글입력</button>
    </form>
  );
};

export default ReplyForm;
