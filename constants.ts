
import { ProfileData } from './types';

export const PROFILE: ProfileData = {
  name: "엄지",
  nameEn: "Jee Eom",
  title: "노인복지 및 웰에이징 전문가",
  contact: {
    phone: "010-5274-1890",
    email: "jee@well-aging.or.kr",
    address: "서울특별시 강남구 영동대로 602"
  },
  education: [
    {
      school: "성균관대학교 일반대학원",
      major: "사회복지학과",
      status: "박사 재학",
      period: "2025.03 ~ 현재"
    },
    {
      school: "성균관대학교 사회복지대학원",
      major: "사회복지정책",
      status: "석사 졸업",
      period: "2020.03 ~ 2022.08"
    }
  ],
  experience: [
    {
      organization: "성균관대학교 사회복지연구소",
      role: "연구원",
      period: "2025.12 ~ 현재",
      category: "Research/Education",
      longDescription: "성균관대학교 사회복지연구소에서 고령사회의 사회적 이슈와 복지 정책을 연구하고 있습니다. 특히 디지털 소외 계층인 시니어를 위한 기술적 보완과 사회복지사의 역할 정립에 관한 심도 깊은 학술 활동을 수행 중입니다."
    },
    {
      organization: "한국보건복지인재원",
      role: "강사",
      period: "2024.06 ~ 현재",
      description: "사회복무요원 대상 노인이해 및 인권 교육",
      category: "Research/Education",
      longDescription: "미래 세대인 사회복무요원들에게 노인 생애 주기에 대한 이해를 돕고, 인권 존중의 가치를 교육하고 있습니다. 노인 학대 예방 및 세대 간 소통을 위한 교육 커리큘럼을 직접 개발하여 운영합니다."
    },
    {
      organization: "강남직업전문학교 (한국IT직업전문학교)",
      role: "교수",
      period: "2022.08 ~ 2024.12",
      description: "사회복지학개론 강의",
      category: "Research/Education",
      longDescription: "사회복지사를 꿈꾸는 학생들에게 사회복지학의 기초 이론과 실천 현장의 사례를 교육하였습니다. 이론과 실제가 조화된 강의로 학생들의 높은 만족도를 이끌어냈습니다."
    },
    {
      organization: "한국웰에이징연구소 / 한국웰에이징협회",
      role: "대표",
      period: "2022.06 ~ 현재",
      description: "운영 총괄 및 교육 교구 개발",
      category: "Operation/Projects",
      longDescription: "대한민국의 건강한 노년 문화를 선도하기 위해 웰에이징 교육 전문 교구를 개발하고, 관련 전문가를 양성하는 교육 프로그램을 총괄하고 있습니다. 인지 놀이 도구 등 시니어 맞춤형 콘텐츠 기획이 핵심 사업입니다."
    },
    {
      organization: "서울시동부노인보호전문기관",
      role: "전문인력",
      period: "2024.02 ~ 2025.12",
      description: "노인 재학대 예방 사업",
      category: "Operation/Projects",
      longDescription: "노인 학대 피해 어르신들을 위한 사례 관리와 재학대 방지를 위한 사후 모니터링을 담당하였습니다. 지역사회 자원 연계를 통해 노인 권익 증진에 기여하고 있습니다."
    },
    {
      organization: "㈜더블루아워",
      role: "본부장",
      period: "2022.04 ~ 2025.07",
      description: "시니어 디지털 콘텐츠 및 앱 개발 참여",
      category: "Operation/Projects",
      longDescription: "시니어를 위한 디지털 헬스케어 및 인지 강화 애플리케이션 개발 프로젝트에 참여하였습니다. UX/UI 설계 시 시니어의 신체적, 인지적 특성을 반영하는 가이드라인을 제시하였습니다."
    },
    {
      organization: "정릉실버복지센터 / 조은노인요양센터",
      role: "사회복지사 및 사무국장",
      period: "2019.04 ~ 2022.03",
      category: "Operation/Projects",
      longDescription: "현장 밀착형 사회복지 실천가로서 요양 시설의 운영 관리와 어르신 케어 서비스를 총괄하였습니다. 사회복지 현장의 실질적인 고충과 요구를 파악하는 중요한 커리어 경험입니다."
    }
  ],
  publications: [
    {
      title: "조직문화가 사회복지사의 사회적기업가정신에 미치는 영향",
      author: "제1저자",
      journal: "한국사회복지학",
      date: "2025.11"
    },
    {
      title: "노인의 웰에이징 교육 프로그램 효과성 연구",
      author: "제1저자",
      journal: "사회복지연구",
      date: "2024.04"
    },
    {
      title: "국내외 청년 대상 인터뷰 및 정책분석 연구보고서",
      author: "공동/조사",
      journal: "국무조정실",
      date: "2020.12"
    }
  ],
  certifications: [
    { name: "사회복지사 1급", issuer: "보건복지부", date: "2019.03" },
    { name: "웰에이징 교육전문가 1급", issuer: "한국웰에이징협회", date: "2022.09" },
    { name: "간호조무사", issuer: "보건복지부", date: "2019.10" },
    { name: "유치원 정교사 2급", issuer: "교육부", date: "2014.02" },
    { name: "웰에이징 인지놀이지도사 1급", issuer: "문화체육관광부", date: "2022.12" }
  ],
  globalActivities: [
    "호주 멜버른: 사회복지기관(ROSS HOUSE) 미팅 및 정책 교류 (2016, 2025)",
    "스웨덴 스톡홀름: 노인재가복지기업 ADEO CARE CEO 미팅 및 거주 (2018.12 ~ 2019.12)"
  ],
  lectures: {
    public: ["성균관대", "가톨릭대", "제주도공공정책연수원", "전북교육청 등"],
    welfare: ["성북구립노인종합복지관", "시립신목종합사회복지관 등 다수"]
  }
};
