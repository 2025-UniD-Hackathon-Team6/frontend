// src/pages/auth/Signup.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/auth/signup.css";
import axios from "axios";

type BasicInputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  birth: string;
};

const JOB_LIST = [
  { key: "dev", icon: "💻", title: "개발", desc: "프론트엔드, 백엔드, 모바일" },
  { key: "data", icon: "📊", title: "데이터 분석", desc: "데이터 분석, AI/ML" },
  { key: "design", icon: "🎨", title: "디자인", desc: "UI/UX, 그래픽 디자인" },
  { key: "marketing", icon: "📢", title: "마케팅", desc: "디지털 마케팅, 콘텐츠" },
  { key: "finance", icon: "💰", title: "금융", desc: "투자, 재무 분석" },
  { key: "consulting", icon: "💼", title: "컨설팅", desc: "경영, 전략 컨설팅" },
];

const STRESS_LEVELS = [
  { key: "0", icon: "😌", label: "전혀 없어요" },
  { key: "1", icon: "🙂", label: "조금 있어요" },
  { key: "2", icon: "😐", label: "보통이에요" },
  { key: "3", icon: "😰", label: "조금 많아요" },
  { key: "4", icon: "😵‍💫", label: "많이 있어요" },
];

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [basic, setBasic] = useState<BasicInputs>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    birth: "",
  });

  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [stress, setStress] = useState<string>("");

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasic((prev) => ({ ...prev, [name]: value }));
  };

  const toggleJob = (jobKey: string) => {
    setSelectedJobs((prev) => {
      const exists = prev.includes(jobKey);
      if (exists) return prev.filter((k) => k !== jobKey);
      if (prev.length >= 3) return prev;
      return [...prev, jobKey];
    });
  };

  const handleNext = () => setStep((prev) => (prev === 3 ? 3 : (prev + 1) as 1 | 2 | 3));
  const handlePrev = () => setStep((prev) => (prev === 1 ? 1 : (prev - 1) as 1 | 2 | 3));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://52.79.172.1:4000/auth/register', { 
        name: basic.email,
        password: ,
      });
    alert("가입 완료!");
    navigate("/"); // ▶ 메인페이지로 즉시 이동
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

        <div className="steps">
          <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <div className="form-box">
          {step === 1 && (
            <>
              <h2 className="form-title">기본 정보를 입력해주세요</h2>
              <div className="form-grid">
                <input name="name" placeholder="이름" onChange={handleBasicChange} />
                <input name="id" placeholder="아이디" onChange={handleBasicChange} />
                <input name="password" placeholder="비밀번호" onChange={handleBasicChange} />
                <input
                  name="passwordConfirm"
                  placeholder="비밀번호 확인"
                  onChange={handleBasicChange}
                />
                <input name="phone" placeholder="전화번호" onChange={handleBasicChange} />
                <input
                  name="birth"
                  maxLength={8}
                  placeholder="생년월일 (YYYYMMDD)"
                  onChange={handleBasicChange}
                />
              </div>

              <button className="next-btn" onClick={handleNext}>
                다음 단계로 →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="form-title">관심 있는 직무를 선택해주세요</h2>
              <p className="form-sub">최대 3개까지 선택 가능합니다.</p>

              <div className="grid">
                {JOB_LIST.map((job) => (
                  <div
                    key={job.key}
                    className={"card " + (selectedJobs.includes(job.key) ? "active" : "")}
                    onClick={() => toggleJob(job.key)}
                  >
                    <div className="icon">{job.icon}</div>
                    <div className="card-title">{job.title}</div>
                    <div className="card-desc">{job.desc}</div>
                  </div>
                ))}
              </div>

              <div className="step-buttons">
                <button className="prev-btn" onClick={handlePrev}>
                  ← 이전
                </button>
                <button className="next-btn" onClick={handleNext}>
                  다음 단계로 →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">현재 스트레스 수준은?</h2>
              <p className="form-sub">솔직히 선택해주시면 더 나은 추천을 드릴게요!</p>

              <div className="mood-grid">
                {STRESS_LEVELS.map((item) => (
                  <div
                    key={item.key}
                    onClick={() => setStress(item.key)}
                    className={
                      "mood-card " + (stress === item.key ? "mood-card-active" : "")
                    }
                  >
                    <div className="mood-icon">{item.icon}</div>
                    <div className="mood-label">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="step-buttons">
                <button type="button" className="prev-btn" onClick={handlePrev}>
                  ← 이전
                </button>
                <button type="submit" className="next-btn">
                  가입 완료
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="auth-bottom-text">
          이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
