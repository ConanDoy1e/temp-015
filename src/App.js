import { useState, useMemo } from "react";

// ─── Mock Data (36건) ────────────────────────────────────────
const mockData = [
  { id: 1, name: "김영수", school: "서울대학교", company: "삼성전자", region: "서울 강남구", date: "2025-12-03", funeral: "서울성모병원 장례식장 3호실", contact: "010-1234-5678", age: 67, message: "고인은 평생 반도체 연구에 헌신하셨으며, 따뜻한 마음으로 후배들을 이끌어주셨습니다." },
  { id: 2, name: "이정희", school: "연세대학교", company: "현대자동차", region: "경기 수원시", date: "2025-11-28", funeral: "아주대학교병원 장례식장 5호실", contact: "010-2345-6789", age: 72, message: "자동차 엔지니어로 40년간 근무하시며 한국 자동차 산업 발전에 크게 기여하셨습니다." },
  { id: 3, name: "박민호", school: "고려대학교", company: "LG화학", region: "대전 유성구", date: "2026-01-15", funeral: "대전 보훈병원 장례식장 2호실", contact: "010-3456-7890", age: 58, message: "화학 연구원으로 재직하며 수많은 특허를 보유하셨던 열정적인 과학자셨습니다." },
  { id: 4, name: "최수진", school: "이화여자대학교", company: "서울시청", region: "서울 종로구", date: "2026-02-10", funeral: "서울대학교병원 장례식장 1호실", contact: "010-4567-8901", age: 63, message: "30년간 공직에 몸담으며 시민을 위한 정책 수립에 평생을 바치셨습니다." },
  { id: 5, name: "정대원", school: "부산대학교", company: "포스코", region: "부산 해운대구", date: "2026-01-22", funeral: "부산대학교병원 장례식장 7호실", contact: "010-5678-9012", age: 70, message: "제철소에서 현장 기술자로 시작해 임원까지 오르신 입지전적 인물이셨습니다." },
  { id: 6, name: "한미영", school: "숙명여자대학교", company: "아모레퍼시픽", region: "서울 용산구", date: "2026-03-01", funeral: "순천향대학교병원 장례식장 4호실", contact: "010-6789-0123", age: 55, message: "화장품 연구개발 분야의 선구자로, K-뷰티의 글로벌 확장에 기여하셨습니다." },
  { id: 7, name: "윤상철", school: "한양대학교", company: "네이버", region: "경기 성남시", date: "2026-02-18", funeral: "분당서울대학교병원 장례식장 6호실", contact: "010-7890-1234", age: 48, message: "초기 인터넷 시대부터 검색 기술 개발에 매진하셨던 뛰어난 엔지니어셨습니다." },
  { id: 8, name: "송지은", school: "경희대학교", company: "서울아산병원", region: "서울 송파구", date: "2026-03-05", funeral: "서울아산병원 장례식장 2호실", contact: "010-8901-2345", age: 61, message: "소아과 전문의로 35년간 아이들의 건강을 지켜오신 따뜻한 의사셨습니다." },
  { id: 9, name: "오태근", school: "전남대학교", company: "기아자동차", region: "광주 북구", date: "2026-02-25", funeral: "전남대학교병원 장례식장 3호실", contact: "010-9012-3456", age: 65, message: "광주 지역 사회 발전에 헌신하시며, 많은 이웃들에게 존경받으셨습니다." },
  { id: 10, name: "임서현", school: "중앙대학교", company: "CJ ENM", region: "서울 마포구", date: "2026-03-10", funeral: "세브란스병원 장례식장 5호실", contact: "010-0123-4567", age: 52, message: "방송 PD로 수많은 명작 프로그램을 만들어내신 한국 방송계의 자랑이셨습니다." },
  { id: 11, name: "강준혁", school: "카이스트", company: "SK하이닉스", region: "경기 이천시", date: "2025-12-20", funeral: "이천시립장례식장 1호실", contact: "010-1111-2222", age: 44, message: "차세대 메모리 반도체 설계를 이끌며 글로벌 기술 경쟁력 강화에 기여하셨습니다." },
  { id: 12, name: "배은지", school: "동국대학교", company: "국립중앙박물관", region: "서울 용산구", date: "2026-01-08", funeral: "중앙대학교병원 장례식장 2호실", contact: "010-3333-4444", age: 59, message: "한국 미술사 연구에 평생을 바치시며, 우리 문화유산의 가치를 알리셨습니다." },
  // ─── 13–24 ─────────────────────────────────────────────────
  { id: 13, name: "신동훈", school: "성균관대학교", company: "삼성SDS", region: "서울 서초구", date: "2025-10-12", funeral: "삼성서울병원 장례식장 1호실", contact: "010-1010-2020", age: 51, message: "IT 인프라 분야에서 20년 넘게 활약하시며 디지털 전환의 선두에 서셨습니다." },
  { id: 14, name: "류하은", school: "서강대학교", company: "카카오", region: "제주 제주시", date: "2025-09-28", funeral: "제주대학교병원 장례식장 2호실", contact: "010-2020-3030", age: 39, message: "모바일 플랫폼의 사용자 경험을 혁신하며 많은 사람들의 일상을 변화시키셨습니다." },
  { id: 15, name: "장세민", school: "서울대학교", company: "대한항공", region: "서울 강서구", date: "2025-11-05", funeral: "고려대학교안암병원 장례식장 4호실", contact: "010-3030-4040", age: 62, message: "30년간 항공 정비 엔지니어로 안전한 하늘길을 지키는 데 헌신하셨습니다." },
  { id: 16, name: "노윤아", school: "한국외국어대학교", company: "외교부", region: "서울 종로구", date: "2026-01-30", funeral: "서울대학교병원 장례식장 3호실", contact: "010-4040-5050", age: 57, message: "외교관으로 세계 각지에서 대한민국의 위상을 높이는 데 기여하셨습니다." },
  { id: 17, name: "문재혁", school: "포항공과대학교", company: "현대중공업", region: "울산 동구", date: "2025-12-15", funeral: "울산대학교병원 장례식장 5호실", contact: "010-5050-6060", age: 66, message: "조선 산업의 핵심 기술을 개발하며 세계 1위 조선소의 역사를 함께 쓰셨습니다." },
  { id: 18, name: "차예린", school: "연세대학교", company: "삼성전자", region: "경기 화성시", date: "2026-02-05", funeral: "분당차병원 장례식장 3호실", contact: "010-6060-7070", age: 43, message: "스마트폰 UX 디자이너로서 직관적이고 아름다운 인터페이스를 만들어내셨습니다." },
  { id: 19, name: "권태호", school: "고려대학교", company: "한국은행", region: "서울 중구", date: "2025-10-22", funeral: "서울성모병원 장례식장 5호실", contact: "010-7070-8080", age: 71, message: "40년간 금융 정책 연구에 매진하시며 한국 경제의 안정성 확보에 기여하셨습니다." },
  { id: 20, name: "안소희", school: "부산대학교", company: "롯데케미칼", region: "부산 사하구", date: "2026-03-08", funeral: "부산백병원 장례식장 2호실", contact: "010-8080-9090", age: 49, message: "화학공학자로서 친환경 소재 개발에 헌신하시며 미래 산업의 길을 열어주셨습니다." },
  { id: 21, name: "조현우", school: "전북대학교", company: "현대자동차", region: "전북 전주시", date: "2025-11-18", funeral: "전북대학교병원 장례식장 1호실", contact: "010-9090-0101", age: 54, message: "전주 공장에서 품질 관리 전문가로 30년간 최고의 차를 만드는 데 기여하셨습니다." },
  { id: 22, name: "허다빈", school: "이화여자대학교", company: "국립현대미술관", region: "서울 종로구", date: "2026-01-02", funeral: "세브란스병원 장례식장 3호실", contact: "010-0202-1313", age: 46, message: "큐레이터로서 한국 현대미술의 세계화에 앞장서신 문화계의 선구자셨습니다." },
  { id: 23, name: "유승재", school: "한양대학교", company: "SK텔레콤", region: "서울 중구", date: "2025-10-30", funeral: "한양대학교병원 장례식장 2호실", contact: "010-1414-2525", age: 60, message: "이동통신 기술의 발전에 평생을 바치시며 5G 시대의 기틀을 다지셨습니다." },
  { id: 24, name: "서예진", school: "숙명여자대학교", company: "아모레퍼시픽", region: "경기 용인시", date: "2026-02-20", funeral: "용인세브란스병원 장례식장 1호실", contact: "010-2626-3737", age: 38, message: "글로벌 마케팅 전략으로 한국 뷰티 브랜드의 해외 시장 진출을 이끄셨습니다." },
  // ─── 25–36 ─────────────────────────────────────────────────
  { id: 25, name: "황인성", school: "경북대학교", company: "포스코", region: "경북 포항시", date: "2025-09-15", funeral: "포항세명기독병원 장례식장 1호실", contact: "010-3838-4949", age: 68, message: "포항제철소의 초창기 멤버로 한국 철강 산업의 기반을 다지는 데 핵심 역할을 하셨습니다." },
  { id: 26, name: "백지연", school: "서울대학교", company: "네이버", region: "경기 성남시", date: "2026-03-12", funeral: "분당서울대학교병원 장례식장 2호실", contact: "010-4950-5061", age: 35, message: "AI 연구팀을 이끌며 한국어 자연어 처리 기술의 발전에 크게 공헌하셨습니다." },
  { id: 27, name: "고동현", school: "카이스트", company: "LG전자", region: "서울 영등포구", date: "2025-12-28", funeral: "여의도성모병원 장례식장 4호실", contact: "010-5172-6283", age: 53, message: "가전제품 혁신 설계로 여러 글로벌 디자인 어워드를 수상하신 탁월한 엔지니어셨습니다." },
  { id: 28, name: "탁수빈", school: "중앙대학교", company: "CJ제일제당", region: "서울 동작구", date: "2026-01-18", funeral: "중앙대학교병원 장례식장 5호실", contact: "010-6394-7405", age: 47, message: "식품 과학자로서 건강한 먹거리 연구에 매진하시며 국민 건강 증진에 기여하셨습니다." },
  { id: 29, name: "남기훈", school: "성균관대학교", company: "삼성바이오로직스", region: "인천 연수구", date: "2025-11-10", funeral: "인하대병원 장례식장 3호실", contact: "010-7516-8627", age: 41, message: "바이오의약품 제조 공정 최적화에 기여하며 한국 바이오 산업의 성장을 이끌어주셨습니다." },
  { id: 30, name: "윤채영", school: "경희대학교", company: "서울아산병원", region: "서울 송파구", date: "2026-02-14", funeral: "서울아산병원 장례식장 5호실", contact: "010-8738-9849", age: 56, message: "심장내과 전문의로 수천 건의 시술을 성공적으로 수행하시며 많은 생명을 살리셨습니다." },
  { id: 31, name: "임도현", school: "충남대학교", company: "한화에어로스페이스", region: "대전 서구", date: "2025-10-05", funeral: "대전을지대학교병원 장례식장 1호실", contact: "010-9850-0961", age: 64, message: "항공우주 엔진 기술 개발에 평생을 헌신하시며 대한민국 우주 시대의 초석을 놓으셨습니다." },
  { id: 32, name: "구하린", school: "동국대학교", company: "KBS", region: "서울 영등포구", date: "2026-03-02", funeral: "한림대학교강남성심병원 장례식장 2호실", contact: "010-0072-1183", age: 50, message: "다큐멘터리 PD로서 사회 이면의 이야기를 조명하며 공영방송의 사명을 다하셨습니다." },
  { id: 33, name: "정우진", school: "서강대학교", company: "카카오", region: "경기 성남시", date: "2026-01-25", funeral: "분당제생병원 장례식장 3호실", contact: "010-1294-2305", age: 37, message: "핀테크 서비스 기획으로 모바일 금융의 대중화에 앞장서셨습니다." },
  { id: 34, name: "민서윤", school: "전남대학교", company: "기아자동차", region: "광주 서구", date: "2025-12-08", funeral: "광주기독병원 장례식장 1호실", contact: "010-2416-3527", age: 45, message: "전기차 배터리 시스템 설계에 매진하시며 친환경 모빌리티의 미래를 앞당기셨습니다." },
  { id: 35, name: "피승호", school: "한국외국어대학교", company: "외교부", region: "서울 서대문구", date: "2026-02-28", funeral: "신촌세브란스병원 장례식장 4호실", contact: "010-3638-4749", age: 58, message: "통역외교관으로 여러 정상회담에서 활약하시며 한국 외교의 가교 역할을 하셨습니다." },
  { id: 36, name: "하윤지", school: "전북대학교", company: "농협", region: "전북 전주시", date: "2026-03-14", funeral: "전주예수병원 장례식장 2호실", contact: "010-4850-5961", age: 60, message: "농촌 금융 지원과 지역 농산물 유통 혁신에 헌신하시며 농업인의 벗이 되어주셨습니다." },
];

