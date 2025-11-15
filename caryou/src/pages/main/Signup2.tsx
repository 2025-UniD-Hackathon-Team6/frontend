import "./signup.css";
import { useState } from "react";

export default function Signup2() {

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const isFormComplete = selectedRoles.length > 0; // 선택된 카드가 있으면 버튼 활성화

  const roles = [
    { title: "개발", desc: "프론트엔드, 백엔드, 모바일", icon: "💻" },
    { title: "데이터 분석", desc: "데이터 분석, AI/ML", icon: "📊" },
    { title: "디자인", desc: "UI/UX, 그래픽 디자인", icon: "🎨" },
    { title: "마케팅", desc: "디지털 마케팅, 콘텐츠", icon: "📢" },
    { title: "금융", desc: "투자, 재무 분석", icon: "💰" },
    { title: "컨설팅", desc: "경영, 전략 컨설팅", icon: "💼" }
  ];

  const toggleRole = (title: string) => {
    if (selectedRoles.includes(title)) {
      // 이미 선택된 카드면 해제
      setSelectedRoles(prev => prev.filter(t => t !== title));
      return;
    }

    if (selectedRoles.length < 3) {
      // 최대 3개까지 선택 가능
      setSelectedRoles(prev => [...prev, title]);
    } else {
      alert("최대 3개까지만 선택할 수 있습니다!");
    }
  };

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
            {roles.map((r, i) => {
              const isActive = selectedRoles.includes(r.title);
              return (
                <div
                  key={i}
                  className={`card ${isActive ? "active" : ""}`}
                  onClick={() => toggleRole(r.title)}
                >
                  <div className="icon">{r.icon}</div>
                  <div className="card-title">{r.title}</div>
                  <div className="card-desc">{r.desc}</div>
                </div>
              );
            })}
          </div>
          <div id="blank"></div>
          <button disabled={!isFormComplete} 
              style={{opacity: !isFormComplete ? 0.5 : 1,  // 비활성화되면 반투명
                cursor: !isFormComplete ? 'not-allowed' : 'pointer', // 비활성화되면 커서 변경
                transition: 'opacity 0.3s ease', // 부드러운 효과
              }}
              className="next-btn">다음 단계로 →</button>
        </div>
      </div>
    </div>
  );
}
