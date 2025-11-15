import "./signup.css";

export default function Signup2() {
  const roles = [
    { title: "개발", desc: "프론트엔드, 백엔드, 모바일", icon: "💻" },
    { title: "데이터 분석", desc: "데이터 분석, AI/ML", icon: "📊" },
    { title: "디자인", desc: "UI/UX, 그래픽 디자인", icon: "🎨" },
    { title: "마케팅", desc: "디지털 마케팅, 콘텐츠", icon: "📢" },
    { title: "금융", desc: "투자, 재무 분석", icon: "💰" },
    { title: "컨설팅", desc: "경영, 전략 컨설팅", icon: "💼" }
  ];
  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1 className="title">CARYOU</h1>
        <p className="subtitle">나만의 커리어 여정을 시작해보세요! 🚀</p>

        <div className="steps">
          <div className="step">1</div>
          <div className="step active">2</div>
          <div className="step">3</div>
        </div>

        <div className="form-box">
          <h2 className="form-title">관심있는 직무를 선택해주세요</h2>
          <p className="subtitle">최대 3개까지 선택 가능합니다</p>

          <div className="grid">
            {roles.map((r, i) => (
              <div key={i} className="card">
              <div className="icon">{r.icon}</div>
              <div className="card-title">{r.title}</div>
              <div className="card-desc">{r.desc}</div>
              </div>
              ))}
          </div>
          <div id="blank"></div>
          <button className="next-btn">다음 단계로 →</button>
        </div>
      </div>
    </div>
  );
}
