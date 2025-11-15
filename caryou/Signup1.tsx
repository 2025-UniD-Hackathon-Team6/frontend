import "./signup.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

export default function Signup1() {
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: ''
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

        <div className="steps">
          <div className="step active">1</div>
          <div className="step">2</div>
          <div className="step">3</div>
        </div>

        <div className="form-box">
          <h2 className="form-title">기본 정보를 입력해주세요</h2>

          <div className="form-grid">
            <input type="text" name="input1" onChange={handleInputChange} placeholder="이름" />
            <input type="email" name="input2" onChange={handleInputChange} placeholder="이메일" />
            <input type="password" name="input3" onChange={handleInputChange} placeholder="비밀번호" />
            <input type="password" name="input4" onChange={handleInputChange} placeholder="비밀번호 확인" />
            <input type="text" name="input5" onChange={handleInputChange} placeholder="전화번호" />
            <input type="text" name="input6" onChange={handleInputChange} maxLength={8} placeholder="생년월일" />
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<button disabled={!isFormComplete} 
              style={{opacity: !isFormComplete ? 0.5 : 1,  // 비활성화되면 반투명
                cursor: !isFormComplete ? 'not-allowed' : 'pointer', // 비활성화되면 커서 변경
                transition: 'opacity 0.3s ease', // 부드러운 효과
              }}
              className="next-btn">다음 단계로 →</button>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}
