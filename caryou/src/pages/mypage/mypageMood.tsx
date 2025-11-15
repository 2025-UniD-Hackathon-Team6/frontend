// pages/mypage/mypageMood.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../../style/main/mainpage.css";
import "../../style/mypage/mypage.css";

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

        {/* ===== 아래부터 '대시보드 레이아웃 구조 그대로' 적용 ===== */}
        {/* 왼쪽 카드 / 오른쪽 카드 2열 구조 */}
        <section className="mypage-grid">
          
          {/* 왼쪽 ― 스트레스 기반 학습 미션 */}
          <div className="card mission-card">
            <div className="mood-card-header">
              <div className="mood-icon-circle">
                <span>🎯</span>
              </div>
              <span className="mood-card-title">스트레스 지수 기반 학습 미션</span>
            </div>

            <div className="mission-box">
              <div className="mission-level">
                오늘의 스트레스 지수: <strong>3/5</strong> 😐
              </div>

              <div className="mission-list">
                <div className="mission-item">
                  <span className="mission-emoji">📘</span>
                  <span className="mission-text">15분간 가벼운 기술 블로그 읽기</span>
                </div>

                <div className="mission-item">
                  <span className="mission-emoji">🧩</span>
                  <span className="mission-text">초간단 알고리즘 1문제 풀기</span>
                </div>

                <div className="mission-item">
                  <span className="mission-emoji">☕</span>
                  <span className="mission-text">스트레칭 + 짧은 휴식 후 학습 시작하기</span>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 ― 최근 기분 기록 */}
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
