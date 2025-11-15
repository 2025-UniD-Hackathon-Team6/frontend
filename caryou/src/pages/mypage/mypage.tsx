// pages/mypage/mypage.tsx  (대시보드 화면)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/main/mainpage.css';
import '../../style/mypage/mypage.css';

const BASE_URL = "http://52.79.172.1:4000";
const ACCESS_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlciIsImlhdCI6MTc2MzIzMjMyMSwiZXhwIjoxNzYzMjM0MTIxLCJpc3MiOiJjYXJ5b3UuZGV2In0.zYkX4lnOZHEmtMbn_6NMNCDvYp94zFS_ueO1oMITW2s";

const MyPage: React.FC = () => {
    const [weeklyCount, setWeeklyCount] = useState(0);  
  const [weeklyDays, setWeeklyDays] = useState<boolean[]>([false, false, false, false, false, false, false]);

  // 날짜 유틸
  const getWeekRange = () => {
    const today = new Date();
    const day = today.getDay(); // 일:0 ~ 토:6
    const diffToMonday = (day === 0 ? -6 : 1 - day); // 월요일을 기준으로 보정

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return { monday, sunday };
  };

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // ⭐ 월간 출석 → 이번주 출석 계산
  const loadAttendance = async () => {
    try {
      const res = await fetch(`${BASE_URL}/attend/month`, {
        method: "GET",
        headers: {
          Authorization: ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      });

      const list = await res.json(); // 배열 형태

      const { monday, sunday } = getWeekRange();

      // 이번 주 출석 데이터 필터링
      const thisWeek = list.filter((item: any) => {
        const d = new Date(item.checkinDate);
        return d >= monday && d <= sunday;
      });

      // 활동 일수
      setWeeklyCount(thisWeek.length);

      // 월~일 출석 여부
      const flags = [false, false, false, false, false, false, false];

      thisWeek.forEach((item: any) => {
        const d = new Date(item.checkinDate);
        const weekday = d.getDay(); // 0=일~6=토
        const idx = (weekday === 0 ? 6 : weekday - 1); // 월=0 ~ 일=6
        flags[idx] = true;
      });

      setWeeklyDays(flags);

    } catch (e) {
      console.error("Attendance load error: ", e);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

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
            <Link to="/login" className="login-btn">로그인</Link>
          </div>
        </div>
      </header>

      <main className="mypage-content">
        {/* 프로필 카드 */}
        <section className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar-circle">
              <span>👤</span>
            </div>
            <div className="profile-text">
              <div className="profile-name">김철수님</div>
              <div className="profile-email">cheolsu@example.com</div>
            </div>
          </div>
        </section>

        {/* 탭 – 대시보드 활성 */}
        <section className="mypage-tabs">
          <Link to="/mypage" className="tab-pill tab-pill-active">대시보드</Link>
          <Link to="/mypage/calendar" className="tab-pill">활동 캘린더</Link>
          <Link to="/mypage/mood" className="tab-pill">기분 기록</Link>
          <Link to="/mypage/settings" className="tab-pill">설정</Link>
        </section>

        {/* ===== 아래는 네가 쓰던 '오늘의 활동 / 이번 주 통계 / 최근 활동' 코드 그대로 ===== */}
        {/* 그리드: 오늘의 활동 / 이번 주 통계 */}
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
              {weeklyDays.map((attended, idx) => (
                <div
                  key={idx}
                  className={`weekly-bar ${attended ? 'active' : ''}`}
                ></div>
              ))}

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
