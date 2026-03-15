import { useState, useMemo } from "react";

// ─── Mock Data ───────────────────────────────────────────────
const mockData = [
  {
    id: 1,
    name: "김영수",
    school: "서울대학교",
    company: "삼성전자",
    region: "서울 강남구",
    date: "2025-12-03",
    funeral: "서울성모병원 장례식장 3호실",
    contact: "010-1234-5678",
    age: 67,
    message: "고인은 평생 반도체 연구에 헌신하셨으며, 따뜻한 마음으로 후배들을 이끌어주셨습니다.",
  },
  {
    id: 2,
    name: "이정희",
    school: "연세대학교",
    company: "현대자동차",
    region: "경기 수원시",
    date: "2025-11-28",
    funeral: "아주대학교병원 장례식장 5호실",
    contact: "010-2345-6789",
    age: 72,
    message: "자동차 엔지니어로 40년간 근무하시며 한국 자동차 산업 발전에 크게 기여하셨습니다.",
  },
  {
    id: 3,
    name: "박민호",
    school: "고려대학교",
    company: "LG화학",
    region: "대전 유성구",
    date: "2026-01-15",
    funeral: "대전 보훈병원 장례식장 2호실",
    contact: "010-3456-7890",
    age: 58,
    message: "화학 연구원으로 재직하며 수많은 특허를 보유하셨던 열정적인 과학자셨습니다.",
  },
  {
    id: 4,
    name: "최수진",
    school: "이화여자대학교",
    company: "서울시청",
    region: "서울 종로구",
    date: "2026-02-10",
    funeral: "서울대학교병원 장례식장 1호실",
    contact: "010-4567-8901",
    age: 63,
    message: "30년간 공직에 몸담으며 시민을 위한 정책 수립에 평생을 바치셨습니다.",
  },
  {
    id: 5,
    name: "정대원",
    school: "부산대학교",
    company: "포스코",
    region: "부산 해운대구",
    date: "2026-01-22",
    funeral: "부산대학교병원 장례식장 7호실",
    contact: "010-5678-9012",
    age: 70,
    message: "제철소에서 현장 기술자로 시작해 임원까지 오르신 입지전적 인물이셨습니다.",
  },
  {
    id: 6,
    name: "한미영",
    school: "숙명여자대학교",
    company: "아모레퍼시픽",
    region: "서울 용산구",
    date: "2026-03-01",
    funeral: "순천향대학교병원 장례식장 4호실",
    contact: "010-6789-0123",
    age: 55,
    message: "화장품 연구개발 분야의 선구자로, K-뷰티의 글로벌 확장에 기여하셨습니다.",
  },
  {
    id: 7,
    name: "윤상철",
    school: "한양대학교",
    company: "네이버",
    region: "경기 성남시",
    date: "2026-02-18",
    funeral: "분당서울대학교병원 장례식장 6호실",
    contact: "010-7890-1234",
    age: 48,
    message: "초기 인터넷 시대부터 검색 기술 개발에 매진하셨던 뛰어난 엔지니어셨습니다.",
  },
  {
    id: 8,
    name: "송지은",
    school: "경희대학교",
    company: "서울아산병원",
    region: "서울 송파구",
    date: "2026-03-05",
    funeral: "서울아산병원 장례식장 2호실",
    contact: "010-8901-2345",
    age: 61,
    message: "소아과 전문의로 35년간 아이들의 건강을 지켜오신 따뜻한 의사셨습니다.",
  },
  {
    id: 9,
    name: "오태근",
    school: "전남대학교",
    company: "기아자동차",
    region: "광주 북구",
    date: "2026-02-25",
    funeral: "전남대학교병원 장례식장 3호실",
    contact: "010-9012-3456",
    age: 65,
    message: "광주 지역 사회 발전에 헌신하시며, 많은 이웃들에게 존경받으셨습니다.",
  },
  {
    id: 10,
    name: "임서현",
    school: "중앙대학교",
    company: "CJ ENM",
    region: "서울 마포구",
    date: "2026-03-10",
    funeral: "세브란스병원 장례식장 5호실",
    contact: "010-0123-4567",
    age: 52,
    message: "방송 PD로 수많은 명작 프로그램을 만들어내신 한국 방송계의 자랑이셨습니다.",
  },
  {
    id: 11,
    name: "강준혁",
    school: "카이스트",
    company: "SK하이닉스",
    region: "경기 이천시",
    date: "2025-12-20",
    funeral: "이천시립장례식장 1호실",
    contact: "010-1111-2222",
    age: 44,
    message: "차세대 메모리 반도체 설계를 이끌며 글로벌 기술 경쟁력 강화에 기여하셨습니다.",
  },
  {
    id: 12,
    name: "배은지",
    school: "동국대학교",
    company: "국립중앙박물관",
    region: "서울 용산구",
    date: "2026-01-08",
    funeral: "중앙대학교병원 장례식장 2호실",
    contact: "010-3333-4444",
    age: 59,
    message: "한국 미술사 연구에 평생을 바치시며, 우리 문화유산의 가치를 알리셨습니다.",
  },
];

