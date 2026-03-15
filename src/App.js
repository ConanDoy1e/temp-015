import { useState, useMemo } from "react";

// ─── Mock Data (100건) ───────────────────────────────────────
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
  // ─── 37–50 ─────────────────────────────────────────────────
  { id: 37, name: "양진우", school: "서울대학교", company: "현대건설", region: "서울 강동구", date: "2025-08-20", funeral: "서울아산병원 장례식장 1호실", contact: "010-1001-2002", age: 69, message: "국내외 대형 건설 프로젝트를 총괄하시며 한국 건설 산업의 위상을 높이셨습니다." },
  { id: 38, name: "전소연", school: "이화여자대학교", company: "한국교육방송공사", region: "서울 강남구", date: "2025-07-14", funeral: "강남세브란스병원 장례식장 3호실", contact: "010-2003-3004", age: 54, message: "교육 프로그램 기획자로서 평생학습 문화 확산에 지대한 공헌을 하셨습니다." },
  { id: 39, name: "손태영", school: "고려대학교", company: "두산중공업", region: "경남 창원시", date: "2025-09-02", funeral: "창원경상대학교병원 장례식장 2호실", contact: "010-3005-4006", age: 63, message: "발전 설비 기술 개발에 30년을 헌신하시며 에너지 산업 발전에 이바지하셨습니다." },
  { id: 40, name: "곽은서", school: "연세대학교", company: "삼성물산", region: "서울 강남구", date: "2025-10-18", funeral: "삼성서울병원 장례식장 3호실", contact: "010-4007-5008", age: 47, message: "건축 설계 분야에서 감각적인 디자인으로 도시 경관의 혁신을 이끄셨습니다." },
  { id: 41, name: "마정훈", school: "한양대학교", company: "한국전력공사", region: "전남 나주시", date: "2025-11-22", funeral: "나주종합병원 장례식장 1호실", contact: "010-5009-6010", age: 58, message: "전력 시스템 안정화에 기여하시며 국민의 안전한 전력 사용을 책임지셨습니다." },
  { id: 42, name: "주하영", school: "서강대학교", company: "네이버", region: "경기 성남시", date: "2025-12-05", funeral: "분당서울대학교병원 장례식장 4호실", contact: "010-6011-7012", age: 33, message: "클라우드 인프라 아키텍트로서 대규모 서비스의 안정성 확보에 핵심 역할을 하셨습니다." },
  { id: 43, name: "추민석", school: "카이스트", company: "삼성전자", region: "경기 화성시", date: "2026-01-05", funeral: "화성시립장례식장 2호실", contact: "010-7013-8014", age: 42, message: "파운드리 공정 기술 개발의 핵심 인력으로 글로벌 반도체 경쟁력을 견인하셨습니다." },
  { id: 44, name: "변서윤", school: "숙명여자대학교", company: "한국무역협회", region: "서울 강남구", date: "2026-02-12", funeral: "강남세브란스병원 장례식장 1호실", contact: "010-8015-9016", age: 51, message: "국제 통상 전문가로서 한국 수출 기업의 해외 진출을 적극 지원하셨습니다." },
  { id: 45, name: "심재호", school: "부산대학교", company: "한진해운", region: "부산 중구", date: "2025-08-30", funeral: "부산대학교병원 장례식장 3호실", contact: "010-9017-0018", age: 66, message: "해운 물류 분야에서 40년간 일하시며 부산항의 글로벌 허브 성장에 기여하셨습니다." },
  { id: 46, name: "봉지현", school: "경북대학교", company: "현대자동차", region: "울산 북구", date: "2026-03-06", funeral: "울산대학교병원 장례식장 2호실", contact: "010-0019-1020", age: 55, message: "자동차 디자인 센터에서 차세대 모델의 외관 디자인을 총괄하신 감각의 소유자셨습니다." },
  { id: 47, name: "옥승민", school: "전남대학교", company: "LG디스플레이", region: "경기 파주시", date: "2025-07-25", funeral: "일산백병원 장례식장 4호실", contact: "010-1021-2022", age: 49, message: "OLED 패널 기술 개발에 앞장서시며 차세대 디스플레이 시대를 앞당기셨습니다." },
  { id: 48, name: "노은채", school: "성균관대학교", company: "SK이노베이션", region: "대전 유성구", date: "2025-09-18", funeral: "대전성모병원 장례식장 1호실", contact: "010-2023-3024", age: 44, message: "배터리 소재 연구에 매진하시며 전기차 배터리 성능 향상에 크게 기여하셨습니다." },
  { id: 49, name: "편도윤", school: "중앙대학교", company: "MBC", region: "서울 마포구", date: "2026-01-12", funeral: "신촌세브란스병원 장례식장 2호실", contact: "010-3025-4026", age: 57, message: "보도국 기자로 30년간 현장을 누비시며 진실 보도의 가치를 실천하셨습니다." },
  { id: 50, name: "길수아", school: "동국대학교", company: "카카오", region: "제주 제주시", date: "2025-10-28", funeral: "제주한라병원 장례식장 1호실", contact: "010-4027-5028", age: 36, message: "소셜 플랫폼 PM으로 사용자 중심의 서비스 설계 철학을 팀에 전파하셨습니다." },
  // ─── 51–70 ─────────────────────────────────────────────────
  { id: 51, name: "위정민", school: "충북대학교", company: "한국수력원자력", region: "경북 경주시", date: "2025-08-08", funeral: "경주동산병원 장례식장 1호실", contact: "010-5029-6030", age: 62, message: "원자력 안전 관리 분야에서 묵묵히 소명을 다하시며 에너지 안보에 기여하셨습니다." },
  { id: 52, name: "범수진", school: "서울대학교", company: "삼성전자", region: "경기 수원시", date: "2025-11-02", funeral: "아주대학교병원 장례식장 1호실", contact: "010-6031-7032", age: 40, message: "갤럭시 시리즈의 카메라 모듈 설계를 주도하시며 모바일 카메라 혁신을 이끄셨습니다." },
  { id: 53, name: "탁윤서", school: "한국외국어대학교", company: "대한무역투자진흥공사", region: "서울 서초구", date: "2026-02-22", funeral: "서울성모병원 장례식장 2호실", contact: "010-7033-8034", age: 48, message: "코트라 해외지사장으로 한국 중소기업의 글로벌 시장 개척을 돕는 데 헌신하셨습니다." },
  { id: 54, name: "방재현", school: "전북대학교", company: "농협", region: "전북 익산시", date: "2025-12-12", funeral: "익산시립장례식장 2호실", contact: "010-8035-9036", age: 64, message: "농촌 지역 금융 접근성 향상에 평생을 기울이시며 농업인의 경제적 자립을 도우셨습니다." },
  { id: 55, name: "석지원", school: "경희대학교", company: "한국관광공사", region: "서울 중구", date: "2026-01-28", funeral: "서울대학교병원 장례식장 5호실", contact: "010-9037-0038", age: 52, message: "한국 관광 산업의 국제화를 위해 헌신하시며 K-관광 콘텐츠 기획에 앞장서셨습니다." },
  { id: 56, name: "국현우", school: "포항공과대학교", company: "LG에너지솔루션", region: "충북 청주시", date: "2025-09-25", funeral: "충북대학교병원 장례식장 3호실", contact: "010-0039-1040", age: 39, message: "차세대 배터리 양극재 연구로 전기차 시대의 핵심 기술 발전에 공헌하셨습니다." },
  { id: 57, name: "어수빈", school: "연세대학교", company: "현대자동차", region: "경기 의왕시", date: "2026-03-09", funeral: "분당차병원 장례식장 1호실", contact: "010-1041-2042", age: 46, message: "자율주행 소프트웨어 개발팀을 이끌며 미래 모빌리티 기술의 토대를 마련하셨습니다." },
  { id: 58, name: "선다은", school: "고려대학교", company: "한국은행", region: "서울 중구", date: "2025-07-20", funeral: "고려대학교안암병원 장례식장 2호실", contact: "010-2043-3044", age: 55, message: "금융 안정 분석 분야의 전문가로서 외환위기 극복 과정에서 핵심적인 역할을 하셨습니다." },
  { id: 59, name: "라영호", school: "한양대학교", company: "GS건설", region: "서울 강남구", date: "2025-11-15", funeral: "강남세브란스병원 장례식장 5호실", contact: "010-3045-4046", age: 61, message: "해외 플랜트 건설 분야에서 30년간 활약하시며 한국 건설사의 글로벌 진출에 기여하셨습니다." },
  { id: 60, name: "방서현", school: "이화여자대학교", company: "삼성생명", region: "서울 서초구", date: "2026-02-01", funeral: "삼성서울병원 장례식장 5호실", contact: "010-4047-5048", age: 50, message: "보험 상품 설계 전문가로서 고객 맞춤형 금융 서비스 발전에 힘쓰셨습니다." },
  { id: 61, name: "도경준", school: "충남대학교", company: "한화시스템", region: "대전 유성구", date: "2025-08-15", funeral: "대전 보훈병원 장례식장 1호실", contact: "010-5049-6050", age: 57, message: "국방 전자 시스템 개발에 기여하시며 대한민국의 방위 산업 발전에 이바지하셨습니다." },
  { id: 62, name: "봉하나", school: "서강대학교", company: "쿠팡", region: "서울 송파구", date: "2025-10-08", funeral: "서울아산병원 장례식장 4호실", contact: "010-6051-7052", age: 34, message: "물류 알고리즘 최적화를 통해 로켓배송의 기반이 되는 시스템을 설계하셨습니다." },
  { id: 63, name: "표민재", school: "경북대학교", company: "삼성SDI", region: "경북 울릉군", date: "2026-01-20", funeral: "대구가톨릭대학교병원 장례식장 2호실", contact: "010-7053-8054", age: 43, message: "이차전지 안전성 연구의 선봉에서 배터리 화재 방지 기술을 개발하셨습니다." },
  { id: 64, name: "복지수", school: "숙명여자대학교", company: "대한적십자사", region: "서울 중구", date: "2025-12-18", funeral: "서울대학교병원 장례식장 4호실", contact: "010-8055-9056", age: 60, message: "인도주의 구호 활동에 30년간 헌신하시며 국내외 재난 현장에서 수많은 생명을 구하셨습니다." },
  { id: 65, name: "감우석", school: "부산대학교", company: "한국해양과학기술원", region: "부산 영도구", date: "2026-03-13", funeral: "부산대학교병원 장례식장 5호실", contact: "010-9057-0058", age: 56, message: "해양 생태계 보전 연구에 매진하시며 해양 환경 정책 수립에 학술적 기반을 제공하셨습니다." },
  { id: 66, name: "설은지", school: "카이스트", company: "네이버", region: "경기 성남시", date: "2025-09-10", funeral: "분당서울대학교병원 장례식장 1호실", contact: "010-0059-1060", age: 31, message: "대규모 언어 모델 연구에 앞장서시며 한국 AI 기술의 글로벌 경쟁력을 높이셨습니다." },
  { id: 67, name: "천동진", school: "전남대학교", company: "기아자동차", region: "광주 광산구", date: "2025-11-25", funeral: "전남대학교병원 장례식장 1호실", contact: "010-1061-2062", age: 52, message: "차량 안전 시스템 테스트 엔지니어로 교통 안전 향상에 묵묵히 기여하셨습니다." },
  { id: 68, name: "두하은", school: "성균관대학교", company: "SK텔레콤", region: "서울 중구", date: "2026-02-08", funeral: "한양대학교병원 장례식장 4호실", contact: "010-2063-3064", age: 45, message: "차세대 통신 네트워크 설계를 총괄하시며 6G 기술 연구의 기반을 다지셨습니다." },
  { id: 69, name: "장세라", school: "중앙대학교", company: "SM엔터테인먼트", region: "서울 강남구", date: "2025-08-05", funeral: "강남세브란스병원 장례식장 2호실", contact: "010-3065-4066", age: 41, message: "아티스트 매니지먼트 디렉터로 K-POP의 글로벌 확산에 전략적 기여를 하셨습니다." },
  { id: 70, name: "류정호", school: "동국대학교", company: "한국철도공사", region: "대전 동구", date: "2025-10-15", funeral: "대전을지대학교병원 장례식장 3호실", contact: "010-4067-5068", age: 63, message: "KTX 운행 관리 시스템 구축에 기여하시며 고속철도 시대의 개막을 함께하셨습니다." },
  // ─── 71–85 ─────────────────────────────────────────────────
  { id: 71, name: "남궁현", school: "서울대학교", company: "LG화학", region: "서울 영등포구", date: "2026-01-10", funeral: "여의도성모병원 장례식장 1호실", contact: "010-5069-6070", age: 59, message: "석유화학 공정 혁신을 이끌며 원가 절감과 친환경 생산 체계 구축에 공헌하셨습니다." },
  { id: 72, name: "강다인", school: "연세대학교", company: "삼성전자", region: "경기 수원시", date: "2025-07-30", funeral: "아주대학교병원 장례식장 3호실", contact: "010-6071-7072", age: 37, message: "모바일 AP 설계 엔지니어로서 엑시노스 칩셋의 성능 혁신에 핵심적인 역할을 하셨습니다." },
  { id: 73, name: "윤태성", school: "고려대학교", company: "포스코", region: "경북 포항시", date: "2025-12-22", funeral: "포항세명기독병원 장례식장 2호실", contact: "010-7073-8074", age: 65, message: "친환경 제강 기술인 수소환원제철 연구에 선도적 역할을 하셨습니다." },
  { id: 74, name: "은서연", school: "이화여자대학교", company: "유니세프 한국위원회", region: "서울 마포구", date: "2026-02-15", funeral: "신촌세브란스병원 장례식장 1호실", contact: "010-8075-9076", age: 53, message: "아동 권리 보호와 글로벌 교육 지원 프로그램을 기획하시며 세계 아이들의 미래를 밝히셨습니다." },
  { id: 75, name: "문기태", school: "한양대학교", company: "현대모비스", region: "경기 용인시", date: "2025-09-05", funeral: "용인세브란스병원 장례식장 3호실", contact: "010-9077-0078", age: 50, message: "자동차 부품 모듈화 설계를 통해 생산 효율성과 품질 향상에 크게 기여하셨습니다." },
  { id: 76, name: "양소율", school: "서강대학교", company: "카카오", region: "경기 성남시", date: "2025-11-08", funeral: "분당제생병원 장례식장 1호실", contact: "010-0079-1080", age: 35, message: "카카오톡 채팅 서비스의 실시간 메시징 시스템을 설계하신 핵심 개발자셨습니다." },
  { id: 77, name: "오지한", school: "포항공과대학교", company: "SK하이닉스", region: "경기 이천시", date: "2026-03-01", funeral: "이천시립장례식장 3호실", contact: "010-1081-2082", age: 38, message: "HBM 메모리 적층 기술의 핵심 연구원으로 AI 시대의 반도체 혁신을 이끄셨습니다." },
  { id: 78, name: "조은별", school: "경희대학교", company: "서울아산병원", region: "서울 송파구", date: "2025-08-22", funeral: "서울아산병원 장례식장 1호실", contact: "010-2083-3084", age: 47, message: "간 이식 외과 전문의로서 수백 건의 이식 수술을 성공적으로 수행하셨습니다." },
  { id: 79, name: "석현준", school: "전북대학교", company: "현대자동차", region: "전북 전주시", date: "2025-10-02", funeral: "전북대학교병원 장례식장 3호실", contact: "010-3085-4086", age: 57, message: "완성차 도장 공정 기술의 혁신을 이끌며 품질과 환경 모두를 고려한 생산 체계를 구축하셨습니다." },
  { id: 80, name: "홍다솜", school: "카이스트", company: "토스", region: "서울 강남구", date: "2026-01-28", funeral: "삼성서울병원 장례식장 2호실", contact: "010-4087-5088", age: 32, message: "핀테크 보안 시스템 아키텍트로서 안전한 모바일 금융 인프라 구축에 헌신하셨습니다." },
  { id: 81, name: "추인호", school: "충남대학교", company: "한화에어로스페이스", region: "대전 유성구", date: "2025-12-01", funeral: "대전성모병원 장례식장 2호실", contact: "010-5089-6090", age: 60, message: "위성 통신 장비 개발에 평생을 바치시며 한국의 우주 산업 발전에 이바지하셨습니다." },
  { id: 82, name: "배채원", school: "숙명여자대학교", company: "아모레퍼시픽", region: "경기 용인시", date: "2026-02-25", funeral: "용인세브란스병원 장례식장 2호실", contact: "010-6091-7092", age: 42, message: "스킨케어 원료 연구에 매진하시며 혁신적인 성분 개발로 업계를 선도하셨습니다." },
  { id: 83, name: "진승우", school: "경북대학교", company: "삼성전자", region: "경기 화성시", date: "2025-09-28", funeral: "화성시립장례식장 1호실", contact: "010-7093-8094", age: 44, message: "EUV 노광 공정 엔지니어로서 차세대 반도체 미세 공정 기술의 발전을 주도하셨습니다." },
  { id: 84, name: "두예린", school: "한국외국어대학교", company: "국제연합(UN)", region: "서울 종로구", date: "2025-11-20", funeral: "서울대학교병원 장례식장 2호실", contact: "010-8095-9096", age: 49, message: "유엔 인권사무소에서 동아시아 인권 증진을 위해 활동하시며 국제사회에서 존경받으셨습니다." },
  { id: 85, name: "마도연", school: "부산대학교", company: "롯데케미칼", region: "부산 사하구", date: "2026-03-07", funeral: "부산백병원 장례식장 1호실", contact: "010-9097-0098", age: 54, message: "석유화학 제품의 친환경 공정 전환을 주도하시며 탄소중립 실현에 앞장서셨습니다." },
  // ─── 86–100 ────────────────────────────────────────────────
  { id: 86, name: "곽진호", school: "서울대학교", company: "네이버", region: "경기 성남시", date: "2025-07-18", funeral: "분당서울대학교병원 장례식장 5호실", contact: "010-1100-2200", age: 36, message: "네이버 검색 랭킹 알고리즘을 혁신하시며 정보 접근성 향상에 기여하셨습니다." },
  { id: 87, name: "하준서", school: "연세대학교", company: "현대건설", region: "서울 종로구", date: "2025-08-28", funeral: "세브란스병원 장례식장 1호실", contact: "010-2201-3302", age: 67, message: "스마트 건설 기술 도입의 선봉에 서시며 건설 현장의 디지털 전환을 이끄셨습니다." },
  { id: 88, name: "안지호", school: "고려대학교", company: "LG전자", region: "서울 영등포구", date: "2025-10-25", funeral: "여의도성모병원 장례식장 2호실", contact: "010-3303-4404", age: 51, message: "가전 AI 플랫폼 ThinQ의 핵심 아키텍트로서 스마트홈 생태계 구축에 공헌하셨습니다." },
  { id: 89, name: "윤가인", school: "이화여자대학교", company: "서울시립미술관", region: "서울 중구", date: "2025-12-10", funeral: "서울대학교병원 장례식장 6호실", contact: "010-4405-5506", age: 48, message: "현대미술 전시 기획자로서 시민과 예술의 접점을 넓히는 데 헌신하셨습니다." },
  { id: 90, name: "임채민", school: "한양대학교", company: "삼성SDS", region: "서울 송파구", date: "2026-01-15", funeral: "서울아산병원 장례식장 3호실", contact: "010-5507-6608", age: 43, message: "기업용 블록체인 플랫폼 개발을 주도하시며 디지털 신뢰 인프라 구축에 기여하셨습니다." },
  { id: 91, name: "위다솔", school: "서강대학교", company: "쿠팡", region: "서울 강남구", date: "2026-02-18", funeral: "강남세브란스병원 장례식장 4호실", contact: "010-6609-7710", age: 30, message: "추천 알고리즘 팀 리드로서 개인화 쇼핑 경험 혁신의 기반을 설계하셨습니다." },
  { id: 92, name: "백도준", school: "카이스트", company: "SK이노베이션", region: "대전 유성구", date: "2025-09-12", funeral: "대전 보훈병원 장례식장 3호실", contact: "010-7711-8812", age: 41, message: "전고체 배터리 원천 기술 연구에 매진하시며 차세대 에너지 저장 기술의 초석을 놓으셨습니다." },
  { id: 93, name: "조아라", school: "경희대학교", company: "분당서울대학교병원", region: "경기 성남시", date: "2025-11-30", funeral: "분당서울대학교병원 장례식장 3호실", contact: "010-8813-9914", age: 53, message: "재활의학과 전문의로서 환자들의 일상 복귀를 돕는 데 평생을 바치셨습니다." },
  { id: 94, name: "함태진", school: "전남대학교", company: "포스코", region: "전남 광양시", date: "2026-03-11", funeral: "광양시립장례식장 1호실", contact: "010-9915-0016", age: 58, message: "광양제철소의 공정 안전 관리 체계를 정립하시며 무재해 기록 달성에 기여하셨습니다." },
  { id: 95, name: "장하율", school: "성균관대학교", company: "삼성전자", region: "경기 수원시", date: "2025-08-10", funeral: "아주대학교병원 장례식장 2호실", contact: "010-0017-1118", age: 45, message: "갤럭시 S시리즈의 소프트웨어 최적화를 총괄하시며 사용자 경험 혁신에 힘쓰셨습니다." },
  { id: 96, name: "도세아", school: "중앙대학교", company: "CJ ENM", region: "서울 마포구", date: "2025-10-20", funeral: "세브란스병원 장례식장 2호실", contact: "010-1119-2220", age: 39, message: "OTT 플랫폼 콘텐츠 전략을 수립하시며 한국 드라마의 글로벌 유통을 혁신하셨습니다." },
  { id: 97, name: "소준혁", school: "충북대학교", company: "한국전력공사", region: "전남 나주시", date: "2025-12-25", funeral: "나주종합병원 장례식장 2호실", contact: "010-2221-3322", age: 61, message: "스마트 그리드 시스템 구축을 총괄하시며 전력 효율화와 신재생 에너지 통합에 기여하셨습니다." },
  { id: 98, name: "길하준", school: "동국대학교", company: "KBS", region: "서울 영등포구", date: "2026-02-05", funeral: "한림대학교강남성심병원 장례식장 1호실", contact: "010-3323-4424", age: 55, message: "시사 다큐멘터리 제작에 30년간 헌신하시며 방송 저널리즘의 깊이를 더하셨습니다." },
  { id: 99, name: "피수현", school: "한국외국어대학교", company: "외교부", region: "서울 서대문구", date: "2025-09-22", funeral: "신촌세브란스병원 장례식장 3호실", contact: "010-4425-5526", age: 52, message: "중동 외교 전문가로서 에너지 자원 외교와 경제 협력 강화에 크게 이바지하셨습니다." },
  { id: 100, name: "남가온", school: "전북대학교", company: "현대자동차", region: "전북 전주시", date: "2026-03-15", funeral: "전북대학교병원 장례식장 2호실", contact: "010-5527-6628", age: 47, message: "수소전기차 연료전지 시스템 개발에 핵심적 역할을 하시며 수소경제 실현에 앞장서셨습니다." },
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

