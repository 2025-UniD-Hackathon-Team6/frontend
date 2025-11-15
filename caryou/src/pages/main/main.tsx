import React, { useState } from "react";
import "../../style/main/main.css";
import { useNavigate } from "react-router-dom";

const todayKeyword = {
  title: "AI 생산성 혁신",
  tag: "Tech · AI",
  hint: "면접 대비: ‘AI가 귀하의 직무를 어떻게 바꿀까요?’ 3분 준비",
  bullets: [
    "기업의 자동화 사례 2개 조사",
    "직무 적용 1페이지 요약",
    "예상 질문 3개 작성",
  ],
};

const threeMinReport = {
  title: "오늘의 3분 산업 리포트",
  readTime: "3분",
  summary:
    "국내 스타트업에서 AI 도입이 가속화되며 생산성 도구(코드 자동화, 문서 생성)가 채용 트렌드에 영향을 미치고 있습니다. 지원 직무에서의 구체적 적용 사례를 생각해보세요.",
};

const jobs = [
  { id: 1, title: "데이터 엔지니어", company: "테크플로우", location: "서울", tags: ["빅데이터", "Python"] },
  { id: 2, title: "서비스 기획(구독모델)", company: "클릭서브", location: "서울", tags: ["기획", "A/B 테스트"] },
  { id: 3, title: "AI 리서치 인턴", company: "알파랩", location: "원격", tags: ["리서치", "ML"] },
];

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [showDailyPopup, setShowDailyPopup] = useState(true);
  const [mood, setMood] = useState<string | null>(null);

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
          <button onClick={() => navigate("/mypage")}>마이페이지</button>
          <button>커뮤니티</button>
          <button className="primary">오늘의 루틴</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-grid">
        {/* Left Column */}
        <section className="left-col">
          {/* 오늘의 키워드 */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2>오늘의 키워드</h2>
                <p>트렌드 기반 추천 키워드 · 면접 대비 포인트</p>
              </div>
              <div className="level-badge">Beginner</div>
            </div>

            <div className="keyword-content">
              <div className="keyword-card">
                <div>
                  <div className="tag">{todayKeyword.tag}</div>
                  <h3>{todayKeyword.title}</h3>
                  <p>{todayKeyword.hint}</p>
                </div>
                <div className="reward-circle">+10 XP</div>
              </div>

              <ul className="bullets">
                {todayKeyword.bullets.map((b, i) => (
                  <li key={i}>
                    <div className="bullet-dot"></div>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="buttons-row">
                <button className="primary-btn">지금 시작하기</button>
                <button className="secondary-btn">관련 기사 보기</button>
              </div>
            </div>
          </div>

          {/* 3분 리포트 */}
          <div className="card">
            <div className="card-header">
              <h2>{threeMinReport.title}</h2>
              <span>{threeMinReport.readTime} · 핵심만 골라서</span>
            </div>
            <p className="report-text">{threeMinReport.summary}</p>
            <div className="buttons-row">
              <button className="primary-btn">자세히 읽기</button>
              <button className="secondary-btn">원문 기사 링크</button>
            </div>
          </div>

          {/* 추천 채용 */}
          <div className="card">
            <div className="card-header">
              <h2>추천 채용 공고</h2>
              <p>관심 직무 기반 최신 공고</p>
            </div>
            <div className="jobs-list">
              {jobs.map((job) => (
                <div key={job.id} className="job-item">
                  <div>
                    <h3>{job.title}</h3>
                    <span>{job.company} · {job.location}</span>
                  </div>
                  <div className="job-right">
                    <div className="tags">
                      {job.tags.map((t, i) => (
                        <span key={i} className="tag">{t}</span>
                      ))}
                    </div>
                    <button className="secondary-btn small-btn">저장</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="right-align">
              <button className="secondary-btn">더 불러오기</button>
            </div>
          </div>
        </section>

        {/* Right Column */}
        <aside className="right-col">
          <div className="card">
            <h4>오늘의 출석</h4>
            <div className="attendance">
              <div className="circle-count">3</div>
              <div className="attendance-info">
                <span>오늘 수행 미션</span>
                <p>키워드 미션 완료하기</p>
                <span className="reward-text">보상: XP + 배지</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h4>마이 캘린더</h4>
            <span>활동 기록과 키워드 아카이브를 확인하세요.</span>
            <div className="calendar-row">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={`calendar-box ${i % 3 === 0 ? 'active' : ''}`}></div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4>상태 체크</h4>
            <p>하루 접속 시 간단한 감정 체크로 루틴을 추천합니다.</p>
            <div className="mood-buttons">
              <button className={mood==='good'?'selected':''} onClick={()=>setMood('good')}>괜찮아요</button>
              <button className={mood==='tired'?'selected':''} onClick={()=>setMood('tired')}>피곤해요</button>
            </div>
          </div>
        </aside>
      </main>

      {/* Daily Popup */}
      {showDailyPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-header">
              <h3>오늘 하루 상태는 어때요?</h3>
              <button onClick={()=>setShowDailyPopup(false)}>닫기</button>
            </div>
            <div className="popup-buttons">
              <button onClick={()=>{setMood('great'); setShowDailyPopup(false);}}>오늘은 좋아요</button>
              <button onClick={()=>{setMood('so-so'); setShowDailyPopup(false);}}>괜찮아요</button>
              <button onClick={()=>{setMood('stressed'); setShowDailyPopup(false);}} className="primary-btn">지금 스트레스 받아요</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