// ─── 인기 검색 키워드 ────────────────────────────────────────
const popularKeywords = [
  { keyword: "삼성전자", count: 1842 },
  { keyword: "서울대학교", count: 1563 },
  { keyword: "현대자동차", count: 1321 },
  { keyword: "서울 강남구", count: 1204 },
  { keyword: "네이버", count: 1187 },
  { keyword: "연세대학교", count: 1052 },
  { keyword: "고려대학교", count: 998 },
  { keyword: "부산", count: 876 },
  { keyword: "카카오", count: 821 },
  { keyword: "포스코", count: 754 },
];

// ─── Constants ───────────────────────────────────────────────
const PAGE_SIZE = 30;

// ─── Helpers ─────────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function formatCount(n) {
  return n.toLocaleString();
}

// ─── SVG Icons (inline, no deps) ─────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const TrendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

// ─── Popular Keywords Section ────────────────────────────────
function PopularKeywords({ onKeywordClick }) {
  return (
    <div className="rounded-lg border border-line-bold bg-surface-raised p-5 mb-8">
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-accent"><TrendIcon /></span>
        <h2 className="text-sm font-semibold text-txt-primary tracking-tight">
          많이 검색된 키워드
        </h2>
        <span className="ml-auto text-[11px] text-txt-tertiary font-medium bg-surface-overlay px-2 py-0.5 rounded-full border border-line">
          TOP 10
        </span>
      </div>

      {/* Keywords grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5">
        {popularKeywords.map((item, idx) => (
          <button
            key={item.keyword}
            onClick={() => onKeywordClick(item.keyword)}
            className="flex items-center gap-3 py-2.5 px-3 rounded-md hover:bg-surface-hover transition-colors group text-left"
          >
            <span
              className={`rank-badge ${
                idx < 3
                  ? "bg-accent-muted text-accent"
                  : "bg-surface-overlay text-txt-tertiary"
              }`}
            >
              {idx + 1}
            </span>
            <span className="text-[13px] text-txt-primary group-hover:text-white font-medium truncate">
              {item.keyword}
            </span>
            <span className="ml-auto text-[11px] text-txt-tertiary tabular-nums font-medium">
              {formatCount(item.count)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Pagination ──────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const btnBase =
    "h-8 px-3 text-[13px] rounded-md border transition-all duration-150 font-medium";
  const btnDefault =
    "border-line text-txt-secondary hover:bg-surface-hover hover:text-txt-primary hover:border-line-bold";
  const btnActive = "bg-accent text-white border-accent";
  const btnDisabled = "opacity-25 cursor-not-allowed pointer-events-none";

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${btnDefault} ${currentPage === 1 ? btnDisabled : ""}`}
      >
        &lsaquo; 이전
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={`${btnBase} ${btnDefault}`}>
            1
          </button>
          {start > 2 && (
            <span className="px-1 text-txt-tertiary text-xs">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${btnBase} w-8 ${
            page === currentPage ? btnActive : btnDefault
          }`}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-1 text-txt-tertiary text-xs">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`${btnBase} ${btnDefault}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${btnDefault} ${
          currentPage === totalPages ? btnDisabled : ""
        }`}
      >
        다음 &rsaquo;
      </button>
    </div>
  );
}

// ─── Modal Component ─────────────────────────────────────────
function DetailModal({ person, onClose }) {
  if (!person) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 backdrop-enter"
      onClick={onClose}
    >
      <div
        className="bg-surface-raised border border-line-bold rounded-xl shadow-modal max-w-lg w-full max-h-[90vh] overflow-y-auto modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-line">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-txt-primary">
                故 {person.name}
              </h2>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[13px] text-txt-secondary">
                  향년 {person.age}세
                </span>
                <span className="w-1 h-1 rounded-full bg-txt-tertiary" />
                <span className="text-[13px] text-txt-tertiary">
                  {formatDate(person.date)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-txt-tertiary hover:text-txt-primary transition-colors p-1 rounded-md hover:bg-surface-hover"
              aria-label="닫기"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* 추모 메시지 */}
          <p className="text-[14px] text-txt-secondary leading-relaxed border-l-2 border-accent/40 pl-4">
            {person.message}
          </p>

          {/* 정보 그리드 */}
          <div className="grid grid-cols-2 gap-3">
            <InfoItem label="학교" value={person.school} />
            <InfoItem label="직장" value={person.company} />
            <InfoItem label="거주지" value={person.region} />
            <InfoItem label="부고일" value={formatDate(person.date)} />
          </div>

          {/* 장례식장 정보 */}
          <div className="bg-surface-overlay rounded-lg p-4 border border-line space-y-3">
            <h3 className="text-[13px] font-semibold text-txt-primary">
              장례식장 정보
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[12px] text-txt-tertiary min-w-[40px]">장소</span>
                <span className="text-[13px] text-txt-secondary">{person.funeral}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-txt-tertiary min-w-[40px]">연락처</span>
                <span className="text-[13px] text-accent font-medium">
                  {person.contact}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full bg-surface-overlay hover:bg-surface-hover text-txt-secondary hover:text-txt-primary border border-line hover:border-line-bold py-2.5 rounded-lg text-[13px] font-medium transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-surface-overlay rounded-lg p-3 border border-line">
      <p className="text-[11px] text-txt-tertiary mb-0.5">{label}</p>
      <p className="text-[13px] text-txt-primary font-medium">{value}</p>
    </div>
  );
}

