import "./signup.css";

export default function Signup3() {
  const stress = [
    { label: "전혀 없어요", icon: "😊" },
    { label: "조금 있어요", icon: "🙂" },
    { label: "보통이에요", icon: "😐" },
    { label: "조금 많아요", icon: "🤯" },
    { label: "많이 있어요", icon: "😵" }
  ];
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
          {stress.map((s, i) => (
            <div key={i} className="card">
            <div className="icon">{s.icon}</div>
            <div className="card-title">{s.label}</div>
            </div>
            ))}
          </div>


          <div className="bottom"></div>


          <div id="blank"></div>
          <button className="next-btn">가입 완료 ✔</button>
        </div>
      </div>
    </div>
  );
}
