
import React, { useState, useEffect, useRef } from 'react';
import { PROFILE } from './constants.ts';
import { Experience } from './types.ts';
import { askGemini } from './geminiService.ts';

// --- Components ---

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 glass-card px-6 py-4 flex justify-between items-center shadow-sm">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white">
        <i className="fas fa-leaf"></i>
      </div>
      <span className="font-bold text-xl tracking-tight">{PROFILE.name}</span>
    </div>
    <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
      <a href="#about" className="hover:text-emerald-600 transition-colors">소개</a>
      <a href="#experience" className="hover:text-emerald-600 transition-colors">경력</a>
      <a href="#research" className="hover:text-emerald-600 transition-colors">연구실적</a>
      <a href="#certifications" className="hover:text-emerald-600 transition-colors">자격사항</a>
    </div>
    <a href={`mailto:${PROFILE.contact.email}`} className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200">
      Contact Me
    </a>
  </nav>
);

const Hero: React.FC = () => (
  <header id="about" className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto overflow-hidden">
    <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 left-0 -z-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
    
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold uppercase tracking-wider">
          Senior Welfare & Well-Aging Expert
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          더 나은 노년을 위한<br />
          <span className="text-gradient">웰에이징 파트너</span>, {PROFILE.name}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          성균관대학교에서 사회복지학을 연구하며, 한국웰에이징연구소 대표로서 고령사회의 새로운 패러다임을 제시합니다. 
          시니어 디지털 콘텐츠 개발과 노인 권익 보호를 위해 끊임없이 도전합니다.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <div className="flex items-center space-x-2 text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
            <i className="fas fa-envelope text-emerald-500"></i>
            <span>{PROFILE.contact.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
            <i className="fas fa-phone text-emerald-500"></i>
            <span>{PROFILE.contact.phone}</span>
          </div>
        </div>
      </div>
      <div className="relative group">
        <div className="w-64 h-80 md:w-80 md:h-[450px] bg-slate-200 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
           <img 
            src="https://picsum.photos/seed/jee/800/1000" 
            alt={PROFILE.name} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-[200px]">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Current</p>
          <p className="text-sm font-bold text-slate-800">성균관대학교 사회복지학 박사 과정</p>
        </div>
      </div>
    </div>
  </header>
);

const SectionTitle: React.FC<{ title: string; subtitle?: string; id?: string }> = ({ title, subtitle, id }) => (
  <div id={id} className="mb-12">
    <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
      <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
      {title}
    </h2>
    {subtitle && <p className="text-slate-500 mt-2 ml-11">{subtitle}</p>}
  </div>
);

const ExperienceCard: React.FC<{ exp: Experience, onClick: () => void }> = ({ exp, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col h-full group cursor-pointer relative"
  >
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
        {exp.category === 'Research/Education' ? '연구 및 교육' : '기관 운영 및 사업'}
      </span>
      <span className="text-xs text-slate-400 font-medium">{exp.period}</span>
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">{exp.organization}</h3>
    <p className="text-slate-500 font-semibold mb-3">{exp.role}</p>
    {exp.description && (
      <p className="text-sm text-slate-600 mt-auto pt-4 border-t border-slate-50 italic">
        – {exp.description}
      </p>
    )}
    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600">
      <i className="fas fa-plus-circle"></i>
    </div>
  </div>
);

const Modal: React.FC<{ item: Experience | null, onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
      <div 
        className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 transition-all z-10"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-6">
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
              {item.category === 'Research/Education' ? 'Education & Research' : 'Business & Operation'}
            </span>
            <p className="text-slate-400 text-sm mt-3 font-medium">{item.period}</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
            {item.organization}
          </h2>
          <p className="text-xl font-bold text-emerald-600 mb-8">{item.role}</p>

          <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Project Details</h4>
            <p className="text-slate-700 leading-relaxed text-lg font-medium">
              {item.longDescription || item.description || "상세 정보가 등록되지 않았습니다."}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await askGemini(userText);
    setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all z-50 animate-bounce"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-2xl`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-96 h-[500px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-100">
          <div className="p-4 bg-emerald-600 text-white flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <p className="text-sm font-bold">Jee Eom AI</p>
              <p className="text-[10px] opacity-80">프로필에 대해 질문해 주세요</p>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-8 px-4">
                <p className="text-sm text-slate-500">안녕하세요! 엄지 전문가의 프로필에 대해 궁금한 점을 물어보세요.</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {['경력은?', '연구 실적은?', '자격증 목록'].map(q => (
                    <button 
                      key={q} 
                      onClick={() => setInput(q)}
                      className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 animate-pulse flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
            >
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedExperience(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-32">
        <Hero />

        {/* Education & Global Activities */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionTitle title="학력 사항" subtitle="Education Background" />
            <div className="space-y-6">
              {PROFILE.education.map((edu, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-slate-100 pb-6 last:pb-0">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white"></div>
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-emerald-600 font-bold text-xs mb-1 uppercase tracking-wider">{edu.period}</p>
                    <h4 className="font-bold text-lg text-slate-800">{edu.school}</h4>
                    <p className="text-slate-600">{edu.major} | <span className="font-semibold">{edu.status}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle title="글로벌 역량 및 사회 활동" subtitle="Global Network" />
            <div className="space-y-4">
              {PROFILE.globalActivities.map((activity, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-globe-americas"></i>
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Grid */}
        <section>
          <SectionTitle id="experience" title="핵심 경력" subtitle="Key Professional Milestones (카드를 클릭하여 상세 내용을 확인하세요)" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFILE.experience.map((exp, idx) => (
              <ExperienceCard 
                key={idx} 
                exp={exp} 
                onClick={() => setSelectedExperience(exp)} 
              />
            ))}
          </div>
        </section>

        {/* Research & Publications */}
        <section id="research" className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="w-12 h-1 bg-emerald-400 rounded-full"></span>
              연구 실적
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PROFILE.publications.map((pub, idx) => (
                <div key={idx} className="group flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 font-bold">
                    {pub.date.split('.')[1]}월
                  </div>
                  <div>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{pub.journal}</span>
                    <h3 className="text-lg font-bold mt-1 group-hover:text-emerald-300 transition-colors">{pub.title}</h3>
                    <div className="flex gap-4 mt-3 text-sm text-slate-400 font-medium">
                      <span><i className="fas fa-user-edit mr-2"></i>{pub.author}</span>
                      <span><i className="far fa-calendar-alt mr-2"></i>{pub.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section id="certifications">
          <SectionTitle title="보유 자격" subtitle="Professional Certifications" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {PROFILE.certifications.map((cert, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm text-center group hover:border-emerald-500/30 transition-all">
                <div className="w-12 h-12 mx-auto bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                  <i className="fas fa-certificate text-xl"></i>
                </div>
                <h4 className="font-bold text-slate-800 leading-tight mb-2">{cert.name}</h4>
                <p className="text-xs text-slate-500">{cert.issuer}</p>
                <div className="mt-4 pt-4 border-t border-slate-50 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lectures */}
        <section className="bg-emerald-50 rounded-[2rem] p-12">
          <SectionTitle title="주요 강연처" subtitle="Guest Lectures & Speaking Engagements" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-emerald-800 font-bold flex items-center gap-2">
                <i className="fas fa-university"></i> 공공 및 학술 기관
              </h4>
              <ul className="flex flex-wrap gap-2">
                {PROFILE.lectures.public.map((item, idx) => (
                  <li key={idx} className="bg-white px-3 py-1.5 rounded-lg text-sm text-emerald-700 border border-emerald-100 shadow-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-emerald-800 font-bold flex items-center gap-2">
                <i className="fas fa-hospital-user"></i> 복지 시설 및 기관
              </h4>
              <ul className="flex flex-wrap gap-2">
                {PROFILE.lectures.welfare.map((item, idx) => (
                  <li key={idx} className="bg-white px-3 py-1.5 rounded-lg text-sm text-emerald-700 border border-emerald-100 shadow-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <i className="fas fa-leaf text-xs"></i>
              </div>
              <span className="font-bold text-lg tracking-tight">{PROFILE.name}</span>
            </div>
            <p className="text-sm">© 2024 Jee Eom. All rights reserved.</p>
          </div>
          <div className="flex flex-col md:items-end gap-2 text-sm">
            <p><i className="fas fa-envelope mr-2"></i>{PROFILE.contact.email}</p>
            <p><i className="fas fa-map-marker-alt mr-2"></i>{PROFILE.contact.address}</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin text-xl"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook text-xl"></i></a>
            </div>
          </div>
        </div>
      </footer>

      <ChatBot />
      <Modal 
        item={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
    </div>
  );
}
