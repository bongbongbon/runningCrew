// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/Auth/LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePageChange = (path) => {
    navigate(path);
}

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      alert('로그인 실패: ' + error.response.data.errorMessage);
    }
  };
  
  

  return (
    <div className='login-container'>
      <h2 className='clickable-home' onClick={() => navigate('/')}>RUNNING CREW</h2>
      <h2>로그인</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='form-group'>
          <label>이메일:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
        <p className='password-reset-link clickable' onClick={() => handlePageChange('/password-reset')}>
          비밀번호 재설정
        </p>
        </div>
        <button type="submit" className='login-button'>로그인</button>
      </form>
      <h2 onClick={() => handlePageChange('/signup')} className='clickable-text'>회원가입</h2>
    </div>
  );
};

export default LoginPage;
