import "./signup.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
  });

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<button disabled={!isFormComplete} 
              style={{opacity: !isFormComplete ? 0.5 : 1,  // 비활성화되면 반투명
                cursor: !isFormComplete ? 'not-allowed' : 'pointer', // 비활성화되면 커서 변경
                transition: 'opacity 0.3s ease', // 부드러운 효과
              }}
              className="next-btn">로그인</button>} />
            </Routes>
          </BrowserRouter>
          <div className="blank"></div>
        </div>
        <button className="signup-btn">아직 계정이 없으신가요? 회원가입 하세요</button>
      </div>
    </div>
  );
}