// ─── Helper ──────────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// ─── Modal Component ─────────────────────────────────────────
function DetailModal({ person, onClose }) {
  if (!person) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-navy-800 text-white px-6 py-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              故 {person.name}
              <span className="ml-2 text-navy-200 text-base font-normal">
                향년 {person.age}세
              </span>
            </h2>
            <button
              onClick={onClose}
              className="text-navy-200 hover:text-white transition-colors text-2xl leading-none"
              aria-label="닫기"
            >
              &times;
            </button>
          </div>
          <p className="text-navy-200 text-sm mt-1">{formatDate(person.date)}</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-gray-700 leading-relaxed border-l-4 border-navy-200 pl-4 italic">
            {person.message}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <InfoItem icon="🎓" label="학교" value={person.school} />
            <InfoItem icon="🏢" label="직장" value={person.company} />
            <InfoItem icon="📍" label="거주지" value={person.region} />
            <InfoItem icon="📅" label="부고일" value={formatDate(person.date)} />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-navy-800 text-sm flex items-center gap-2">
              <span>🏥</span> 장례식장 정보
            </h3>
            <p className="text-gray-700 text-sm">{person.funeral}</p>
            <p className="text-gray-500 text-sm">
              연락처:{" "}
              <span className="text-navy-600 font-medium">{person.contact}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full bg-navy-800 hover:bg-navy-700 text-white py-3 rounded-xl font-medium transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
      <span className="text-base">{icon}</span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-gray-700 font-medium">{value}</p>
      </div>
    </div>
  );
}

// ─── Card Component ──────────────────────────────────────────
function ObituaryCard({ person, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-navy-300 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-navy-900 group-hover:text-navy-600 transition-colors">
            故 {person.name}
          </h3>
          <p className="text-sm text-gray-400 mt-0.5">{formatDate(person.date)}</p>
        </div>
        <span className="text-xs bg-navy-50 text-navy-600 px-2.5 py-1 rounded-full font-medium">
          향년 {person.age}세
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        <span className="bg-gray-100 px-2.5 py-1 rounded-full">🎓 {person.school}</span>
        <span className="bg-gray-100 px-2.5 py-1 rounded-full">🏢 {person.company}</span>
        <span className="bg-gray-100 px-2.5 py-1 rounded-full">📍 {person.region}</span>
      </div>

      <p className="text-sm text-gray-500 mt-3 line-clamp-2">{person.message}</p>

      <p className="text-xs text-navy-500 mt-3 font-medium group-hover:underline">
        상세 정보 보기 &rarr;
      </p>
    </button>
  );
}

// ─── Main App ────────────────────────────────────────────────
export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return mockData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.school.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ────────────────────────────────────── */}
      <header className="bg-navy-800 text-white">
        <div className="max-w-3xl mx-auto px-4 pt-12 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Last <span className="text-navy-300">Link</span>
          </h1>
          <p className="mt-3 text-navy-200 text-base sm:text-lg">
            마지막 인사를 전하고 싶은 인연을 찾아보세요
          </p>

          {/* ── Search Bar ─────────────────────────────── */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="학교, 직장, 지역명 등으로 검색"
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 text-base placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-navy-400/30 shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* ── Results ────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {query.trim() === "" && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🕊️</p>
            <p className="text-lg font-medium text-gray-500">
              검색어를 입력하면 결과가 표시됩니다
            </p>
            <p className="text-sm mt-1">이름, 학교, 직장, 지역명으로 검색해보세요</p>
          </div>
        )}

        {query.trim() !== "" && results.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium text-gray-500">
              &lsquo;{query}&rsquo;에 대한 검색 결과가 없습니다
            </p>
            <p className="text-sm mt-1">다른 키워드로 검색해보세요</p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-navy-700">{results.length}건</span>의
              검색 결과
            </p>
            <div className="grid gap-4">
              {results.map((person) => (
                <ObituaryCard
                  key={person.id}
                  person={person}
                  onClick={() => setSelected(person)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200">
        &copy; 2026 Last Link &middot; 마지막 인사를 전하는 곳
      </footer>

      {/* ── Modal ──────────────────────────────────────── */}
      <DetailModal person={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
