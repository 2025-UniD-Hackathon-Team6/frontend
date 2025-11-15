// pages/mypage/mypageCalendar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/main/mainpage.css';
import '../../style/mypage/mypage.css';

const MyPageCalendar: React.FC = () => {
  return (
    <div className="main-container">
      {/* 상단바 (메인과 동일) */}
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

        {/* 탭 */}
        <section className="mypage-tabs">
          <Link to="/mypage" className="tab-pill">대시보드</Link>
          <Link to="/mypage/calendar" className="tab-pill tab-pill-active">활동 캘린더</Link>
          <Link to="/mypage/mood" className="tab-pill">기분 기록</Link>
          <Link to="/mypage/settings" className="tab-pill">설정</Link>
        </section>

        {/* 활동 캘린더 */}
        <section className="calendar-section">
          <div className="card calendar-card">

            {/* ▼▼ 제목 앞에 캘린더 아이콘 추가 ▼▼ */}
            <div className="section-header">
              <div className="section-header-icon calendar">
                <span>📅</span>
              </div>
              <span className="section-header-title">활동 캘린더</span>
            </div>
            {/* ▲▲ 여기까지 아이콘 영역 ▲▲ */}

            <div className="calendar-header-row">
              <div></div>

              <div className="calendar-month-nav">
                <button className="month-arrow">{'<'}</button>
                <span className="calendar-month-text">2025년 11월</span>
                <button className="month-arrow">{'>'}</button>
              </div>
            </div>

            {/* 캘린더 그리드 */}
            <div className="calendar-grid">
              {['일','월','화','수','목','금','토'].map((d)=>(
                <div key={d} className="calendar-weekday">{d}</div>
              ))}

              {/* 날짜 예시 */}
              <div className="calendar-cell calendar-cell-muted">26</div>
              <div className="calendar-cell calendar-cell-muted">27</div>
              <div className="calendar-cell calendar-cell-muted">28</div>
              <div className="calendar-cell calendar-cell-muted">29</div>
              <div className="calendar-cell calendar-cell-muted">
                30 <span className="calendar-dot calendar-dot-green" />
              </div>
              <div className="calendar-cell calendar-cell-muted">31</div>
              <div className="calendar-cell">1</div>

              <div className="calendar-cell">2</div>
              <div className="calendar-cell">3</div>
              <div className="calendar-cell">4</div>
              <div className="calendar-cell">5</div>
              <div className="calendar-cell">6</div>
              <div className="calendar-cell">7</div>
              <div className="calendar-cell">8</div>

              <div className="calendar-cell">9</div>
              <div className="calendar-cell">10</div>
              <div className="calendar-cell">11</div>
              <div className="calendar-cell">12</div>
              <div className="calendar-cell">13</div>

              <div className="calendar-cell calendar-cell-today">
                14 <span className="calendar-dot calendar-dot-blue" />
              </div>

              <div className="calendar-cell">
                15 <span className="calendar-dot calendar-dot-green" />
              </div>

              <div className="calendar-cell">16</div>
              <div className="calendar-cell">
                17 <span className="calendar-dot calendar-dot-green" />
              </div>
              <div className="calendar-cell">18</div>
              <div className="calendar-cell">19</div>
              <div className="calendar-cell">20</div>
              <div className="calendar-cell">21</div>
              <div className="calendar-cell">22</div>

              <div className="calendar-cell">23</div>
              <div className="calendar-cell">24</div>
              <div className="calendar-cell">25</div>
              <div className="calendar-cell">26</div>

              <div className="calendar-cell">
                27 <span className="calendar-dot calendar-dot-green" />
              </div>

              <div className="calendar-cell">28</div>
              <div className="calendar-cell">29</div>

              <div className="calendar-cell">30</div>
              <div className="calendar-cell calendar-cell-muted">1</div>
              <div className="calendar-cell calendar-cell-muted">2</div>
              <div className="calendar-cell calendar-cell-muted">3</div>
              <div className="calendar-cell calendar-cell-muted">4</div>
              <div className="calendar-cell calendar-cell-muted">5</div>
              <div className="calendar-cell calendar-cell-muted">6</div>
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
