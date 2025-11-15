import React, { useState } from "react";
import "../../style/main/main.css"; // 기존 CSS 그대로 사용
import { useNavigate } from "react-router-dom";

// 예시 데이터
const activityData = [
  { date: "2025-11-10", keyword: true, job: true },
  { date: "2025-11-11", keyword: false, job: true },
  { date: "2025-11-12", keyword: true, job: false },
  { date: "2025-11-13", keyword: true, job: true },
  { date: "2025-11-14", keyword: false, job: false },
];

const stressLevels = ["낮음", "보통", "높음"];

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedStress, setSelectedStress] = useState<string | null>(null);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <div className="logo-circle">C</div>
          <div>
            <h1>CARYOU</h1>
            <p>나만 믿어라 — 너의 커리어는 내가 캐리한다</p>
          </div>
        </div>

        <nav className="nav-buttons">
          <button onClick={() => navigate("/")}>홈</button>
          <button className="primary" onClick={() => navigate("/mypage")}>마이페이지</button>
          <button>커뮤니티</button>
          <button>오늘의 루틴</button>
        </nav>
      </header>

      <main className="main-grid">
        {/* Left Column: 캘린더 + 활동 기록 */}
        <section className="left-col">
          <div className="card">
            <h2>캘린더 활동 기록</h2>
            <p>출석, 키워드 미션, 채용 공고 수행 내역 확인</p>

            <div className="calendar-row">
              {activityData.map((day, i) => (
                <div key={i} className="calendar-box">
                  <div className={`circle ${day.keyword ? "blue" : "gray"}`}></div>
                  <div className={`circle ${day.job ? "green" : "gray"}`}></div>
                </div>
              ))}
            </div>

            <div className="legend">
              <span><span className="circle blue"></span> 키워드 미션 완료</span>
              <span><span className="circle green"></span> 채용 공고 확인</span>
            </div>
          </div>
        </section>

        {/* Right Column: 스트레스 체크 + 루틴 */}
        <aside className="right-col">
          <div className="card">
            <h2>취업 스트레스 체크</h2>
            <p>오늘의 스트레스 상태를 선택하면 루틴을 추천합니다.</p>
            <div className="mood-buttons">
              {stressLevels.map((level) => (
                <button
                  key={level}
                  className={selectedStress === level ? "selected" : ""}
                  onClick={() => setSelectedStress(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {selectedStress && (
            <div className="card">
              <h3>추천 루틴</h3>
              {selectedStress === "낮음" && (
                <ul>
                  <li>오늘은 가벼운 키워드 미션 수행</li>
                  <li>짧은 산업 뉴스 읽기</li>
                  <li>채용 공고 확인</li>
                </ul>
              )}
              {selectedStress === "보통" && (
                <ul>
                  <li>키워드 미션 1개 완료</li>
                  <li>3분 산업 리포트 읽기</li>
                  <li>짧은 면접 예상 질문 작성</li>
                </ul>
              )}
              {selectedStress === "높음" && (
                <ul>
                  <li>휴식과 감정 회복 루틴</li>
                  <li>가벼운 키워드 미션 1개</li>
                  <li>심호흡/명상 5분</li>
                </ul>
              )}
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};

export default MyPage;
