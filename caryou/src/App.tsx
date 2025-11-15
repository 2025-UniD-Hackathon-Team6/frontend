import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/main";
import MyPage from "./pages/mypage/mypage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;