// ─── Card Component ──────────────────────────────────────────
function ObituaryCard({ person, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card-float w-full text-left bg-surface-raised border border-line-bold rounded-lg p-5 hover:bg-surface-hover group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-semibold text-txt-primary group-hover:text-white transition-colors">
            故 {person.name}
          </h3>
          <p className="text-[12px] text-txt-tertiary mt-1">
            {formatDate(person.date)}
          </p>
        </div>
        <span className="text-[11px] bg-accent-muted text-accent px-2.5 py-1 rounded-full font-semibold">
          향년 {person.age}세
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 text-[12px]">
        <span className="bg-surface-overlay text-txt-secondary border border-line px-2.5 py-1 rounded-md">
          {person.school}
        </span>
        <span className="bg-surface-overlay text-txt-secondary border border-line px-2.5 py-1 rounded-md">
          {person.company}
        </span>
        <span className="bg-surface-overlay text-txt-secondary border border-line px-2.5 py-1 rounded-md">
          {person.region}
        </span>
      </div>

      <p className="text-[13px] text-txt-tertiary mt-3 line-clamp-2 leading-relaxed">
        {person.message}
      </p>

      <div className="flex items-center gap-1 mt-3 text-[12px] text-accent font-medium group-hover:text-accent-hover transition-colors">
        <span>상세 정보 보기</span>
        <ChevronRight />
      </div>
    </button>
  );
}

