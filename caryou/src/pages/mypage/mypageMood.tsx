// pages/mypage/MyPageMood.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/main/mainpage.css";
import "../../style/mypage/mypage.css";

const BASE_URL = "http://52.79.172.1:4000";

interface RoutineResponse {
  date: string;
  stressLevel: string;
  position: {
    id: number;
    name: string;
    category: string;
  };
  routines: string[];
}

/** ⭐ 스트레스 레벨 변환 */
const convertStressLevel = (level: string) => {
  switch (level) {
    case "ExtremelyHigh": return "5/5 😢";
    case "High": return "4/5 ☹️";
    case "Middle": return "3/5 😐";
    case "Low": return "2/5 🙂";
    case "ExtremelyLow": return "1/5 😁";
    default: return level;
  }
};

const MyPageMood: React.FC = () => {
  const navigate = useNavigate();

  /** 로그인 여부 */
  const isTokenExist = () => !!localStorage.getItem("accessToken");

  /** 사용자 이름 저장 */
  const [userName, setUserName] = useState("사용자");

  /** 루틴 데이터 */
  const [routineData, setRoutineData] = useState<RoutineResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [routineError, setRoutineError] = useState<string | null>(null);

  /** 로그아웃 */
  const logout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        }
      );
      localStorage.removeItem("accessToken");
      alert("로그아웃 성공");
      navigate("/login");
    } catch {
      alert("로그아웃 요청 실패 (404)");
    }
  };

  /** ⭐ 사용자 프로필 불러오기 */
  const loadProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });

      if (res.data?.name) setUserName(res.data.name);
    } catch (e) {
      console.error("프로필 불러오기 실패:", e);
    }
  };

  /** ⭐ 오늘의 스트레스 기반 학습 루틴 불러오기 */
  const loadRoutine = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/attend/routines`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });

      setRoutineData(res.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      if (error.response?.status === 401) {
        alert("로그인 세션 만료");
        localStorage.removeItem("accessToken");
        navigate("/login");
        return;
      }

      if (error.response?.status === 404) {
        setRoutineError("출석 기록 또는 관심 직무가 없습니다.");
        return;
      }

      setRoutineError("루틴을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    loadProfile();   // ⭐ 이름 불러오기
    loadRoutine();
  }, []);

  return (
    <div className="main-container">

      {/* 상단바 */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="nav-logo-circle"><span className="nav-logo-emoji">🚀</span></div>
            <span className="nav-title">CARYOU</span>
          </div>

          <div className="nav-right">
            <Link to="/" className="nav-item">홈</Link>
            <Link to="/mypage" className="nav-item nav-item-active">마이페이지</Link>
            <Link to="/community" className="nav-item">커뮤니티</Link>

            {isTokenExist() ? (
              <button onClick={logout} className="login-btn">로그아웃</button>
            ) : (
              <Link to="/login" className="login-btn">로그인</Link>
            )}
          </div>
        </div>
      </header>

      <main className="mypage-content">

        {/* ⭐ 프로필 */}
        <section className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar-circle"><span>👤</span></div>
            <div className="profile-text">
              <div className="profile-name">{userName}님</div>
              <div className="profile-email">noonsong@example.com</div>
            </div>
          </div>
        </section>

        {/* 탭 */}
        <section className="mypage-tabs">
          <Link to="/mypage" className="tab-pill">대시보드</Link>
          <Link to="/mypage/calendar" className="tab-pill">활동 캘린더</Link>
          <Link to="/mypage/mood" className="tab-pill tab-pill-active">기분 기록</Link>
          <Link to="/mypage/settings" className="tab-pill">설정</Link>
        </section>

        {/* ⭐ 메인 그리드 */}
        <section className="mypage-grid">

          {/* 왼쪽 카드: 스트레스 루틴 */}
          <div className="card mission-card">
            <div className="mood-card-header">
              <div className="mood-icon-circle"><span>🎯</span></div>
              <span className="mood-card-title">스트레스 지수 기반 학습 미션</span>
            </div>

            <div className="mission-box">
              {loading && <div className="mission-loading">로딩 중...</div>}

              {routineError && <div className="mission-error">{routineError}</div>}

              {routineData && (
                <>
                  <div className="mission-level">
                    오늘의 스트레스 지수:{" "}
                    <strong>{convertStressLevel(routineData.stressLevel)}</strong>
                  </div>

                  <div className="mission-position">
                    관심 직무: <strong>{routineData.position.name}</strong>
                  </div>

                  {/* ⭐ 루틴 3개만 */}
                  <div className="mission-list">
                    {routineData.routines.slice(0, 3).map((text, idx) => (
                      <div className="mission-item" key={idx}>
                        <span className="mission-emoji">✨</span>
                        <span className="mission-text">{text.replace(/"/g, "")}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 오른쪽 최근 기분 카드 (기존 유지) */}
          <div className="card mood-recent-card">
            <div className="mood-card-header">
              <div className="mood-icon-circle"><span>📝</span></div>
              <span className="mood-card-title">최근 기분 기록</span>
            </div>

            <div className="mood-recent-list">
              <div className="mood-recent-item mood-recent-item-blue">
                <div className="mood-recent-left">
                  <div className="mood-emoji-circle mood-emoji-happy">😁</div>
                  <div className="mood-recent-text">
                    <div className="mood-recent-main">매우 좋은 하루였어요!</div>
                    <div className="mood-recent-sub">오늘</div>
                  </div>
                </div>
              </div>

              <div className="mood-recent-item mood-recent-item-yellow">
                <div className="mood-recent-left">
                  <div className="mood-emoji-circle mood-emoji-neutral">😐</div>
                  <div className="mood-recent-text">
                    <div className="mood-recent-main">무난했어요</div>
                    <div className="mood-recent-sub">어제</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
      </main>
    </div>
  );
};

export default MyPageMood;
