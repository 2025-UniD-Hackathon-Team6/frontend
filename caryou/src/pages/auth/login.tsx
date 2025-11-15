// src/pages/auth/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/auth/signup.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ id: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("로그인 성공!");
    navigate("/"); // ▶ 메인페이지로 이동
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="auth-logo-row">
          <div className="auth-logo-circle">
            <span className="auth-logo-emoji">🚀</span>
          </div>
          <span className="auth-logo-title">CARYOU</span>
        </div>
        <p className="subtitle">나만의 커리어 여정을 시작해보세요!</p>

        <div className="form-box login-box">
          <h2 className="form-title">아이디와 비밀번호를 입력해주세요</h2>

          <form onSubmit={handleSubmit} className="form-login">
            <input
              type="text"
              name="id"
              className="login-input"
              placeholder="아이디"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="비밀번호"
              onChange={handleChange}
            />

            <button type="submit" className="next-btn">
              로그인
            </button>
          </form>
        </div>

        <p className="auth-bottom-text">
          아직 계정이 없으신가요?{" "}
          <Link to="/signup" className="auth-link">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
