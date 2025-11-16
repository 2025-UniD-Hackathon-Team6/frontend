// pages/mypage/MyPageSettings.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/main/mainpage.css";
import "../../style/mypage/mypage.css";

const BASE_URL = "http://52.79.172.1:4000";

const MyPageSettings: React.FC = () => {
  const navigate = useNavigate();

  /** ⭐ 로그인 여부 상태 */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("accessToken")
  );

  /** ⭐ 사용자 정보 */
  const [userName, setUserName] = useState("사용자");
  const [userEmail, setUserEmail] = useState("ex@example.com");

  /** ⭐ 로그아웃 */
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
    } catch (e) {
      console.error("로그아웃 요청 실패:", e);
    }

    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    alert("로그아웃 성공");
    navigate("/");
  };

  /** ⭐ 프로필 불러오기 */
  const loadProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (res.data?.name) setUserName(res.data.name);
      if (res.data?.email) setUserEmail(res.data.email);
    } catch (error) {
      console.error("프로필 로딩 실패:", error);
    }
  };

  useEffect(() => {
    loadProfile();
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
            <Link to="/main" className="nav-item">
              홈
            </Link>
            <Link to="/mypage" className="nav-item nav-item-active">
              마이페이지
            </Link>
            <Link to="/community" className="nav-item">
              커뮤니티
            </Link>

            {isLoggedIn ? (
              <button onClick={logout} className="login-btn">
                로그아웃
              </button>
            ) : (
              <Link to="/" className="login-btn">
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mypage-content">
        {/* ⭐ 프로필 카드 */}
        <section className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar-circle">
              <span>👤</span>
            </div>
            <div className="profile-text">
              <div className="profile-name">{userName}님</div>
              <div className="profile-email">{userEmail}</div>
            </div>
          </div>
        </section>

        {/* 탭 */}
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

        {/* ⭐ 설정 그리드 */}
        <section className="settings-grid">
          {/* 왼쪽: 프로필 설정 */}
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
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <button type="button" className="settings-primary-btn">
                프로필 업데이트
              </button>
            </form>
          </div>

          {/* 오른쪽: 관심 분야 */}
          <div className="card settings-card settings-card-right">
            <div className="section-header">
              <div className="section-header-icon interest">
                <span>🎯</span>
              </div>
              <span className="section-header-title">관심 분야 수정</span>
            </div>

            <div className="interest-chips">
              <button className="interest-chip interest-chip-active">
                개발
              </button>
              <button className="interest-chip interest-chip-active">
                데이터 분석
              </button>
              <button className="interest-chip interest-chip-active">
                AI/ML
              </button>
            </div>

            <button className="interest-save-btn">
              관심 분야 수정
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyPageSettings;
