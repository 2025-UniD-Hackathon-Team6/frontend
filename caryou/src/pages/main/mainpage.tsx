import React, { useEffect, useState } from 'react';
import '../../style/main/mainpage.css';
import { Link } from 'react-router-dom';

type MoodType = "sad" | "soso" | "neutral" | "happy" | "great";

const BASE_URL = "http://52.79.172.1:4000";
const ACCESS_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlciIsImlhdCI6MTc2MzIzMjMyMSwiZXhwIjoxNzYzMjM0MTIxLCJpc3MiOiJjYXJ5b3UuZGV2In0.zYkX4lnOZHEmtMbn_6NMNCDvYp94zFS_ueO1oMITW2s";

interface DailyKeyword {
  date: string;
  keyword: string;
  description: string;
}

interface DailyReport {
  date: string;
  title: string;
  summary: string;
  content: string;
  position: {
    name: string;
    category: string;
  };
}

// ⭐ Mood → StressLevel 변환
const moodToStressLevel = (mood: MoodType): string => {
  switch (mood) {
    case "sad":
      return "ExtremelyHigh";
    case "soso":
      return "High";
    case "neutral":
      return "Middle";
    case "happy":
      return "Low";
    case "great":
      return "ExtremelyLow";
    default:
      return "Middle";
  }
};

