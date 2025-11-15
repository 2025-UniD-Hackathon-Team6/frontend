import "./signup.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const [inputs, setInputs] = useState({
  input1: '',
  input2: '',
});

const [message, setMessage] = useState('');

const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setInputs(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleLogin = async () => {
  try {
    const response = await axios.post('http://52.79.172.1:4000/', {
      username: inputs.input1,
      passward: inputs.input2,
    });
    const { access_token } = response.data;
    // 1. JWT 저장
    localStorage.setItem('accessToken', access_token);
    // 2. 인증 상태 업데이트 및 리다이렉트
    // ...
  } catch (error) {
    console.error('로그인 실패:', error);
    if (axios.isAxiosError(error)) {
      if(error.response) {
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
    }
  }
};



export default function Login() {
  const isFormComplete = Object.values(inputs).every(input=> input!=='');

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1 className="title">CARYOU</h1>
        <p className="subtitle">나만의 커리어 여정을 시작해보세요! 🚀</p>

        <div className="blank"></div>

        <div className="form-box">
          <h2 className="form-title">아이디와 비밀번호를 입력해주세요</h2>

          <div className="form-login">
            <input type="text" name="input1" className="login-input" onChange={handleInputChange} placeholder="아이디" />
            <input type="password" name="input2" className="login-input" onChange={handleInputChange} placeholder="비밀번호" />
          </div>
          <button disabled={!isFormComplete}
              onClick={() => {handleLogin()}} // 버튼 클릭시 handleLogin 함수 실행
              style={{opacity: !isFormComplete ? 0.5 : 1,  // 비활성화되면 반투명
                cursor: !isFormComplete ? 'not-allowed' : 'pointer', // 비활성화되면 커서 변경
                transition: 'opacity 0.3s ease', // 부드러운 효과
              }}
              className="next-btn">로그인</button>
          <div className="blank"></div>
          <div id="error">{ message }</div>
        </div>
        <button className="signup-btn">아직 계정이 없으신가요? 회원가입 하세요</button>
      </div>
    </div>
  );
}
