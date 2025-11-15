// pages/mypage/MyPageSettings.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/main/mainpage.css';
import '../../style/mypage/mypage.css';

const MyPageSettings: React.FC = () => {
  return (
    <div className="main-container">
      {/* 상단바 – 메인페이지와 동일 */}
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
        {/* 프로필 카드 (공통) */}
        <section className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar-circle">
              <span>👤</span>
            </div>
            <div className="profile-text">
              <div className="profile-name">김철수님</div>
              <div className="profile-email">cheolsoo@example.com</div>
            </div>
          </div>
        </section>

        {/* 탭 – 설정 활성 */}
        <section className="mypage-tabs">
          <Link to="/mypage" className="tab-pill">
            대시보드
          </Link>
          <Link to="/mypage/calendar" className="tab-pill">
            활동 캘린더
          </Link>
          <Link to="/mypage/mood" className="tab-pill">
            기분 기록
          </Link>
          <Link to="/mypage/settings" className="tab-pill tab-pill-active">
            설정
          </Link>
        </section>

        {/* 설정 메인 그리드 */}
        <section className="settings-grid">
          {/* 프로필 설정 카드 */}
          <div className="card settings-card settings-card-left">
            <div className="section-header">
              <div className="section-header-icon profile">
                <span>😊</span>
              </div>
              <span className="section-header-title">프로필 설정</span>
            </div>

            <form className="settings-form">
              <div className="settings-field">
                <label htmlFor="name" className="settings-label">
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  className="settings-input"
                  defaultValue="김철수"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="email" className="settings-label">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  className="settings-input"
                  defaultValue="cheolsoo@example.com"
                />
              </div>

              <button type="button" className="settings-primary-btn">
                프로필 업데이트
              </button>
            </form>
          </div>

          {/* 관심 분야 수정 카드 */}
          <div className="card settings-card settings-card-right">
            <div className="section-header">
              <div className="section-header-icon interest">
                <span>🎯</span>
              </div>
              <span className="section-header-title">관심 분야 수정</span>
            </div>

            <div className="interest-chips">
              <button type="button" className="interest-chip interest-chip-active">
                개발
              </button>
              <button type="button" className="interest-chip interest-chip-active">
                데이터 분석
              </button>
              <button type="button" className="interest-chip interest-chip-active">
                AI/ML
              </button>
            </div>

            <button type="button" className="interest-save-btn">
              관심 분야 수정
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyPageSettings;