// ─── Color tokens (hardcoded hex) ────────────────────────────
const C = {
  bg: "#0C0C0C",
  raised: "#161616",
  overlay: "#1C1C1C",
  hovBg: "#222222",
  border: "rgba(255,255,255,0.14)",
  borderSoft: "rgba(255,255,255,0.08)",
  accent: "#5E5CE6",
  accentHov: "#6F6DF2",
  accentMuted: "rgba(94,92,230,0.15)",
  txt1: "#E2E8F0",
  txt2: "#94A3B8",
  txt3: "#64748B",
};

// ─── Helpers ─────────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function formatCount(n) {
  return n.toLocaleString();
}

// ─── SVG Icons ───────────────────────────────────────────────
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
    <div
      style={{ backgroundColor: C.raised, borderColor: C.border }}
      className="rounded-lg border p-5 mb-8"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span style={{ color: C.accent }}><TrendIcon /></span>
        <h2 style={{ color: C.txt1 }} className="text-sm font-semibold tracking-tight">
          많이 검색된 키워드
        </h2>
        <span
          style={{ color: C.txt3, backgroundColor: C.overlay, borderColor: C.borderSoft }}
          className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full border"
        >
          TOP 10
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5">
        {popularKeywords.map((item, idx) => (
          <button
            key={item.keyword}
            onClick={() => onKeywordClick(item.keyword)}
            className="flex items-center gap-3 py-2.5 px-3 rounded-md transition-colors group text-left"
            style={{ "--hover-bg": C.hovBg }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.hovBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <span
              className="rank-badge"
              style={{
                backgroundColor: idx < 3 ? C.accentMuted : C.overlay,
                color: idx < 3 ? C.accent : C.txt3,
              }}
            >
              {idx + 1}
            </span>
            <span style={{ color: C.txt1 }} className="text-[13px] font-medium truncate">
              {item.keyword}
            </span>
            <span style={{ color: C.txt3 }} className="ml-auto text-[11px] tabular-nums font-medium">
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
  for (let i = start; i <= end; i++) pages.push(i);

  const btnStyle = (active) => ({
    height: 32,
    padding: "0 12px",
    fontSize: 13,
    borderRadius: 6,
    border: `1px solid ${active ? C.accent : C.border}`,
    backgroundColor: active ? C.accent : "transparent",
    color: active ? "#fff" : C.txt2,
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.15s",
  });

  const NavBtn = ({ disabled, onClick, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...btnStyle(false),
        opacity: disabled ? 0.25 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = C.hovBg;
          e.currentTarget.style.color = C.txt1;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = C.txt2;
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <NavBtn disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        &lsaquo; 이전
      </NavBtn>

      {start > 1 && (
        <>
          <button style={btnStyle(false)} onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span style={{ color: C.txt3, padding: "0 4px", fontSize: 12 }}>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          style={{ ...btnStyle(page === currentPage), width: 32, padding: 0 }}
          onClick={() => onPageChange(page)}
          onMouseEnter={(e) => {
            if (page !== currentPage) {
              e.currentTarget.style.backgroundColor = C.hovBg;
              e.currentTarget.style.color = C.txt1;
            }
          }}
          onMouseLeave={(e) => {
            if (page !== currentPage) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = C.txt2;
            }
          }}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span style={{ color: C.txt3, padding: "0 4px", fontSize: 12 }}>...</span>}
          <button style={btnStyle(false)} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <NavBtn disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        다음 &rsaquo;
      </NavBtn>
    </div>
  );
}

// ─── Modal Component ─────────────────────────────────────────
function DetailModal({ person, onClose }) {
  if (!person) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4 backdrop-enter"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto modal-enter"
        style={{
          backgroundColor: C.raised,
          border: `1px solid ${C.border}`,
          boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ borderBottom: `1px solid ${C.borderSoft}` }} className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 style={{ color: C.txt1 }} className="text-lg font-bold">
                故 {person.name}
              </h2>
              <div className="flex items-center gap-3 mt-1.5">
                <span style={{ color: C.txt2 }} className="text-[13px]">향년 {person.age}세</span>
                <span style={{ backgroundColor: C.txt3 }} className="w-1 h-1 rounded-full" />
                <span style={{ color: C.txt3 }} className="text-[13px]">{formatDate(person.date)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ color: C.txt3 }}
              className="p-1 rounded-md transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = C.hovBg;
                e.currentTarget.style.color = C.txt1;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = C.txt3;
              }}
              aria-label="닫기"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <p
            style={{ color: C.txt2, borderColor: "rgba(94,92,230,0.4)" }}
            className="text-[14px] leading-relaxed border-l-2 pl-4"
          >
            {person.message}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <InfoItem label="학교" value={person.school} />
            <InfoItem label="직장" value={person.company} />
            <InfoItem label="거주지" value={person.region} />
            <InfoItem label="부고일" value={formatDate(person.date)} />
          </div>

          <div
            style={{ backgroundColor: C.overlay, border: `1px solid ${C.borderSoft}` }}
            className="rounded-lg p-4 space-y-3"
          >
            <h3 style={{ color: C.txt1 }} className="text-[13px] font-semibold">
              장례식장 정보
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span style={{ color: C.txt3 }} className="text-[12px] min-w-[40px]">장소</span>
                <span style={{ color: C.txt2 }} className="text-[13px]">{person.funeral}</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: C.txt3 }} className="text-[12px] min-w-[40px]">연락처</span>
                <span style={{ color: C.accent }} className="text-[13px] font-medium">{person.contact}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            style={{
              backgroundColor: C.overlay,
              color: C.txt2,
              border: `1px solid ${C.borderSoft}`,
            }}
            className="w-full py-2.5 rounded-lg text-[13px] font-medium transition-all"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = C.hovBg;
              e.currentTarget.style.color = C.txt1;
              e.currentTarget.style.borderColor = C.border;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = C.overlay;
              e.currentTarget.style.color = C.txt2;
              e.currentTarget.style.borderColor = C.borderSoft;
            }}
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
    <div
      style={{ backgroundColor: C.overlay, border: `1px solid ${C.borderSoft}` }}
      className="rounded-lg p-3"
    >
      <p style={{ color: C.txt3 }} className="text-[11px] mb-0.5">{label}</p>
      <p style={{ color: C.txt1 }} className="text-[13px] font-medium">{value}</p>
    </div>
  );
}

