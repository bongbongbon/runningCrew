// src/components/PasswordResetForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Auth/PasswordResetPage.css';
import { useNavigate } from 'react-router-dom';


const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [message, setMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
        alert('이메일 인증을 먼저 완료해주세요.');
        return;
      }

    try {
      // 서버로 이메일, 인증 코드, 새 비밀번호를 보냅니다.
      const response = await axios.post('http://localhost:8080/user/reset-password', {
        email,
        newPassword,
        newPasswordCheck
      });

      if (response.status === 200) {
        setMessage('비밀번호 재설정이 완료되었습니다.');
        alert('비밀번호 재설정이 완료되었습니다.');
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.response.data.errorMessage);
      alert(error.response.data.errorMessage);
    }
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
    <div className="password-reset-form">
              <h2 className='clickable-home' onClick={() => navigate('/')}>RUNNING CREW</h2>
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이메일:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
        <div className="form-group">
            <label>새 비밀번호:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
            <label>새 비밀번호 확인:</label>
          <input
            type="password"
            value={newPasswordCheck}
            onChange={(e) => setNewPasswordCheck(e.target.value)}
            required
          />
        </div>
        <button type="submit">비밀번호 재설정</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PasswordResetPage;
