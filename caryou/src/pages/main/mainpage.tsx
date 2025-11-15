import React, { useEffect, useState } from 'react';
import '../../style/main/mainpage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

type MoodType = "sad" | "soso" | "neutral" | "happy" | "great";

const BASE_URL = "http://52.79.172.1:4000";
//const ACCESS_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlciIsImlhdCI6MTc2MzIzMjMyMSwiZXhwIjoxNzYzMjM0MTIxLCJpc3MiOiJjYXJ5b3UuZGV2In0.zYkX4lnOZHEmtMbn_6NMNCDvYp94zFS_ueO1oMITW2s";

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
    case "sad": return "ExtremelyHigh";
    case "soso": return "High";
    case "neutral": return "Middle";
    case "happy": return "Low";
    case "great": return "ExtremelyLow";
    default: return "Middle";
  }
};

const MainPage: React.FC = () => {
  // ⭐ 출석/기분 상태 관리
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  // ⭐ 키워드 / 리포트 데이터
  const [dailyKeyword, setDailyKeyword] = useState<DailyKeyword | null>(null);
  const [dailyReport, setDailyReport] = useState<DailyReport | null>(null);
  const [showFull, setShowFull] = useState(false);

  // ⭐ 날짜 포맷
  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${y}년 ${Number(m)}월 ${Number(d)}일`;
  };

  const stripMd = (t?: string) => t?.replace(/\*\*/g, "") ?? "";

  // ⭐ 기분 제출 → 출석 저장
  const submitMood = async () => {
    if (!selectedMood) return;

    const stressLevel = moodToStressLevel(selectedMood);

    try {
      const res = await fetch(`${BASE_URL}/attend`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stressLevel }),
      });

      if (!res.ok) {
        console.warn("출석 저장 실패:", res.status);
      }

      setShowMoodModal(false);
    } catch (e) {
      console.error("submitMood error:", e);
      setShowMoodModal(false);
    }
  };


  // ⭐ 페이지 로딩 → 출석 여부 + 키워드/리포트 로딩
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // ✔ 출석 여부 확인
        const attendRes = await fetch(`${BASE_URL}/attend/today`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });


        const attendJson = await attendRes.json();

        if (attendJson === null) {
          // 출석 안 했다 → 모달 열기
          setShowMoodModal(true);
        }

        // ✔ 오늘의 키워드
        const kRes = await fetch(`${BASE_URL}/api/daily/keyword`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setDailyKeyword(await kRes.json());

        // ✔ 오늘의 리포트
        const rRes = await fetch(`${BASE_URL}/api/daily/report`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setDailyReport(await rRes.json());
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchAll();
  }, []);

  /** 로그인 여부 */
  const isTokenExist = () => {
    return !!localStorage.getItem("accessToken");
  };

  /** 로그아웃 */
  const logout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log(response);
      localStorage.removeItem("accessToken");
      alert("로그아웃 성공");
    } catch (error) {
      alert("로그아웃 요청 실패 (404)");
    }
  };

  return (
    <div className="main-container">

      {/* ⭐ 기분 선택 모달 */}
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
              <span className="nav-logo-emoji">🚀</span>
            </div>
            <span className="nav-title">CARYOU</span>
          </div>

          <div className="nav-right">
            <Link to="/" className="nav-item nav-item-active">홈</Link>
            <Link to="/mypage" className="nav-item">마이페이지</Link>
            <Link to="/community" className="nav-item">커뮤니티</Link>

            {isTokenExist() ? (
              <button onClick={logout} className="login-btn">로그아웃</button>
            ) : (
              <Link to="/login" className="login-btn">로그인</Link>
            )}
          </div>
        </div>
      </header>

      {/* ========= 메인 콘텐츠 ========= */}
      <main className="main-content">

        {/* 히어로 영역 */}
        <section className="hero-section">
          <h1 className="hero-title">
            오늘도 멋진 커리어를 향해{' '}
            <span className="hero-highlight">한 걸음</span> 나아가세요! 🚀
          </h1>
          <p className="hero-sub">CARYOU가 당신의 커리어 여정을 응원합니다.</p>
        </section>

        {/* 오늘의 키워드 */}
        <section className="keyword-section">
          <div className="keyword-card">
            <div className="keyword-header">
              <div className="keyword-icon-circle">
                <span>🔑</span>
              </div>
              <div className="keyword-header-text">
                <span className="keyword-title">오늘의 키워드</span>
                <span className="keyword-date">
                  {dailyKeyword ? formatDate(dailyKeyword.date) : "Loading..."}
                </span>
              </div>
            </div>

            <div className="keyword-main">
              <div className="keyword-main-icon-circle">
                <span>🤖</span>
              </div>
              <div className="keyword-main-title">
                {dailyKeyword ? stripMd(dailyKeyword.keyword) : ""}
              </div>
              <div className="keyword-main-desc">
                {dailyKeyword ? stripMd(dailyKeyword.description) : ""}
              </div>
            </div>
          </div>
        </section>

        {/* 오늘의 리포트 */}
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
                <div className="report-title">
                  {dailyReport ? stripMd(dailyReport.title) : ""}
                </div>
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
              <button
                className="report-btn"
                onClick={() => setShowFull(true)}
              >
                리포트 자세히 읽기
              </button>
            ) : (
              <div className="report-full-box">
                {stripMd(dailyReport?.content)}
              </div>
            )}
          </div>
        </section>

        {/* 추천 공고 */}
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
                <div className="job-icon-square code">{`</>`}</div>
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
                <div className="job-icon-square data">📊</div>
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
                <div className="job-icon-square ai">🤖</div>
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
