// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/mainpage";
import MyPageDashboard from "./pages/mypage/mypage";          // 기존 MyPage = 대시보드
import MyPageCalendar from "./pages/mypage/mypageCalendar";  // 새로 만들 컴포넌트
import MyPageMood from "./pages/mypage/mypageMood";
import MyPageSettings from './pages/mypage/mypageSettings';
import Community from './pages/community/community';
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MyPageDashboard />} />
        <Route path="/mypage/calendar" element={<MyPageCalendar />} />
        <Route path="/mypage/mood" element={<MyPageMood />} />
        <Route path="/mypage/settings" element={<MyPageSettings />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
};

export default App;
