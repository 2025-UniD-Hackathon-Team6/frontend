// src/pages/auth/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/auth/signup.css";

const Login: React.FC = () => {
  //const navigate = useNavigate();

  const [message, setMessage] = useState('없음');
  const [inputs, setInputs] = useState({ id: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 💡 폼 제출 시 페이지 새로고침을 막습니다.
    setMessage('없음'); // 로그인 시도 시 메시지 초기화
    try {
      const response = await axios.post('http://52.79.172.1:4000/', {
        username: inputs.id,
        password: inputs.password,
      });
      const { access_token } = response.data;
      // 1. JWT 저장
      localStorage.setItem('accessToken', access_token);
      // 2. 인증 상태 업데이트 및 리다이렉트
      // ...
    } catch (error) {
      console.error('로그인 실패:', error);
        if(error.isAxiosError) {
          if(error.response.status == 403) { // 비번 불일치
            setMessage('비밀번호 불일치');
          }
          else if(error.response.status == 404) { // 존재하지 않는 사용자
            setMessage('존재하지 않는 사용자');
          }
          else { // 예상치 못한 오류 발생
            setMessage('예상치 못한 오류 발생');
          }
      }
      console.log(message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  {/*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("로그인 성공!");
    navigate("/"); // ▶ 메인페이지로 이동
  };*/}


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

          <form onSubmit={handleLogin} className="form-login">
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
            <div id="error">{message}</div>
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