// ─── Card Component ──────────────────────────────────────────
function ObituaryCard({ person, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card-float w-full text-left rounded-lg p-5 group"
      style={{
        backgroundColor: C.raised,
        border: `1px solid ${C.border}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = C.hovBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = C.raised;
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 style={{ color: C.txt1 }} className="text-[15px] font-semibold transition-colors">
            故 {person.name}
          </h3>
          <p style={{ color: C.txt3 }} className="text-[12px] mt-1">
            {formatDate(person.date)}
          </p>
        </div>
        <span
          style={{ backgroundColor: C.accentMuted, color: C.accent }}
          className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
        >
          향년 {person.age}세
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 text-[12px]">
        {[person.school, person.company, person.region].map((tag) => (
          <span
            key={tag}
            style={{
              backgroundColor: C.overlay,
              color: C.txt2,
              border: `1px solid ${C.borderSoft}`,
            }}
            className="px-2.5 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <p style={{ color: C.txt3 }} className="text-[13px] mt-3 line-clamp-2 leading-relaxed">
        {person.message}
      </p>

      <div
        style={{ color: C.accent }}
        className="flex items-center gap-1 mt-3 text-[12px] font-medium transition-colors"
      >
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
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }} className="font-sans">
      {/* ── Fixed Header ──────────────────────────────── */}
      <header
        style={{
          backgroundColor: "rgba(12,12,12,0.8)",
          borderBottom: `1px solid ${C.borderSoft}`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Last Link"
            className="w-7 h-7 rounded-md"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <h1 style={{ color: C.txt1 }} className="text-[15px] font-bold tracking-tight">
            Last<span style={{ color: C.accent }} className="ml-0.5">Link</span>
          </h1>
        </div>
      </header>

      {/* ── Hero + Search ─────────────────────────────── */}
      <section className="pt-28 pb-10 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: C.txt1 }} className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            마지막 인사를 전하고 싶은
            <br />
            <span style={{ color: C.accent }}>인연</span>을 찾아보세요
          </h2>
          <p style={{ color: C.txt3 }} className="mt-3 text-[14px]">
            학교, 직장, 지역 등 소속 키워드로 소식이 끊긴 지인의 부고를 찾을 수 있습니다
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <span
              style={{ color: C.txt3 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="학교, 직장, 지역명 등으로 검색"
              className="search-glow w-full pl-11 pr-11 py-3.5 rounded-lg text-[14px] focus:outline-none transition-shadow"
              style={{
                backgroundColor: C.raised,
                border: `1px solid ${C.border}`,
                color: C.txt1,
              }}
            />
            {query && (
              <button
                onClick={() => handleQueryChange("")}
                style={{ color: C.txt3 }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = C.hovBg;
                  e.currentTarget.style.color = C.txt1;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = C.txt3;
                }}
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
          <p style={{ color: C.txt2 }} className="text-[13px]">
            {isSearching ? (
              <>
                <span style={{ color: C.accent }} className="font-semibold">
                  &lsquo;{query}&rsquo;
                </span>
                {" 검색 결과 "}
                <span style={{ color: C.txt1 }} className="font-semibold">
                  {filteredData.length}건
                </span>
              </>
            ) : (
              <>
                전체 부고{" "}
                <span style={{ color: C.txt1 }} className="font-semibold">
                  {filteredData.length}건
                </span>
              </>
            )}
          </p>
          {totalPages > 1 && (
            <p style={{ color: C.txt3 }} className="text-[12px]">
              {currentPage} / {totalPages} 페이지
            </p>
          )}
        </div>

        {/* 검색 결과 없음 */}
        {isSearching && filteredData.length === 0 && (
          <div className="text-center py-20">
            <div
              style={{
                backgroundColor: C.raised,
                border: `1px solid ${C.borderSoft}`,
                color: C.txt3,
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <SearchIcon />
            </div>
            <p style={{ color: C.txt2 }} className="text-[15px] font-medium">
              &lsquo;{query}&rsquo;에 대한 검색 결과가 없습니다
            </p>
            <p style={{ color: C.txt3 }} className="text-[13px] mt-1.5">
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
      <footer style={{ borderTop: `1px solid ${C.borderSoft}` }} className="text-center py-6">
        <p style={{ color: C.txt3 }} className="text-[12px]">
          &copy; 2026 Last Link &middot; 마지막 인사를 전하는 곳
        </p>
      </footer>

      {/* ── Modal ──────────────────────────────────────── */}
      <DetailModal person={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
