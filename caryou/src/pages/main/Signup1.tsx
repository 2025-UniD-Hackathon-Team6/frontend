import "./signup.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup2 from "./Signup2";

export default function Signup1() {
  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1 className="title">CARYOU</h1>
        <p className="subtitle">나만의 커리어 여정을 시작해보세요! 🚀</p>

        <div className="steps">
          <div className="step active">1</div>
          <div className="step">2</div>
          <div className="step">3</div>
        </div>

        <div className="form-box">
          <h2 className="form-title">기본 정보를 입력해주세요</h2>

          <div className="form-grid">
            <input type="text" placeholder="이름" />
            <input type="email" placeholder="이메일" />
            <input type="password" placeholder="비밀번호" />
            <input type="password" placeholder="비밀번호 확인" />
            <input type="text" placeholder="전화번호" />
            <input type="date" placeholder="생년월일" />
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<button className="next-btn">다음 단계로 →</button>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}