const MainPage: React.FC = () => {
  const [dailyKeyword, setDailyKeyword] = useState<DailyKeyword | null>(null);
  const [dailyReport, setDailyReport] = useState<DailyReport | null>(null);
  const [showFull, setShowFull] = useState(false);

  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  // 날짜 출력 포맷
  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${y}년 ${Number(m)}월 ${Number(d)}일`;
  };

  const stripMd = (t?: string) => t?.replace(/\*\*/g, "") ?? "";

  // ⭐ 기분 제출 → 백엔드로 출석 체크 저장
  const submitMood = async () => {
    if (!selectedMood) return;

    const stressLevel = moodToStressLevel(selectedMood);

    try {
      const res = await fetch(`${BASE_URL}/attend`, {
        method: "POST",
        headers: {
          Authorization: ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stressLevel }),
      });

      if (!res.ok) {
        console.warn("출석 저장 실패", res.status);
      }

      setShowMoodModal(false);
    } catch (e) {
      console.error("submitMood error:", e);
      setShowMoodModal(false);
    }
  };

  // ⭐ 페이지 로딩 → 출석 체크 여부 확인
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // --- 출석 여부 확인 (GET /api/attend/today)
        const attendRes = await fetch(`${BASE_URL}/attend/today`, {
          headers: { Authorization: ACCESS_TOKEN },
        });

        const attendJson = await attendRes.json();

        if (attendJson === null) {
          setShowMoodModal(true);  // 출석 안 함 → 모달 띄우기
        } else {
          setShowMoodModal(false); // 이미 출석 → 모달 X
        }
        
        // 1) 오늘의 키워드
        const kRes = await fetch(`${BASE_URL}/api/daily/keyword`, {
          headers: { Authorization: ACCESS_TOKEN },
        });
        const keywordJson = await kRes.json();

        // 2) 리포트
        const rRes = await fetch(`${BASE_URL}/api/daily/report`, {
          headers: { Authorization: ACCESS_TOKEN },
        });
        const reportJson = await rRes.json();

        setDailyKeyword(keywordJson);
        setDailyReport(reportJson);
      } catch (e) {
        console.error("API error:", e);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="main-container">

      {/* ⭐ 오늘 기분 선택 모달 */}
      {showMoodModal && (
        <div className="mood-modal-overlay">
          <div className="mood-modal">
            <div className="mood-title">오늘의 기분은 어떠세요?</div>

            <div className="mood-icons">
              <span
                className={`mood-icon ${selectedMood === "sad" ? "selected" : ""}`}
                onClick={() => setSelectedMood("sad")}
              >😢</span>

              <span
                className={`mood-icon ${selectedMood === "soso" ? "selected" : ""}`}
                onClick={() => setSelectedMood("soso")}
              >☹️</span>

              <span
                className={`mood-icon ${selectedMood === "neutral" ? "selected" : ""}`}
                onClick={() => setSelectedMood("neutral")}
              >😐</span>

              <span
                className={`mood-icon ${selectedMood === "happy" ? "selected" : ""}`}
                onClick={() => setSelectedMood("happy")}
              >😊</span>

              <span
                className={`mood-icon ${selectedMood === "great" ? "selected" : ""}`}
                onClick={() => setSelectedMood("great")}
              >😁</span>
            </div>

            <button
              className="mood-submit-btn"
              onClick={submitMood}
              disabled={!selectedMood}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 상단바 */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="nav-logo-circle">
              {/* 로켓 아이콘 들어가는 원형 로고 */}
              <span className="nav-logo-emoji">🚀</span>
            </div>
            <span className="nav-title">CARYOU</span>
          </div>
          <div className="nav-right">
            <Link to="/" className="nav-item nav-item-active">홈</Link>
            <Link to="/mypage" className="nav-item">마이페이지</Link>
            <Link to="/community" className="nav-item">커뮤니티</Link>
            <Link to="/login" className="login-btn">로그인</Link>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* 메인 문구 */}
        <section className="hero-section">
          <h1 className="hero-title">
            오늘도 멋진 커리어를 향해{' '}
            <span className="hero-highlight">한 걸음</span> 나아가세요! 🚀
          </h1>
          <p className="hero-sub">
            CARYOU가 당신의 커리어 여정을 응원합니다. 오늘의 키워드로 시작해보세요!
          </p>
        </section>

        {/* 오늘의 키워드 카드 */}
        <section className="keyword-section">
          <div className="keyword-card">
            <div className="keyword-header">
              <div className="keyword-icon-circle">
                <span className="keyword-icon">🔑</span>
              </div>
              <div className="keyword-header-text">
                <span className="keyword-title">오늘의 키워드</span>
                <span className="keyword-date">{dailyKeyword ? formatDate(dailyKeyword.date) : "Loading..."}</span>
              </div>
            </div>

            <div className="keyword-main">
              <div className="keyword-main-icon-circle">
                <span className="keyword-main-icon">🤖</span>
              </div>
              <div className="keyword-main-title">{dailyKeyword ? stripMd(dailyKeyword.keyword) : "Loading..."}</div>
              <div className="keyword-main-desc">
                {dailyKeyword ? stripMd(dailyKeyword.description) : ""}
              </div>
            </div>

            <div className="keyword-sub-boxes">
              <div className="sub-box">
                <div className="sub-icon">📄</div>
                <div className="sub-text">관련 기사 읽기</div>
              </div>
              <div className="sub-box">
                <div className="sub-icon">💬</div>
                <div className="sub-text">면접 질문 준비</div>
              </div>
              <div className="sub-box">
                <div className="sub-icon">🧩</div>
                <div className="sub-text">프로젝트 아이디어</div>
              </div>
            </div>
          </div>
        </section>

        {/* 오늘 읽을 3분 산업 리포트 */}
        <section className="report-section">
          <div className="section-title-row">
            <div className="section-title-icon-circle clock">
              <span>🕒</span>
            </div>
            <span className="section-title-text">오늘 읽을 3분 산업 리포트</span>
          </div>

          <div className="report-card">
            <div className="report-header">
              <div className="report-icon-circle">
                <span>📈</span>
              </div>
              <div className="report-text-wrap">
                <div className="report-title">{dailyReport ? stripMd(dailyReport.title) : "Loading..."}</div>
                <div className="report-desc">
                  {dailyReport ? stripMd(dailyReport.summary) : ""}
                </div>
                <div className="report-tags">
                  <span className="tag tag-blue">#{dailyReport?.position.category}</span>
                  <span className="tag tag-green">#{dailyReport?.position.name}</span>
                </div>
              </div>
            </div>
            {!showFull ? (
              <button className="report-btn" onClick={() => setShowFull(true)}>
                리포트 자세히 읽기
              </button>
            ) : (
              <div
                style={{
                  marginTop: 16,
                  padding: 16,
                  borderRadius: 12,
                  background: "#f5f5f7",
                  whiteSpace: "pre-wrap",
                }}
              >
                {stripMd(dailyReport?.content)}
              </div>
            )}
          </div>
        </section>

        {/* 내 관심 직무 추천 공고 */}
        <section className="job-section">
          <div className="section-title-row">
            <div className="section-title-icon-circle briefcase">
              <span>💼</span>
            </div>
            <span className="section-title-text">내 관심 직무 추천 공고</span>
          </div>

          <div className="job-card-list">
            <div className="job-card">
              <div className="job-card-header">
                <div className="job-icon-square code">
                  <span>{'</>'}</span>
                </div>
                <div className="job-header-text">
                  <div className="job-position">프론트엔드 개발자</div>
                  <div className="job-company">네이버</div>
                </div>
              </div>
              <div className="job-body">
                <div className="job-desc">React, Vue.js 경력자 우대</div>
                <div className="job-meta">경력 3년↑</div>
              </div>
              <button className="job-scrap-btn">🔖</button>
            </div>

            <div className="job-card">
              <div className="job-card-header">
                <div className="job-icon-square data">
                  <span>📊</span>
                </div>
                <div className="job-header-text">
                  <div className="job-position">데이터 분석가</div>
                  <div className="job-company">카카오</div>
                </div>
              </div>
              <div className="job-body">
                <div className="job-desc">Python, SQL 필수</div>
                <div className="job-meta job-new">신입 가능</div>
              </div>
              <button className="job-scrap-btn">🔖</button>
            </div>

            <div className="job-card">
              <div className="job-card-header">
                <div className="job-icon-square ai">
                  <span>🤖</span>
                </div>
                <div className="job-header-text">
                  <div className="job-position">AI 엔지니어</div>
                  <div className="job-company">구글 코리아</div>
                </div>
              </div>
              <div className="job-body">
                <div className="job-desc">머신러닝, 딥러닝 전문가</div>
                <div className="job-meta">경력 5년↑</div>
              </div>
              <button className="job-scrap-btn">🔖</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
