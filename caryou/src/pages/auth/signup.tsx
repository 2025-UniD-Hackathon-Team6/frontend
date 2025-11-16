// src/pages/auth/Signup.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/auth/signup.css";
import axios from "axios";

type BasicInputs = {
  name: string;
  id: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  birth: string;
};

const JOB_CAT_ICON_LIST = ["💻", "📊", "🎨", "📢", "💰", "💼",];
const JOB_POS_ICON_LIST = ["📊", "💻", "📢"];

const STRESS_LEVELS = [
  { key: "0", icon: "😌", label: "전혀 없어요" },
  { key: "1", icon: "🙂", label: "조금 있어요" },
  { key: "2", icon: "😐", label: "보통이에요" },
  { key: "3", icon: "😰", label: "조금 많아요" },
  { key: "4", icon: "😵‍💫", label: "많이 있어요" },
];

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const loadJobCat = async () => {
    const res = await axios.get('http://52.79.172.1:4000/job/categories', { });
    const d: {id: number, name: string, description: string}[] = res.data;
    setJobCat(d);
  }
  const loadJobPos = async () => {
    const res = await axios.get('http://52.79.172.1:4000/job/positions', { });
    const d: {id: number, categoryId: number, name: string, description: string}[] = res.data;
    setJobPos(d);
  }

  const [jobCat, setJobCat] = useState([{id: 0, name: "", description: ""}]);
  const [jobPos, setJobPos] = useState([{id: 0, categoryId: 0, name: "", description: ""}]);

  useEffect(() => {
    loadJobCat();      // ⭐ 사용자 이름 불러오기
    loadJobPos();   // ⭐ 출석 데이터 불러오기
  }, []);


  const [basic, setBasic] = useState<BasicInputs>({
    name: "",
    id: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    birth: "",
  });

  const [selectedJobCat, setSelectedJobCat] = useState<string[]>([]);
  const [selectedJobPos, setSelectedJobPos] = useState<string[]>([]);
  const [stress, setStress] = useState<string>("");

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasic((prev) => ({ ...prev, [name]: value }));
  };

  const toggleJobCat = (jobKey: string) => {
    setSelectedJobCat((prev) => {
      const exists = prev.includes(jobKey);
      if (exists) return prev.filter((k) => k !== jobKey);
      if (prev.length >= 1) return prev;
      return [...prev, jobKey];
    });
  };

  const toggleJobPos = (jobKey: string) => {
    setSelectedJobPos((prev) => {
      const exists = prev.includes(jobKey);
      if (exists) return prev.filter((k) => k !== jobKey);
      if (prev.length >= 1) return prev;
      return [...prev, jobKey];
    });
  };

  const handleNext = () => setStep((prev) => (prev === 4 ? 4 : (prev + 1) as 1 | 2 | 3 | 4));
  const handlePrev = () => setStep((prev) => (prev === 1 ? 1 : (prev - 1) as 1 | 2 | 3 | 4));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://52.79.172.1:4000/auth/register', { 
        name: basic.id,
        password: basic.password,
      });

      const response2 = await axios.post('http://52.79.172.1:4000/auth/login', { 
        name: basic.id,
        password: basic.password,
      });

      const token = response2.data["accessToken"];
      localStorage.setItem('accessToken', token);

      await axios.post('http://52.79.172.1:4000/job/categories/interest',
        { 
          Ids: [parseInt(selectedJobCat[0])]
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await axios.post('http://52.79.172.1:4000/job/positions/interest',
        { 
          Ids: [parseInt(selectedJobPos[0])]
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      
    navigate("/"); // ▶ 메인페이지로 즉시 이동
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      alert("404 에러 발생",);
    }
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
          <div className={`step ${step >= 4 ? "active" : ""}`}>4</div>
        </div>

        <div className="form-box">
          {step === 1 && (
            <>
              <h2 className="form-title">기본 정보를 입력해주세요</h2>
              <div className="form-grid">
                <input name="name" placeholder="이름" onChange={handleBasicChange} />
                <input name="id" placeholder="아이디" onChange={handleBasicChange} />
                <input name="password" placeholder="비밀번호" type="password" onChange={handleBasicChange} />
                <input
                  name="passwordConfirm"
                  placeholder="비밀번호 확인"
                  type="password"
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
              <h2 className="form-title">관심 있는 직군을 선택해주세요</h2>
              <p className="form-sub">최대 3개까지 선택 가능합니다.</p>

              <div className="grid">
                {jobCat.map((job, index) => (
                  <div
                    key={String(job.id)}
                    className={"card " + (selectedJobCat.includes(String(job.id)) ? "active" : "")}
                    onClick={() => toggleJobCat(String(job.id))}
                  >
                    <div className="icon">{JOB_CAT_ICON_LIST[index]}</div>
                    <div className="card-title">{job.name}</div>
                    <div className="card-desc">{job.description}</div>
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
            <>
              <h2 className="form-title">관심 있는 직무를 선택해주세요</h2>
              <p className="form-sub">최대 3개까지 선택 가능합니다.</p>

              <div className="grid">
                {jobPos.map((job, index) => (
                  <div
                    key={String(job.id)}
                    className={"card " + (selectedJobPos.includes(String(job.id)) ? "active" : "")}
                    onClick={() => toggleJobPos(String(job.id))}
                  >
                    <div className="icon">{JOB_POS_ICON_LIST[index]}</div>
                    <div className="card-title">{job.name}</div>
                    <div className="card-desc">{job.description}</div>
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

          {step === 4 && (
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
