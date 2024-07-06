
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FirstPage from './pages/FirstPage';
import SignUpPage from './pages/SignUpPage';
import RunningPage from './pages/RunningPage';
import RunningCreatePage from './pages/RunningCreatePage';
import ModalPage  from './pages/ModalPage';
import RunningDetailPage from './pages/RunningDetailPage';

import { AuthProvider } from './contexts/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import Mypage from './pages/MyPage';
import RunningUpdatePage from './pages/RunningUpdatePage';




function App() {


  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/running" element={<RunningPage />} />
        <Route path="/running/create" element={<ProtectedRoute element={<RunningCreatePage />} />} />
        <Route path="/running/update/:id" element={<RunningUpdatePage />}/>
        <Route path="/running/detail/:id" element={<RunningDetailPage />}/>

        <Route path="/modal" element={<ModalPage />} />

        <Route path="/mypage" element={<Mypage />} />

      </Routes>
    </Router>
    </AuthProvider>  
  );
}

export default App;