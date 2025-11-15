// pages/mypage/mypageMood.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/main/mainpage.css';
import '../../style/mypage/mypage.css';

const MyPageMood: React.FC = () => {
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

        {/* 탭 */}
        <section className="mypage-tabs">
          <Link to="/mypage" className="tab-pill">대시보드</Link>
          <Link to="/mypage/calendar" className="tab-pill">활동 캘린더</Link>
          <Link to="/mypage/mood" className="tab-pill tab-pill-active">기분 기록</Link>
          <Link to="/mypage/settings" className="tab-pill">설정</Link>
        </section>

        {/* 기분 기록 전체 그리드 */}
        <section className="mood-grid">
          
          {/* ────────────────── 왼쪽: 기분 추이 ────────────────── */}
          <div className="card mood-chart-card">
            <div className="mood-card-header">
              <div className="mood-icon-circle">
                <span>📈</span>
              </div>
              <span className="mood-card-title">기분 추이</span>
            </div>

            <div className="mood-chart">
              <svg viewBox="0 0 100 60" className="mood-chart-svg">
                <g className="mood-chart-grid">
                  <line x1="0" y1="50" x2="100" y2="50" />
                  <line x1="0" y1="40" x2="100" y2="40" />
                  <line x1="0" y1="30" x2="100" y2="30" />
                  <line x1="0" y1="20" x2="100" y2="20" />
                  <line x1="0" y1="10" x2="100" y2="10" />
                </g>

                <path
                  className="mood-chart-area"
                  d="M5 35 L20 45 L35 35 L50 25 L65 35 L80 45 L95 35 L95 55 L5 55 Z"
                />
                <polyline
                  className="mood-chart-line"
                  points="5,35 20,45 35,35 50,25 65,35 80,45 95,35"
                />

                <g className="mood-chart-points">
                  <circle cx="5" cy="35" r="1.5" />
                  <circle cx="20" cy="45" r="1.5" />
                  <circle cx="35" cy="35" r="1.5" />
                  <circle cx="50" cy="25" r="1.5" />
                  <circle cx="65" cy="35" r="1.5" />
                  <circle cx="80" cy="45" r="1.5" />
                  <circle cx="95" cy="35" r="1.5" />
                </g>
              </svg>

              <div className="mood-chart-xlabels">
                <span>월</span><span>화</span><span>수</span><span>목</span>
                <span>금</span><span>토</span><span>일</span>
              </div>
            </div>
          </div>

          {/* ────────────────── 오른쪽: 최근 기분 기록 ────────────────── */}
          <div className="card mood-recent-card">
            <div className="mood-card-header">
              <div className="mood-icon-circle">
                <span>📝</span>
              </div>
              <span className="mood-card-title">최근 기분 기록</span>
            </div>

            <div className="mood-recent-list">
              <div className="mood-recent-item mood-recent-item-blue">
                <div className="mood-recent-left">
                  <div className="mood-emoji-circle mood-emoji-happy">😊</div>
                  <div className="mood-recent-text">
                    <div className="mood-recent-main">좋은 하루였어요!</div>
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
