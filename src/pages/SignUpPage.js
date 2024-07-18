import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Auth/SignUpPage.css'
import axiosInstance from '../utils/axiosInstance';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null); // Initialize as null
  const [message, setMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isVerified) {
      alert('이메일 인증을 먼저 완료해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordCheck', passwordCheck);
    formData.append('nickname', nickname);
    formData.append('profileImage', profileImage);

    try {
      const response = await axios.post('http://localhost:8080/user/register', formData, {
       headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.status === 200) {
        navigate('/login');
        setMessage(response.data);
        alert('회원가입에 성공하였습니다.');
      }
    } catch (error) {
      setMessage(error.response.data.errorMessage);
      alert(error.response.data.errorMessage);
    }
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSendVerificationEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/send/verify/email', {
        email: email
      });
      if (response.status === 200) {
        setMessage('이메일로 인증 코드가 전송되었습니다.');
        setIsCodeSent(true); // 인증 코드가 전송되면 상태 변수를 true로 업데이트
      }
    } catch (error) {
      setMessage('이메일 인증 코드 전송 중 오류가 발생했습니다.');
      alert(error.response.data.errorMessage);
      console.error('Error sending verification email:', error);
    }
  };


  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/verify', {
        email: email,
        code: verificationCode
      });
      if (response.status === 200) {
        alert('인증이 완료되었습니다.');
        setIsVerified(true); // 인증이 완료되면 상태 변수를 true로 업데이트
      }
    } catch (error) {
      setMessage('인증 코드 확인 중 오류가 발생했습니다.');
      console.error('Error verifying code:', error);
      alert(error.response.data.errorMessage);
    }
  };

  return (
    <div className='signup-container'>
      <h2 className='clickable-home' onClick={() => navigate('/')}>RUNNING CREW</h2>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div className='form-group'>
          <label>이메일:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!isCodeSent && (
          <div><button onClick={handleSendVerificationEmail}>이메일 인증</button></div>
        )}
        {isCodeSent && !isVerified &&(
          <div className='form-group'>
            <label>인증 코드:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={handleVerifyCode}>확인</button>
            <button onClick={handleSendVerificationEmail}>인증 재요청</button>
          </div>
        )}
        <div className='form-group'>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>프로필 사진:</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className='signup-button'>완료</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;