// ─── Main App ────────────────────────────────────────────────
export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...mockData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    if (!q) return sorted;
    return sorted.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.school.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleQueryChange = (value) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleKeywordClick = (keyword) => {
    handleQueryChange(keyword);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSearching = query.trim() !== "";

  return (
    <div className="min-h-screen bg-surface font-sans">
      {/* ── Fixed Header ──────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-line bg-surface/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Last Link"
            className="w-7 h-7 rounded-md"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <h1 className="text-[15px] font-bold text-txt-primary tracking-tight">
            Last<span className="text-accent ml-0.5">Link</span>
          </h1>
        </div>
      </header>

      {/* ── Hero + Search ─────────────────────────────── */}
      <section className="pt-28 pb-10 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-txt-primary tracking-tight leading-tight">
            마지막 인사를 전하고 싶은
            <br />
            <span className="text-accent">인연</span>을 찾아보세요
          </h2>
          <p className="mt-3 text-[14px] text-txt-tertiary">
            학교, 직장, 지역 등 소속 키워드로 소식이 끊긴 지인의 부고를 찾을 수
            있습니다
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-tertiary pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="학교, 직장, 지역명 등으로 검색"
              className="search-glow w-full pl-11 pr-11 py-3.5 rounded-lg bg-surface-raised border border-line-bold text-[14px] text-txt-primary placeholder:text-txt-tertiary focus:outline-none transition-shadow"
            />
            {query && (
              <button
                onClick={() => handleQueryChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-txt-tertiary hover:text-txt-primary transition-colors p-0.5 rounded hover:bg-surface-hover"
                aria-label="검색어 지우기"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-5 pb-12">
        {/* 인기 키워드 */}
        {!isSearching && currentPage === 1 && (
          <PopularKeywords onKeywordClick={handleKeywordClick} />
        )}

        {/* 결과 카운트 */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[13px] text-txt-secondary">
            {isSearching ? (
              <>
                <span className="text-accent font-semibold">
                  &lsquo;{query}&rsquo;
                </span>
                {" 검색 결과 "}
                <span className="text-txt-primary font-semibold">
                  {filteredData.length}건
                </span>
              </>
            ) : (
              <>
                전체 부고{" "}
                <span className="text-txt-primary font-semibold">
                  {filteredData.length}건
                </span>
              </>
            )}
          </p>
          {totalPages > 1 && (
            <p className="text-[12px] text-txt-tertiary">
              {currentPage} / {totalPages} 페이지
            </p>
          )}
        </div>

        {/* 검색 결과 없음 */}
        {isSearching && filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full bg-surface-raised border border-line flex items-center justify-center mx-auto mb-4">
              <SearchIcon />
            </div>
            <p className="text-[15px] font-medium text-txt-secondary">
              &lsquo;{query}&rsquo;에 대한 검색 결과가 없습니다
            </p>
            <p className="text-[13px] text-txt-tertiary mt-1.5">
              다른 키워드로 검색해보세요
            </p>
          </div>
        )}

        {/* 카드 리스트 */}
        {paginatedData.length > 0 && (
          <div className="grid gap-3">
            {paginatedData.map((person) => (
              <ObituaryCard
                key={person.id}
                person={person}
                onClick={() => setSelected(person)}
              />
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-line text-center py-6">
        <p className="text-[12px] text-txt-tertiary">
          &copy; 2026 Last Link &middot; 마지막 인사를 전하는 곳
        </p>
      </footer>

      {/* ── Modal ──────────────────────────────────────── */}
      <DetailModal person={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
