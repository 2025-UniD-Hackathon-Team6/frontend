// src/pages/auth/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/auth/signup.css";

const Login: React.FC = () => {
  //const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [inputs, setInputs] = useState({ id: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setMessage(''); // 로그인 시도 시 메시지 초기화

    try {
      // 💡 API 경로를 /login으로 변경하는 것이 일반적이며 권장됩니다.
      const response = await axios.post('http://52.79.172.1:4000/auth/login', { 
        name: inputs.id,
        password: inputs.password,
      });
      localStorage.setItem('accessToken', response.data["accessToken"]);
      
      navigate("/"); // 로그인 성공 시 리다이렉션
      
    } catch (error) {
      console.error('로그인 실패:', error);
      if (axios.isAxiosError(error)) {
        // 이 블록 안에서 error는 AxiosError 타입으로 간주됩니다.
        
        if (error.response) {
          const status = error.response.status;

          if (status === 403) { 
            setMessage('비밀번호가 일치하지 않습니다.');
          } else if (status === 404) {
            setMessage('사용자가 존재하지 않습니다.');
          } else {
            setMessage(`서버 통신 오류: ${status}`);
          }
        } else if (error.request) {
            setMessage('서버에 연결할 수 없습니다. 네트워크 상태를 확인하세요.');
        }
      } 
      // 💡 AxiosError가 아닌 일반 Error 객체 처리
      else if (error instanceof Error) {
        setMessage(`클라이언트 오류: ${error.message}`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
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
