import React from 'react';
import '../../style/main/mainpage.css';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div className="main-container">
      {/* 상단바 */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="nav-logo-circle">
              {/* 로켓 아이콘 들어가는 원형 로고 */}
              <span className="nav-logo-emoji">🚀</span>
            </div>
            <span className="nav-title">CARYOU</span>
          </div>
          <div className="nav-right">
            <Link to="/" className="nav-item nav-item-active">홈</Link>
            <Link to="/mypage" className="nav-item">마이페이지</Link>
            <Link to="/community" className="nav-item">커뮤니티</Link>
            <Link to="/login" className="login-btn">로그인</Link>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* 메인 문구 */}
        <section className="hero-section">
          <h1 className="hero-title">
            오늘도 멋진 커리어를 향해{' '}
            <span className="hero-highlight">한 걸음</span> 나아가세요! 🚀
          </h1>
          <p className="hero-sub">
            CARYOU가 당신의 커리어 여정을 응원합니다. 오늘의 키워드로 시작해보세요!
          </p>
        </section>

        {/* 오늘의 키워드 카드 */}
        <section className="keyword-section">
          <div className="keyword-card">
            <div className="keyword-header">
              <div className="keyword-icon-circle">
                <span className="keyword-icon">🔑</span>
              </div>
              <div className="keyword-header-text">
                <span className="keyword-title">오늘의 키워드</span>
                <span className="keyword-date">2025년 11월 15일</span>
              </div>
            </div>

            <div className="keyword-main">
              <div className="keyword-main-icon-circle">
                <span className="keyword-main-icon">🤖</span>
              </div>
              <div className="keyword-main-title">AI &amp; 데이터 분석</div>
              <div className="keyword-main-desc">
                인공지능 시대, 데이터 분석 역량이 새로운 경쟁력입니다!
              </div>
            </div>

            <div className="keyword-sub-boxes">
              <div className="sub-box">
                <div className="sub-icon">📄</div>
                <div className="sub-text">관련 기사 읽기</div>
              </div>
              <div className="sub-box">
                <div className="sub-icon">💬</div>
                <div className="sub-text">면접 질문 준비</div>
              </div>
              <div className="sub-box">
                <div className="sub-icon">🧩</div>
                <div className="sub-text">프로젝트 아이디어</div>
              </div>
            </div>
          </div>
        </section>

        {/* 오늘 읽을 3분 산업 리포트 */}
        <section className="report-section">
          <div className="section-title-row">
            <div className="section-title-icon-circle clock">
              <span>🕒</span>
            </div>
            <span className="section-title-text">오늘 읽을 3분 산업 리포트</span>
          </div>

          <div className="report-card">
            <div className="report-header">
              <div className="report-icon-circle">
                <span>📈</span>
              </div>
              <div className="report-text-wrap">
                <div className="report-title">2025 인공지능 산업 동향</div>
                <div className="report-desc">
                  올해 AI 시장은 전년 대비 35% 성장했습니다. 특히 생성형 AI 분야가 주목받고 있으며,
                  기업들의 실무 적용률이 급속도로 증가하고 있습니다.
                </div>
                <div className="report-tags">
                  <span className="tag tag-blue">#AI</span>
                  <span className="tag tag-green">#데이터분석</span>
                  <span className="tag tag-purple">#트렌드</span>
                </div>
              </div>
            </div>
            <button className="report-btn">리포트 자세히 읽기</button>
          </div>
        </section>

        {/* 내 관심 직무 추천 공고 */}
        <section className="job-section">
          <div className="section-title-row">
            <div className="section-title-icon-circle briefcase">
              <span>💼</span>
            </div>
            <span className="section-title-text">내 관심 직무 추천 공고</span>
          </div>

          <div className="job-card-list">
            <div className="job-card">
              <div className="job-card-header">
                <div className="job-icon-square code">
                  <span>{'</>'}</span>
                </div>
                <div className="job-header-text">
                  <div className="job-position">프론트엔드 개발자</div>
                  <div className="job-company">네이버</div>
                </div>
              </div>
              <div className="job-body">
                <div className="job-desc">React, Vue.js 경력자 우대</div>
                <div className="job-meta">경력 3년↑</div>
              </div>
              <button className="job-scrap-btn">🔖</button>
            </div>

            <div className="job-card">
              <div className="job-card-header">
                <div className="job-icon-square data">
                  <span>📊</span>
                </div>
                <div className="job-header-text">
                  <div className="job-position">데이터 분석가</div>
                  <div className="job-company">카카오</div>
                </div>
              </div>
              <div className="job-body">
                <div className="job-desc">Python, SQL 필수</div>
                <div className="job-meta job-new">신입 가능</div>
              </div>
              <button className="job-scrap-btn">🔖</button>
            </div>

            <div className="job-card">
              <div className="job-card-header">
                <div className="job-icon-square ai">
                  <span>🤖</span>
                </div>
                <div className="job-header-text">
                  <div className="job-position">AI 엔지니어</div>
                  <div className="job-company">구글 코리아</div>
                </div>
              </div>
              <div className="job-body">
                <div className="job-desc">머신러닝, 딥러닝 전문가</div>
                <div className="job-meta">경력 5년↑</div>
              </div>
              <button className="job-scrap-btn">🔖</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
