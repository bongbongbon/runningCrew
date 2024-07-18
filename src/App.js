
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FirstPage from './pages/FirstPage';
import SignUpPage from './pages/SignUpPage';
import RunningPage from './pages/RunningPage';
import RunningCreatePage from './pages/RunningCreatePage';
import ModalPage  from './pages/ModalPage';
import RunningDetailPage from './pages/RunningDetailPage';
import CrewPage from './pages/CrewPage';
import CrewCreatePage from './pages/CrewCreatePage';
import CrewDetailPage from './pages/CrewDetailPage';

import { AuthProvider } from './contexts/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import Mypage from './pages/MyPage';
import RunningUpdatePage from './pages/RunningUpdatePage';
import PasswordResetPage from './pages/PasswordResetPage';



function App() {


  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />

        <Route path="/running" element={<RunningPage />} />
        <Route path="/running/create" element={<ProtectedRoute element={<RunningCreatePage />} />} />
        <Route path="/running/update/:id" element={<RunningUpdatePage />}/>
        <Route path="/running/detail/:id" element={<RunningDetailPage />}/>

        <Route path="/crew" element={<CrewPage />}/>  
        <Route path='/crew/create' element={<ProtectedRoute element={<CrewCreatePage />} />}/>
        <Route path="/crew/detail/:id" element={<CrewDetailPage />}/>



        <Route path="/modal" element={<ModalPage />} />

        <Route path="/mypage" element={<Mypage />} />

      </Routes>
    </Router>
    </AuthProvider>  
  );
}

export default App;