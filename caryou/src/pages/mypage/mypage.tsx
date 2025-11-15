// pages/mypage/mypage.tsx  (대시보드 화면)
import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/main/mainpage.css';
import '../../style/mypage/mypage.css';

const MyPage: React.FC = () => {
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
                <div className="weekly-number">5</div>
                <div className="weekly-label">활동 일수</div>
              </div>
              <div className="weekly-box weekly-box-green">
                <div className="weekly-number weekly-number-green">280</div>
                <div className="weekly-label">총 포인트</div>
              </div>
            </div>

            <div className="weekly-chart">
              <div className="weekly-bar"></div>
              <div className="weekly-bar"></div>
              <div className="weekly-bar"></div>
              <div className="weekly-bar"></div>
              <div className="weekly-bar"></div>
              <div className="weekly-bar"></div>
              <div className="weekly-bar"></div>
              <div className="weekly-axis-labels">
                <span>월</span>
                <span>화</span>
                <span>수</span>
                <span>목</span>
                <span>금</span>
                <span>토</span>
                <span>일</span>
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
