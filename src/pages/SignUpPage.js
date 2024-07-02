import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Auth/SignUpPage.css'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        email,
        password,
        passwordCheck,
        nickname: nickname,
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
        <button type="submit" className='signup-button'>완료</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;

