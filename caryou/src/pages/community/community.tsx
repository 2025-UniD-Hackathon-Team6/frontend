// pages/community/Community.tsx
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/main/mainpage.css';
import '../../style/community/community.css';

type CategoryKey = 'all' | 'career' | 'interview' | 'study' | 'free';
type SortKey = 'latest' | 'popular' | 'comments';

interface CommunityPost {
  id: number;
  category: CategoryKey;
  categoryLabel: string;
  daysAgo: number;
  title: string;
  content: string;
  tags: string[];
  author: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

const initialPosts: CommunityPost[] = [
  {
    id: 1,
    category: 'interview',
    categoryLabel: '면접',
    daysAgo: 365,
    title: '면접에서 자주 물어보는 질문 TOP 10',
    content:
      '면접 준비하시는 분들께 도움이 될 것 같아서 공유합니다.',
    tags: ['면접', '취업', '꿀팁'],
    author: '취준생1',
    likes: 42,
    comments: 15,
  },
  {
    id: 2,
    category: 'career',
    categoryLabel: '커리어',
    daysAgo: 365,
    title: '개발자 포트폴리오 만들기 - 실전편',
    content:
      '포트폴리오 만드는데 많은 시간을 들였습니다.',
    tags: ['포트폴리오', '개발자', '취업성공'],
    author: '개발자A',
    likes: 67,
    comments: 23,
  },
  {
    id: 3,
    category: 'study',
    categoryLabel: '스터디',
    daysAgo: 367,
    title: '코딩 테스트 준비하는 방법',
    content: '제가 준비했던 방법을 공유해볼게요.',
    tags: ['코딩테스트', '알고리즘', '준비'],
    author: '알고리좀러',
    likes: 28,
    comments: 8,
  },
  {
    id: 4,
    category: 'free',
    categoryLabel: '자유',
    daysAgo: 10,
    title: '요즘 OTT 추천 좀…',
    content: '야근 끝나고 볼 콘텐츠 추천해주세요.',
    tags: ['일상', 'OTT', '취미'],
    author: '야근러',
    likes: 12,
    comments: 5,
  },
];

const categoryOptions = [
  { key: 'all', label: '전체 카테고리' },
  { key: 'career', label: '커리어' },
  { key: 'interview', label: '면접' },
  { key: 'study', label: '스터디' },
  { key: 'free', label: '자유' },
];

const sortOptions = [
  { key: 'latest', label: '최신순' },
  { key: 'popular', label: '인기순' },
  { key: 'comments', label: '댓글순' },
];

const Community: React.FC = () => {
  const navigate = useNavigate();

  /** ⭐ 로그인 상태 */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("accessToken"));

