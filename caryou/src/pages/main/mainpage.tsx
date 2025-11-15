// pages/main/MainPage.tsx
import React, { useEffect, useState } from 'react';
import '../../style/main/mainpage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MoodType = "sad" | "soso" | "neutral" | "happy" | "great";

const BASE_URL = "http://52.79.172.1:4000";

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

interface JobItem {
  id: number;
  title: string;
  company: string;
  jobCategory: string;
  career: string;
  description: string;
  url?: string;
}

/** ⭐ Mood → StressLevel 변환 */
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

/** ⭐ 직무명 → 아이콘 매핑 */
const getPositionEmoji = (positionName: string = "") => {
  const name = positionName.toLowerCase();

  if (name.includes("프론트") || name.includes("front")) return "🖥️";
  if (name.includes("백엔드") || name.includes("back")) return "🛠️";
  if (name.includes("pm") || name.includes("기획") || name.includes("프로덕트")) return "📌";
  if (name.includes("데이터") || name.includes("ai") || name.includes("ml")) return "📊";
  if (name.includes("디자") || name.includes("design")) return "🎨";
  if (name.includes("마케팅")) return "📣";
  if (name.includes("게임")) return "🎮";

  return "💼";
};

const MainPage: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("accessToken"));
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const [dailyKeyword, setDailyKeyword] = useState<DailyKeyword | null>(null);
  const [dailyReport, setDailyReport] = useState<DailyReport | null>(null);
  const [showFull, setShowFull] = useState(false);

  const [jobList, setJobList] = useState<JobItem[]>([]);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${y}년 ${Number(m)}월 ${Number(d)}일`;
  };

  /** ⭐ 기분 제출 */
  const submitMood = async () => {
    if (!selectedMood) return;

    const stressLevel = moodToStressLevel(selectedMood);

    try {
      await fetch(`${BASE_URL}/attend`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stressLevel }),
      });

      setShowMoodModal(false);

    } catch (e) {
      console.error("submitMood error:", e);
      localStorage.removeItem("accessToken");
      alert("서버 오류가 발생했습니다.");
    }
  };

  /** ⭐ 추천 공고 API */
  const loadRecommendedJobs = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(`${BASE_URL}/job/recommended?numOfRows=10`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (Array.isArray(res.data.jobs)) {
        const mapped = res.data.jobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.companyName,
          jobCategory: job.category?.name ?? "",
          career: job.position?.name ?? "",
          description: job.description,
          url: job.sourceUrl,
        }));
        setJobList(mapped);
      }

    } catch (e) {
      console.error("추천 공고 불러오기 실패:", e);
    }
  };

  /** ⭐ 전체 로딩 */
  useEffect(() => {
    const fetchAll = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const attendRes = await fetch(`${BASE_URL}/attend/today`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let attendJson = null;

        if (attendRes.ok) {
          const text = await attendRes.text();
          if (text) {
            try { attendJson = JSON.parse(text); } catch { }
          }
        }

        if (!attendJson) setShowMoodModal(true);

        const kRes = await fetch(`${BASE_URL}/api/daily/keyword`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (kRes.ok) setDailyKeyword(await kRes.json());

        const rRes = await fetch(`${BASE_URL}/api/daily/report`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (rRes.ok) setDailyReport(await rRes.json());

        loadRecommendedJobs();

      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchAll();
  }, []);

  /** ⭐ 로그아웃 */
  const logout = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    try {
      if (token) {
        await axios.post(`${BASE_URL}/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch { }

    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다!");
  };

  return (
    <div className="main-container">
      {/* 모달 */}
      {showMoodModal && isLoggedIn && (
        <div className="mood-modal-overlay">
          <div className="mood-modal">
            <div className="mood-title">오늘의 기분은 어떠세요?</div>

            <div className="mood-icons">
              <span className={`mood-icon ${selectedMood === "sad" ? "selected" : ""}`} onClick={() => setSelectedMood("sad")}>😢</span>
              <span className={`mood-icon ${selectedMood === "soso" ? "selected" : ""}`} onClick={() => setSelectedMood("soso")}>☹️</span>
              <span className={`mood-icon ${selectedMood === "neutral" ? "selected" : ""}`} onClick={() => setSelectedMood("neutral")}>😐</span>
              <span className={`mood-icon ${selectedMood === "happy" ? "selected" : ""}`} onClick={() => setSelectedMood("happy")}>😊</span>
              <span className={`mood-icon ${selectedMood === "great" ? "selected" : ""}`} onClick={() => setSelectedMood("great")}>😁</span>
            </div>

            <button className="mood-submit-btn" onClick={submitMood} disabled={!selectedMood}>확인</button>
          </div>
        </div>
      )}

      {/* 상단바 */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="nav-logo-circle"><span className="nav-logo-emoji">🚀</span></div>
            <span className="nav-title">CARYOU</span>
          </div>

          <div className="nav-right">
            <Link to="/" className="nav-item nav-item-active">홈</Link>
            <Link to="/mypage" className="nav-item">마이페이지</Link>
            <Link to="/community" className="nav-item">커뮤니티</Link>
            {isLoggedIn ? (
              <button onClick={logout} className="login-btn">로그아웃</button>
            ) : (
              <Link to="/login" className="login-btn">로그인</Link>
            )}
          </div>
        </div>
      </header>

      {/* 메인 */}
      <main className="main-content">
        
        {/* 키워드 */}
        <section className="keyword-section">
          <div className="keyword-card">
            <div className="keyword-header">
              <div className="keyword-icon-circle"><span>🔑</span></div>
              <div className="keyword-header-text">
                <span className="keyword-title">오늘의 키워드</span>
                <span className="keyword-date">{dailyKeyword ? formatDate(dailyKeyword.date) : "Loading..."}</span>
              </div>
            </div>

            <div className="keyword-main">
              <div className="keyword-main-icon-circle"><span>🤖</span></div>
              <div className="keyword-main-title">
                {dailyKeyword && <ReactMarkdown remarkPlugins={[remarkGfm]}>{dailyKeyword.keyword}</ReactMarkdown>}
              </div>
              <div className="keyword-main-desc">
                {dailyKeyword && <ReactMarkdown remarkPlugins={[remarkGfm]}>{dailyKeyword.description}</ReactMarkdown>}
              </div>
            </div>
          </div>
        </section>

        {/* 리포트 */}
        <section className="report-section">
          <div className="section-title-row">
            <div className="section-title-icon-circle clock"><span>🕒</span></div>
            <span className="section-title-text">오늘 읽을 3분 산업 리포트</span>
          </div>

          <div className="report-card">
            <div className="report-header">
              <div className="report-icon-circle"><span>📈</span></div>
              <div className="report-text-wrap">
                <div className="report-title">
                  {dailyReport && <ReactMarkdown remarkPlugins={[remarkGfm]}>{dailyReport.title}</ReactMarkdown>}
                </div>
                <div className="report-desc">
                  {dailyReport && <ReactMarkdown remarkPlugins={[remarkGfm]}>{dailyReport.summary}</ReactMarkdown>}
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
              <div className="report-full-box markdown-content">
                {dailyReport && <ReactMarkdown remarkPlugins={[remarkGfm]}>{dailyReport.content}</ReactMarkdown>}
              </div>
            )}
          </div>
        </section>

        {/* 추천 공고 */}
        <section className="job-section">
          <div className="section-title-row">
            <div className="section-title-icon-circle briefcase"><span>💼</span></div>
            <span className="section-title-text">내 관심 직무 추천 공고</span>
          </div>

          <div className="job-card-list">
            {jobList.length === 0 ? (
              <div>추천 공고 로딩 중...</div>
            ) : (
              jobList.map(job => (
                <div className="job-card" key={job.id}>
                  <div className="job-card-header">
                    <div className="job-icon-square">{getPositionEmoji(job.career)}</div>
                    <div className="job-header-text">
                      <div className="job-position">{job.title}</div>
                      <div className="job-company">{job.company}</div>
                    </div>
                  </div>

                  <div className="job-body">
                    <div className="job-desc">{job.description}</div>
                    <div className="job-meta">{job.career}</div>
                  </div>

                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    <button className="job-scrap-btn">🔗</button>
                  </a>
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  );
};

export default MainPage;
