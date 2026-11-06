/**
 * 채수훈 (CHAE SOOHOON) 포트폴리오 데이터
 * 
 * 💡 데이터 수정 가이드:
 * 이 파일의 projects 배열에 새 프로젝트를 추가하거나 기존 프로젝트의 텍스트, 이미지 경로, 도구 목록을 수정할 수 있습니다.
 * 실제 상업/납품 프로젝트로 확정되기 전의 시안은 `clientType: "Concept / Personal Project"` 및 `status: "draft"`로 유지합니다.
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'branding' | 'graphic' | 'ai' | 'editorial' | 'education';
  categoryLabel: string;
  year: string;
  clientType: 'Concept / Personal Project' | 'Educational Output' | 'Commercial Client' | 'Institutional Client';
  status: 'draft' | 'verified';
  role: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  tools: string[];
  keyDeliverables: string[];
  heroImage: string;
  accentColor?: string;
  workflowSteps?: {
    step: string;
    description: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    slug: 'monster-convenience',
    title: '괴물편의점',
    subtitle: '골목 모퉁이에 나타난 괴물들의 24시 편의점 브랜드 아이덴티티',
    category: 'branding',
    categoryLabel: 'Branding & Character',
    year: '2024',
    clientType: 'Concept / Personal Project',
    status: 'draft',
    role: '브랜드 네이밍, 로고 디자인, 캐릭터 시스템 설계, 패키지 및 굿즈 가이드',
    summary: '일상적인 편의점 공간에 위트 있는 몬스터 캐릭터 세계관을 접목하여 친근하면서도 개성 넘치는 리테일 브랜드 경험을 제안한 프로젝트입니다.',
    problem: '천편일률적인 편의점·소품샵 브랜딩 시장에서 젊은 타깃층의 호기심을 유발하고 굿즈 및 식음료 패키지로 무한 확장 가능한 독창적 비주얼 모티프가 필요했습니다.',
    solution: '익살스럽고 사랑스러운 몬스터 캐릭터를 심볼릭하게 설계하고, 크라프트 패키지와 모던 볼드 타이포그래피를 결합하여 일상 속 위트와 완성도를 동시에 확보했습니다.',
    result: '메인 캐릭터 3종, 쇼핑백·테이크아웃 컵·스티커·스낵 패키지 등 총 12종의 리테일 비주얼 시스템을 구축하고 향후 숏폼 애니메이션으로 확장 가능한 기반을 마련했습니다.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Midjourney', 'Figma'],
    keyDeliverables: ['브랜드 로고마크 및 워드마크', '캐릭터 턴어라운드 가이드', '리테일 패키지 5종 목업', '굿즈 및 문구류 그래픽 시스템'],
    heroImage: '/src/assets/images/project_monster_convenience_1793930284296.jpg',
    accentColor: '#345BEB'
  },
  {
    id: 'project-2',
    slug: 'time-selling-shop',
    title: '《시간을 파는 가게》',
    subtitle: '페이퍼 아트 질감과 생성형 비주얼로 구현한 서정적 동화책 아트워크',
    category: 'editorial',
    categoryLabel: 'Editorial & AI Visual',
    year: '2024',
    clientType: 'Concept / Personal Project',
    status: 'draft',
    role: '컨셉 기획, 페이퍼 콜라주 비주얼 디렉팅, AI 프롬프트 엔지니어링, 편집 레이아웃',
    summary: '모래시계와 밤하늘의 몽환적 서사를 종이 공예(Paper Collage) 질감으로 해석하여, 아날로그 감성과 생성형 AI의 정교한 층위(Layer)를 결합한 출판 기획물입니다.',
    problem: '기존 디지털 일러스트의 매끄러운 단조로움을 극복하고, 종이의 실제 두께감과 빛에 의한 그림자 깊이를 화면 위에 사실적이면서도 환상적으로 구현해야 했습니다.',
    solution: '종이 조각의 절단면과 그림자 조도를 수식화한 프롬프트 파이프라인을 구축하고, 인디자인 편집 그리드에 맞춰 표지와 내지의 시각적 호흡과 여백 리듬을 정밀하게 조율했습니다.',
    result: '총 24페이지 분량의 동화 아트워크 컨셉북 구성 및 페이퍼 컷 스타일 북커버·내지 스프레드 8종 완성. 시각적 밀도와 문학적 여운을 동시에 전달했습니다.',
    tools: ['Midjourney v6', 'Adobe InDesign', 'Adobe Photoshop', 'Lightroom'],
    keyDeliverables: ['하드커버 북커버 디자인', '본문 스프레드 8세트', '페이퍼 컷 텍스처 스타일가이드', '전시용 대형 아트 프린트'],
    heroImage: '/src/assets/images/project_time_shop_1793930285069.jpg',
    accentColor: '#2B4CBA'
  },
  {
    id: 'project-3',
    slug: 'tired-panda-daily',
    title: '피곤한 판다의 하루',
    subtitle: '캐릭터 일관성과 3D 렌더링 룩을 유지하는 AI 숏폼 영상 파이프라인',
    category: 'ai',
    categoryLabel: 'AI & Motion',
    year: '2024',
    clientType: 'Concept / Personal Project',
    status: 'draft',
    role: '시나리오 작성, 캐릭터 시드 고정 및 이미지 생성, 영상 모션 제어, 사운드 믹싱, 프리미어 컷편집',
    summary: '현대 직장인의 피로를 유쾌하게 풍자한 3D 애니메이션 스타일의 숏폼 콘텐츠로, 기획부터 AI 영상 변환 및 최종 마스터링까지 1인 제작 파이프라인을 실증했습니다.',
    problem: '생성형 비디오의 가장 큰 기술적 한계인 컷 간 캐릭터 얼굴·의상 붕괴(Flickering/Drift)를 최소화하고, 감정 전달이 가능한 일관된 표정 연출이 필요했습니다.',
    solution: '기준 캐릭터 시트와 네거티브 프롬프트를 고정하고, 이미지→비디오 변환 시 모션 브러시와 카메라 경로를 통제한 뒤 Premiere Pro에서 0.1초 단위 리듬 컷과 효과음 타이밍을 설계했습니다.',
    result: '총 45초 길이의 고화질 숏폼 영상 제작 완성. 동일 파이프라인을 수강생 교육 교안 및 워크숍 실습 템플릿으로 정립하여 교육 현장에 이식했습니다.',
    tools: ['Midjourney', 'Runway Gen-3 / Kling', 'ElevenLabs', 'Adobe Premiere Pro'],
    keyDeliverables: ['45초 숏폼 완제품 (9:16 세로형)', '캐릭터 일관성 시드 데이터시트', '스토리보드 컷리스트', '오디오 효과음 & BGM 믹스'],
    heroImage: '/src/assets/images/project_tired_panda_1793930286290.jpg',
    accentColor: '#17191C'
  },
  {
    id: 'project-4',
    slug: 'ai-shortform-curriculum',
    title: 'AI 숏폼 영상 제작 실무 교육',
    subtitle: '기획부터 생성 툴, 프리미어 최종 마스터링까지 이어지는 프로젝트 중심 커리큘럼',
    category: 'education',
    categoryLabel: 'Education & Curriculum',
    year: '2024',
    clientType: 'Educational Output',
    status: 'draft',
    role: '과정 설계, 실습 교안 집필, 생성형 AI 파이프라인 시연, 프로젝트 멘토링',
    summary: '비전공자 및 예비 크리에이터가 복잡한 AI 도구에 매몰되지 않고, 디자인 기본기와 영상 문법을 바탕으로 4주 만에 실제 포트폴리오 결과물을 완성하도록 설계한 실무 강의입니다.',
    problem: '시중에 범람하는 AI 툴 강의는 단편적인 프롬프트 입력법에 그쳐, 학생들이 완성도 높은 하나의 완결된 영상 포트폴리오를 만들어내지 못하는 한계가 있었습니다.',
    solution: '‘기획(스토리보드) → 비주얼 일관성(프롬프트) → 영상화(모션) → 프리미어(편집·음향)’의 4단계 프레임워크를 수립하고, 실전 템플릿과 오류 대처 가이드를 제공했습니다.',
    result: '과정 수강생 100% 숏폼 프로젝트 완주 및 최종 상영회 개최. 수강생 만족도 9.6/10 달성 및 우수 수료작 다수 배출.',
    tools: ['Figma (기획)', 'Midjourney / DALL-E', 'Runway / Pika', 'Premiere Pro'],
    keyDeliverables: ['4주/8주 단계별 강의 커리큘럼', '학생용 실습 가이드북 PDF', '숏폼 템플릿 프로젝트 파일', '영상 피드백 루브릭 표'],
    heroImage: '/src/assets/images/hero_editorial_workspace_1793930283847.jpg',
    accentColor: '#345BEB'
  },
  {
    id: 'project-5',
    slug: 'synthesis-festival-identity',
    title: '현대 예술 문화 축제 그래픽 시스템',
    subtitle: '도시 공간과 디지털 스크린을 아우르는 모듈형 페스티벌 아이덴티티',
    category: 'graphic',
    categoryLabel: 'Graphic & Event',
    year: '2023',
    clientType: 'Concept / Personal Project',
    status: 'draft',
    role: '포스터 디자인, 배너 시스템 설계, 타이포그래피 모듈 구축, 공간 연출 목업',
    summary: '예술과 음악, 담론이 교차하는 도심 복합 축제를 위한 시각 시스템으로, 볼드한 기하학 도형과 코발트 블루를 메인으로 대형 인쇄물과 옥외 매체에 대응했습니다.',
    problem: '가로 현수막, 세로 포스터, 가로등 배너, 모바일 티켓 등 비율이 극단적으로 다른 다양한 인쇄·디지털 매체 전반에서 일관된 시각적 임팩트를 유지해야 했습니다.',
    solution: '조합 가능한 16개의 기하학 심볼 모듈을 정의하고, 매체 비율에 따라 반응형으로 재배열되는 유연한 그리드 시스템(Flexible Grid System)을 설계했습니다.',
    result: '메인 메인 포스터 2종, 옥외 대형 배너 3종, 스크린 그래픽 템플릿 4종 완성. 인쇄 품질 감리와 안전여백 가이드를 체계화했습니다.',
    tools: ['Adobe Illustrator', 'Adobe InDesign', 'Photoshop'],
    keyDeliverables: ['메인 A1 포스터 2종', '가로형 대형 외벽 배너 디자인', '가로등 배너 및 티켓 그래픽', '공간 사이니지 시스템'],
    heroImage: '/src/assets/images/project_event_poster_1793930286583.jpg',
    accentColor: '#345BEB'
  },
  {
    id: 'project-6',
    slug: 'course-recruitment-campaign',
    title: '국비·직업과정 모집 홍보 콘텐츠',
    subtitle: '학습자 눈높이에 맞춘 직관적인 카드뉴스 및 모션 홍보 캠페인 기획',
    category: 'graphic',
    categoryLabel: 'Promotion & Content',
    year: '2023',
    clientType: 'Educational Output',
    status: 'draft',
    role: '홍보 전략 수립, 카피라이팅, 카드뉴스 디자인, 모션 그래픽 제작, 배포 성과 분석',
    summary: '직업교육 과정의 높은 진입장벽을 낮추기 위해, 복잡한 지원 자격과 혜택을 한눈에 읽히는 인포그래픽과 친근한 시각 언어로 풀어낸 종합 홍보 프로젝트입니다.',
    problem: '텍스트 위주의 지루한 모집 공고로 인해 2030 청년 구직자들의 관심 유입률이 저조하고 문의 과정에서의 이탈율이 높았습니다.',
    solution: 'Q&A 형태의 공감형 카피라이팅, 핵심 숫자(0원·취업률·수료 혜택)의 시각적 강조, 모바일 세로 비율에 최적화된 카드뉴스 및 15초 릴스 모션을 동시 기획했습니다.',
    result: '전기 대비 지원 문의율 상승 및 과정 조기 마감에 기여. 지속 재사용 가능한 분기별 템플릿 자산을 기관에 납품했습니다.',
    tools: ['Adobe Illustrator', 'After Effects', 'Photoshop', 'Notion'],
    keyDeliverables: ['SNS 홍보 카드뉴스 10장 세트', '15초 모션 프로모션 영상', '인쇄용 A3 모집 포스터', '온라인 상세페이지 배너'],
    heroImage: '/src/assets/images/hero_editorial_workspace_1793930283847.jpg',
    accentColor: '#2B4CBA'
  }
];

export const DISCIPLINES = [
  {
    number: '01',
    title: 'Branding & Graphic',
    titleKo: '브랜딩 & 시각 그래픽',
    description: '10년 이상 축적된 조형 감각과 타이포그래피 이해를 바탕으로 로고, 브랜드 아이덴티티, 패키지, 행사 인쇄물 등 흔들리지 않는 시각 언어를 구축합니다.',
    items: ['브랜드 네이밍 & 아이덴티티', '로고 마크 & 타이포그래피 가이드', '행사 포스터·현수막·사이니지', '인쇄 감리 및 제작 공정 관리']
  },
  {
    number: '02',
    title: 'AI Content & Motion',
    titleKo: '생성형 AI 영상 & 숏폼',
    description: '단순한 호기심을 넘어 캐릭터 일관성 유지, 카메라 워크 통제, Premiere Pro 정밀 편집을 엮은 실무형 엔드투엔드 AI 콘텐츠 제작 파이프라인을 운영합니다.',
    items: ['Midjourney / Flux 프롬프트 엔지니어링', 'Runway / Kling 기반 모션 제어', '보이스 생성 및 사운드 마스터링', '세로형 숏폼 및 소셜 비디오 제작']
  },
  {
    number: '03',
    title: 'Design Education',
    titleKo: '실무형 디자인·AI 교육',
    description: '성인, 청년 구직자, 고교 위탁생 대상의 디자인 및 AI 과정을 기획하고 직접 강의합니다. 툴의 기능이 아닌 ‘실제 결과물을 완성하는 과정’을 전달합니다.',
    items: ['AI 숏폼 영상 제작 실무 커리큘럼', '시각디자인 기초 및 포트폴리오 지도', '비전공자 맞춤형 워크플로 설계', '기업·기관 출강 및 프로젝트 멘토링']
  },
  {
    number: '04',
    title: 'Creative Planning',
    titleKo: '크리에이티브 기획 & 커뮤니티',
    description: '10년 가까이 보드게임 커뮤니티를 직접 운영하며 사람을 모으고 경험을 설계해 왔습니다. 규칙을 디자인하고 소통을 이끄는 기획자의 실행력을 갖추고 있습니다.',
    items: ['경험 설계 및 규칙 아키텍처', '커뮤니티 운영 및 온오프라인 이벤트', '홍보 콘텐츠 기획 및 카피라이팅', '다학제 협업 및 프로젝트 리딩']
  }
];

export const AI_WORKFLOW_STEPS = [
  {
    step: '01',
    name: '기획 & 비트 시트',
    enName: 'Concept & Storybeat',
    description: '스토리의 기승전결을 3~5개 핵심 씬(Scene)으로 분할하고, 숏폼 알고리즘에 맞는 3초 훅(Hook)과 감정선을 설계합니다.',
    tools: ['Notion', 'Figma', 'ChatGPT'],
    keyTip: '초반 1.5초 안에 호기심을 끄는 시각적 대비를 텍스트 프롬프트 이전 기획 단계에서 확정합니다.'
  },
  {
    step: '02',
    name: '캐릭터 & 비주얼 고정',
    enName: 'Seed & Consistency',
    description: '캐릭터의 턴어라운드(정면/측면/후면)와 의상, 조명 앵글을 고정하여 씬이 바뀌어도 인물·동물이 왜곡되지 않도록 제어합니다.',
    tools: ['Midjourney v6', 'Flux', 'ComfyUI'],
    keyTip: '시드 번호(Seed)와 명확한 스타일 가중치 키워드를 아카이빙하여 팀 및 수강생과 공유합니다.'
  },
  {
    step: '03',
    name: '고화질 프레임 생성',
    enName: 'Hi-Res Keyframes',
    description: '카메라 화각(35mm, 85mm), 심도(Depth of Field), 셔터스피드 텍스처를 지정하여 영화적 조형미를 갖춘 키프레임을 생성합니다.',
    tools: ['Midjourney', 'Magnific AI', 'Photoshop'],
    keyTip: '안전 여백을 충분히 확보하여 영상화 단계에서 가장자리가 잘리거나 일그러지지 않도록 대비합니다.'
  },
  {
    step: '04',
    name: '이미지 투 비디오 모션',
    enName: 'Image to Video & Motion',
    description: '정지된 키프레임에 카메라 패닝, 틸트, 줌과 피사체의 자연스러운 미세 움직임을 부여하여 살아 숨쉬는 비디오로 변환합니다.',
    tools: ['Runway Gen-3', 'Kling AI', 'Luma Dream Machine'],
    keyTip: '모션 브러시(Motion Brush)를 활용해 움직여야 할 영역(눈 깜빡임, 손동작)만 선별적으로 구동합니다.'
  },
  {
    step: '05',
    name: '보이스 & 사운드스케이프',
    enName: 'Voice & Soundscape',
    description: '캐릭터 성격에 맞는 AI 음성 더빙(Voice Cloning)을 생성하고, 공간감을 주는 앰비언트 사운드와 폴리 효과음을 배치합니다.',
    tools: ['ElevenLabs', 'Epidemic Sound', 'Adobe Audition'],
    keyTip: '목소리의 톤과 호흡 간격을 수동으로 조절하여 기계음 느낌을 제거하고 자연스러운 연기 톤을 연출합니다.'
  },
  {
    step: '06',
    name: '프리미어 컷 & 마스터링',
    enName: 'Premiere Cut & Mastering',
    description: '타임라인에서 0.1초 단위로 영상 리듬을 트리밍하고, 자막 모션, 색보정(LUT), 최종 음량 규격(LUFS)을 맞춰 납품합니다.',
    tools: ['Adobe Premiere Pro', 'After Effects'],
    keyTip: 'AI가 만든 불완전한 프레임을 사람의 편집 감각으로 정밀 재단할 때 비로소 완성도 높은 작품이 됩니다.'
  }
];

export const TIMELINE = [
  {
    period: '2014 — 현재',
    title: '시각디자인 실무 & 브랜드 기획',
    organization: '프리랜서 & 크리에이티브 스튜디오',
    role: 'Lead Visual Designer',
    description: '브랜드 아이덴티티, 편집 디자인, 로고마크, 옥외 홍보물 및 디지털 콘텐츠 기획·제작 전반을 10년 이상 수행하며 실무 노하우를 축적했습니다.'
  },
  {
    period: '2022 — 현재',
    title: '직업교육기관 강사 & 교육 기획',
    organization: '직업전문학교 및 교육원',
    role: '디자인 및 AI 과정 전임 강사',
    description: '청년 구직자, 고교 위탁생, 재직자를 대상으로 시각디자인 기초, 어도비 툴 테크닉, 생성형 AI 영상 제작 실무 커리큘럼을 직접 기획하고 강의하고 있습니다.'
  },
  {
    period: '2023 — 현재',
    title: '생성형 AI 콘텐츠 랩 & 파이프라인 연구',
    organization: 'CHAE SOOHOON Studio',
    role: 'AI Content Director',
    description: 'Midjourney, Runway, Kling 등 생성 툴을 실무에 연결하는 워크플로를 정립하고, 교육 현장에 접목하여 단기간 결과물 도출 시스템을 검증했습니다.'
  },
  {
    period: '2015 — 현재',
    title: '보드게임 커뮤니티 운영 & 경험 설계',
    organization: '지역 문화 커뮤니티',
    role: 'Community Organizer & Game Master',
    description: '10년가량 300명 이상의 회원이 활동하는 오프라인 보드게임 커뮤니티를 기획·운영하며, 복잡한 규칙을 쉽게 전달하고 사람 간 경험을 설계하는 역량을 다졌습니다.'
  }
];

export const TEACHING_PILLARS = [
  {
    number: '01',
    title: '결과물 중심의 프로젝트 학습',
    enTitle: 'Project-Driven Deliverables',
    description: '단순한 기능 설명에 그치지 않고, 수업 종료 시 수강생 본인의 이름이 걸린 완성된 숏폼 영상 또는 포트폴리오 작업물을 반드시 손에 쥐도록 설계합니다.'
  },
  {
    number: '02',
    title: '비전공자도 막힘없는 워크플로',
    enTitle: 'Frictionless Workflow',
    description: '복잡한 프롬프트 문법 대신 단계별 템플릿과 실패 대처 가이드를 제공하여, 기술적 좌절 없이 아이디어를 시각화하는 기쁨에 집중할 수 있도록 돕습니다.'
  },
  {
    number: '03',
    title: '조형 기본기와 AI 도구의 균형',
    enTitle: 'Art Direction Over Prompts',
    description: 'AI는 버튼 하나로 수많은 이미지를 쏟아내지만 무엇이 좋은 디자인인지를 결정하는 것은 사람의 안목입니다. 타이포그래피, 레이아웃, 색채 원리를 함께 훈련합니다.'
  }
];
