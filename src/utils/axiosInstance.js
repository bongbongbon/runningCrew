// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://43.203.54.25:8080',
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {

        return Promise.reject(error);
      }
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // 401 Unauthorized 오류일 경우에만 토큰 제거 및 리디렉션 처리
    if (response && response.status === 401) {
      localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
      window.location.href = '/login'; // 로그인 페이지로 리디렉션
    }

      return Promise.reject(error); // 기타 에러 처리
  }
);

export default axiosInstance;
