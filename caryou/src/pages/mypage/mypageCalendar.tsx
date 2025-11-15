// pages/mypage/mypageCalendar.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/main/mainpage.css';
import '../../style/mypage/mypage.css';

const BASE_URL = "http://52.79.172.1:4000";
const ACCESS_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlciIsImlhdCI6MTc2MzIzMjMyMSwiZXhwIjoxNzYzMjM0MTIxLCJpc3MiOiJjYXJ5b3UuZGV2In0.zYkX4lnOZHEmtMbn_6NMNCDvYp94zFS_ueO1oMITW2s"; // 네 토큰 넣기

interface Attendance {
  checkinDate: string;
}

const MyPageCalendar: React.FC = () => {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1~12
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({});

  /** ▣ API: 월간 출석 기록 가져오기 */
  const loadAttendance = async () => {
    try {
      const res = await fetch(`${BASE_URL}/attend/month`, {
        method: "GET",
        headers: {
          Authorization: ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      });

      const list: Attendance[] = await res.json();

      const map: Record<string, boolean> = {};

      list.forEach((item) => {
        // "2025-11-05" → "2025-11-05"
        map[item.checkinDate] = true;
      });

      setAttendanceMap(map);
    } catch (err) {
      console.error("Attendance load error:", err);
    }
  };

  /** 월 이동 */
  const goPrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  /** 캘린더 날짜 생성 */
  const generateCalendar = () => {
    const first = new Date(currentYear, currentMonth - 1, 1);
    const last = new Date(currentYear, currentMonth, 0);

    const days: {
      date: number;
      muted: boolean;
      fullDate: string;
    }[] = [];

    // 지난달 일부
    const prevLast = new Date(currentYear, currentMonth - 1, 0);
    const prevDays = first.getDay(); // 0~6 (일~토)

    for (let i = prevLast.getDate() - prevDays + 1; i <= prevLast.getDate(); i++) {
      const full = `${currentYear}-${String(currentMonth - 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({ date: i, muted: true, fullDate: full });
    }

    // 이번달
    for (let d = 1; d <= last.getDate(); d++) {
      const full = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({ date: d, muted: false, fullDate: full });
    }

    // 다음달 일부
    const nextDays = 42 - days.length; // 6주 × 7칸 = 42
    for (let i = 1; i <= nextDays; i++) {
      const full = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({ date: i, muted: true, fullDate: full });
    }

    return days;
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const calendarDays = generateCalendar();

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
        
        {/* 프로필 */}
        <section className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar-circle"><span>👤</span></div>
            <div className="profile-text">
              <div className="profile-name">김철수님</div>
              <div className="profile-email">cheolsu@example.com</div>
            </div>
          </div>
        </section>

        {/* 탭 */}
        <section className="mypage-tabs">
          <Link to="/mypage" className="tab-pill">대시보드</Link>
          <Link to="/mypage/calendar" className="tab-pill tab-pill-active">활동 캘린더</Link>
          <Link to="/mypage/mood" className="tab-pill">기분 기록</Link>
          <Link to="/mypage/settings" className="tab-pill">설정</Link>
        </section>

        {/* 캘린더 카드 */}
        <section className="calendar-section">
          <div className="card calendar-card">

            <div className="section-header">
              <div className="section-header-icon calendar"><span>📅</span></div>
              <span className="section-header-title">활동 캘린더</span>
            </div>

            <div className="calendar-header-row">
              <div></div>

              <div className="calendar-month-nav">
                <button className="month-arrow" onClick={goPrevMonth}>{'<'}</button>
                <span className="calendar-month-text">
                  {currentYear}년 {currentMonth}월
                </span>
                <button className="month-arrow" onClick={goNextMonth}>{'>'}</button>
              </div>
            </div>

            {/* 캘린더 그리드 */}
            <div className="calendar-grid">
              {['일','월','화','수','목','금','토'].map((w)=>( 
                <div key={w} className="calendar-weekday">{w}</div>
              ))}

              {calendarDays.map((d, idx) => {
                const isToday = d.fullDate === today.toISOString().slice(0, 10);
                const isAttended = attendanceMap[d.fullDate] === true;

                return (
                  <div
                    key={idx}
                    className={`calendar-cell ${d.muted ? "calendar-cell-muted" : ""} ${isToday ? "calendar-cell-today" : ""}`}
                  >
                    {d.date}

                    {isAttended && (
                      <span className="calendar-dot calendar-dot-green" />
                    )}

                    {isToday && (
                      <span className="calendar-dot calendar-dot-blue" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* 범례 */}
            <div className="calendar-legend">
              <div className="legend-item">
                <span className="legend-dot legend-dot-green" />
                <span>활동 있음</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot legend-dot-blue" />
                <span>오늘</span>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default MyPageCalendar;