  /** ⭐ 로그아웃 (Main/MyPage와 동일하게 적용!!) */
  const logout = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [sortKey, setSortKey] = useState<SortKey>('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const [showWriteForm, setShowWriteForm] = useState(false);
  const [formCategory, setFormCategory] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');

  /** 좋아요 */
  const handleToggleLike = (id: number) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.likes + (p.liked ? -1 : 1),
            }
          : p
      )
    );
  };

  /** 게시글 검색 + 필터 */
  const filteredPosts = useMemo(() => {
    let list = [...posts];

    if (selectedCategory !== 'all') list = list.filter(p => p.category === selectedCategory);

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(p => (p.title + p.content + p.tags.join(" ")).toLowerCase().includes(q));
    }

    switch (sortKey) {
      case 'latest': list.sort((a, b) => a.daysAgo - b.daysAgo); break;
      case 'popular': list.sort((a, b) => b.likes - a.likes); break;
      case 'comments': list.sort((a, b) => b.comments - a.comments); break;
    }

    return list;
  }, [posts, selectedCategory, sortKey, searchQuery]);

  const getCategoryBadgeClass = (key: CategoryKey) => {
    switch (key) {
      case 'career': return 'badge-career';
      case 'interview': return 'badge-interview';
      case 'study': return 'badge-study';
      case 'free': return 'badge-free';
      default: return 'badge-career';
    }
  };

  /** 글쓰기 */
  const handleWriteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formCategory || !formTitle || !formContent) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const newPost: CommunityPost = {
      id: Date.now(),
      category: formCategory as CategoryKey,
      categoryLabel: categoryOptions.find(c => c.key === formCategory)?.label || '',
      daysAgo: 0,
      title: formTitle,
      content: formContent,
      tags: formTags ? formTags.split(" ").map(t => t.trim()) : [],
      author: "익명",
      likes: 0,
      comments: 0,
      liked: false,
    };

    setPosts(prev => [newPost, ...prev]);
    setShowWriteForm(false);
    setFormCategory('');
    setFormTitle('');
    setFormContent('');
    setFormTags('');
  };

  return (
    <div className="main-container">
      {/* NAV */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="nav-logo-circle">
              <span className="nav-logo-emoji">🚀</span>
            </div>
            <span className="nav-title">CARYOU</span>
          </div>

          <div className="nav-right">
            <Link to="/main" className="nav-item">홈</Link>
            <Link to="/mypage" className="nav-item">마이페이지</Link>
            <Link to="/community" className="nav-item nav-item-active">커뮤니티</Link>

            {isLoggedIn ? (
              <button onClick={logout} className="login-btn">로그아웃</button>
            ) : (
              <Link to="/login" className="login-btn">로그인</Link>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="community-main">
        <section className="community-hero">
          <h1 className="community-title">커뮤니티</h1>
          <p className="community-sub">
            취업 고민, 정보 공유, 함께 성장해요! <span>💪</span>
          </p>
        </section>

        {/* SEARCH BAR */}
        <section className="community-search-row">
          <div className="community-search-wrap">
            <span className="community-search-icon">🔍</span>
            <input
              className="community-search-input"
              placeholder="검색어를 입력하세요..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="community-filter-group">
            <select
              className="community-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value as CategoryKey)}
            >
              {categoryOptions.map(opt => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              className="community-select"
              value={sortKey}
              onChange={e => setSortKey(e.target.value as SortKey)}
            >
              {sortOptions.map(opt => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              className={'community-write-btn' + (showWriteForm ? ' active' : '')}
              onClick={() => setShowWriteForm(prev => !prev)}
            >
              <span>🖊️</span> 글쓰기
            </button>
          </div>
        </section>

        {/* 글쓰기 폼 */}
        {showWriteForm && (
          <section className="community-write-section">
            <form className="write-card" onSubmit={handleWriteSubmit}>
              <h2 className="write-title">새 글 작성</h2>

              <div className="write-field-group">
                <label className="write-label">카테고리</label>
                <select
                  className="write-input write-select"
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="career">커리어</option>
                  <option value="interview">면접</option>
                  <option value="study">스터디</option>
                  <option value="free">자유</option>
                </select>
              </div>

              <div className="write-field-group">
                <label className="write-label">제목</label>
                <input
                  className="write-input"
                  placeholder="제목 입력"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                />
              </div>

              <div className="write-field-group">
                <label className="write-label">내용</label>
                <textarea
                  className="write-input write-textarea"
                  placeholder="내용 입력"
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                />
              </div>

              <div className="write-field-group">
                <label className="write-label">태그</label>
                <input
                  className="write-input"
                  placeholder="예: 면접 취업 꿀팁"
                  value={formTags}
                  onChange={e => setFormTags(e.target.value)}
                />
              </div>

              <div className="write-actions">
                <button className="write-submit-btn" type="submit">📨 등록하기</button>
                <button className="write-cancel-btn" type="button" onClick={() => setShowWriteForm(false)}>취소</button>
              </div>
            </form>
          </section>
        )}

        {/* 게시글 리스트 */}
        <section className="community-list">
          {filteredPosts.map(post => (
            <article key={post.id} className="post-card">
              <div className="post-card-inner">
                <div className="post-header-row">
                  <span className={'post-category-badge ' + getCategoryBadgeClass(post.category)}>
                    {post.categoryLabel}
                  </span>
                  <span className="post-days-ago">{post.daysAgo}일 전</span>
                </div>

                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">{post.content}</p>

                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="post-tag">#{tag}</span>
                  ))}
                </div>

                <div className="post-footer-row">
                  <div className="post-author">
                    <span>👤</span> {post.author}
                  </div>
                  <div className="post-stats">
                    <button
                      className={'post-like-btn' + (post.liked ? ' liked' : '')}
                      onClick={() => handleToggleLike(post.id)}
                    >
                      👍 {post.likes}
                    </button>
                    <div className="post-comment-stat">
                      💬 {post.comments}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="community-pagination">
            <button className="page-btn" disabled>◀</button>
            <button className="page-btn page-btn-active">1</button>
            <button className="page-btn" disabled>▶</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Community;
