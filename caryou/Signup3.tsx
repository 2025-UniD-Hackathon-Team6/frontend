import "./signup.css";
import { useState } from "react";

export default function Signup3() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const isFormComplete = selectedRole !== null; // 선택되면 버튼 활성화

  const stress = [
    { label: "전혀 없어요", icon: "😊" },
    { label: "조금 있어요", icon: "🙂" },
    { label: "보통이에요", icon: "😐" },
    { label: "조금 많아요", icon: "🤯" },
    { label: "많이 있어요", icon: "😵" }
  ];

  const toggleRole = (title: string) => {
    if (selectedRole === title) {
      // 이미 선택된 카드면 해제
      setSelectedRole(null);
    } else {
      // 새 카드 선택 시 이전 선택 해제 후 새 카드 선택
      setSelectedRole(title);
    }
  };


  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1 className="title">CARYOU</h1>
        <p className="subtitle">나만의 커리어 여정을 시작해보세요! 🚀</p>

        <div className="steps">
          <div className="step">1</div>
          <div className="step">2</div>
          <div className="step active">3</div>
        </div>

        <div className="form-box">
          <h2 className="form-title">현재 스트레스 수준은 어떠신가요?</h2>
          <p className="subtitle">솔직하게 선택해주세요. 더 나은 서비스를 제공해드릴게요!</p>

          <div className="grid">
            {stress.map((r, i) => {
              const isActive = selectedRole === r.label;
              return (
                <div
                  key={i}
                  className={`card ${isActive ? "active" : ""}`}
                  onClick={() => toggleRole(r.label)}
                >
                  <div className="icon">{r.icon}</div>
                  <div className="card-title">{r.label}</div>
                  <div className="card-desc">{r.label}</div>
                </div>
              );
            })}
          </div>
          <div className="bottom"></div>
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
