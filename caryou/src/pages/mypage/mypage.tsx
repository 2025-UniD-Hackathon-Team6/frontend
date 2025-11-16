// pages/mypage/mypage.tsx  (대시보드 화면)
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/main/mainpage.css';
import '../../style/mypage/mypage.css';
import axios from 'axios';

const BASE_URL = "http://52.79.172.1:4000";

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  /* ⭐ 로그인 상태 (UI 즉시 반영) */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("accessToken"));

  /* ⭐ 프로필 이름 */
  const [userName, setUserName] = useState<string>("사용자");

  const [weeklyCount, setWeeklyCount] = useState(0);
  const [weeklyDays, setWeeklyDays] = useState<boolean[]>([false, false, false, false, false, false, false]);

  /* ⭐ 로그아웃 */
  const logout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch {}

    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);  // ⭐ UI 즉시 변경
    alert("로그아웃 성공");
    navigate("/login");
  };

  /* -------- 날짜 유틸 -------- */
  const getWeekRange = () => {
    const today = new Date();
    const day = today.getDay();
    const diffToMonday = (day === 0 ? -6 : 1 - day);

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return { monday, sunday };
  };

  /* -------- 월간 출석 -------- */
  const loadAttendance = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attend/month`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const list = response.data;

      const today = new Date();
      const weekday = today.getDay();
      const diffToMonday = (weekday === 0 ? -6 : 1 - weekday);

      const monday = new Date(today);
      monday.setDate(today.getDate() + diffToMonday);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      const format = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
          d.getDate()
        ).padStart(2, "0")}`;

      const mondayStr = format(monday);
      const sundayStr = format(sunday);

      const flags = [false, false, false, false, false, false, false];

      const thisWeek = list.filter((item: any) => {
        const d = item.checkinDate; // YYYY-MM-DD 형태
        return d >= mondayStr && d <= sundayStr;
      });

      setWeeklyCount(thisWeek.length);

      thisWeek.forEach((item: any) => {
        const d = new Date(item.checkinDate);
        const w = d.getDay();
        const idx = w === 0 ? 6 : w - 1;
        flags[idx] = true;
      });

      setWeeklyDays(flags);

    } catch (e) {
      console.error("Attendance load error:", e);
    }
  };

  /* ⭐ 프로필 API */
  const loadProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (res.data?.name) setUserName(res.data.name);

    } catch (e) {
      console.error("프로필 불러오기 실패:", e);
    }
  };

  /* ⭐ 최초 렌더링 */
  useEffect(() => {
    if (isLoggedIn) {
      loadProfile();
      loadAttendance();
    }
  }, [isLoggedIn]);

  return (
    <div className="main-container">

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
            <Link to="/" className="nav-item">홈</Link>
            <Link to="/mypage" className="nav-item nav-item-active">마이페이지</Link>
            <Link to="/community" className="nav-item">커뮤니티</Link>

            {/* ⭐ 로그인/로그아웃 전환 */}
            {isLoggedIn ? (
              <button onClick={logout} className="login-btn">로그아웃</button>
            ) : (
              <Link to="/login" className="login-btn">로그인</Link>
            )}
          </div>
        </div>
      </header>

      {/* =============== 본문 =============== */}
      <main className="mypage-content">

        {/* 프로필 카드 */}
        <section className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar-circle">
              <span>👤</span>
            </div>
            <div className="profile-text">
              <div className="profile-name">{userName}님</div>
              <div className="profile-email">noonsong@example.com</div>
            </div>
          </div>
        </section>

        {/* 탭 */}
        <section className="mypage-tabs">
          <Link to="/mypage" className="tab-pill tab-pill-active">대시보드</Link>
          <Link to="/mypage/calendar" className="tab-pill">활동 캘린더</Link>
          <Link to="/mypage/mood" className="tab-pill">기분 기록</Link>
          <Link to="/mypage/settings" className="tab-pill">설정</Link>
        </section>

        {/* 대시보드 그리드 */}
        <section className="mypage-grid">
          {/* 오늘의 활동 */}
          <div className="card today-card">
            <div className="section-header">
              <div className="section-header-icon calendar">
                <span>📅</span>
              </div>
              <span className="section-header-title">오늘의 활동</span>
            </div>

            <div className="activity-list">
              <div className="activity-item activity-blue">
                <div className="activity-main">
                  <div className="activity-icon-circle blue">
                    <span>📘</span>
                  </div>
                  <div className="activity-text">
                    <div className="activity-title">AI 리포트 읽기 완료</div>
                  </div>
                </div>
              </div>

              <div className="activity-item activity-green">
                <div className="activity-main">
                  <div className="activity-icon-circle green">
                    <span>✅</span>
                  </div>
                  <div className="activity-text">
                    <div className="activity-title">일일 미션 완료</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 이번 주 통계 */}
          <div className="card weekly-card">
            <div className="section-header">
              <div className="section-header-icon stats">
                <span>📊</span>
              </div>
              <span className="section-header-title">이번 주 통계</span>
            </div>

            <div className="weekly-summary">
              <div className="weekly-box">
                <div className="weekly-number">{weeklyCount}</div>
                <div className="weekly-label">활동 일수</div>
              </div>
            </div>

            <div className="weekly-chart">
              <div className="weekly-bar-row">
                {weeklyDays.map((attended, idx) => (
                  <div key={idx} className={`weekly-bar ${attended ? 'active' : ''}`}></div>
                ))}
              </div>

              <div className="weekly-axis-labels">
                <span>월</span><span>화</span><span>수</span>
                <span>목</span><span>금</span><span>토</span><span>일</span>
              </div>
            </div>

          </div>
        </section>

        {/* 최근 활동 */}
        <section className="recent-section">
          <div className="card recent-card">
            <div className="section-header">
              <div className="section-header-icon recent">
                <span>🔄</span>
              </div>
              <span className="section-header-title">최근 활동</span>
            </div>

            <div className="recent-list">
              <div className="recent-item">
                <div className="recent-left">
                  <div className="recent-icon-circle blue">
                    <span>📘</span>
                  </div>
                  <div className="recent-text">
                    <div className="recent-title">AI 산업 리포트 읽기</div>
                    <div className="recent-time">2시간 전</div>
                  </div>
                </div>
              </div>

              <div className="recent-item">
                <div className="recent-left">
                  <div className="recent-icon-circle green">
                    <span>📌</span>
                  </div>
                  <div className="recent-text">
                    <div className="recent-title">채용 공고 북마크</div>
                    <div className="recent-time">5시간 전</div>
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

export default MyPage;
