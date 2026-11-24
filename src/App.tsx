import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Flashcard, FilterTab, StudyStats } from './types/flashcard';
import { initialCards } from './data/initialCards';
import { ProgressBar } from './components/ProgressBar';
import { FilterTabs } from './components/FilterTabs';
import { FlashcardView } from './components/FlashcardView';
import { AddCardModal } from './components/AddCardModal';
import { Keyboard, Sparkles, Check, Info } from 'lucide-react';

const STORAGE_KEY = 'nutrition_flashcards_v1';

export const App: React.FC = () => {
  // 1. 플래시카드 목록 상태 관리 (localStorage 연동)
  const [cards, setCards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('로컬스토리지 데이터를 불러오는 중 오류가 발생했습니다:', e);
    }
    return initialCards;
  });

  // 2. 현재 선택된 탭 및 카드 인덱스 상태
  const [currentTab, setCurrentTab] = useState<FilterTab>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 토스트 메시지 표시 유틸리티
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  }, []);

  // 3. 카드 상태 변경 시 localStorage에 자동 동기화
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('로컬스토리지 저장 실패:', e);
    }
  }, [cards]);

  // 4. 현재 탭에 따른 필터링된 카드 목록 계산
  const filteredCards = useMemo(() => {
    switch (currentTab) {
      case 'hygiene':
        return cards.filter((c) => c.category === '식품위생학');
      case 'nutrition':
        return cards.filter((c) => c.category === '영양학');
      case 'wrong':
        return cards.filter((c) => c.status === 'wrong');
      case 'all':
      default:
        return cards;
    }
  }, [cards, currentTab]);

  // 필터 탭 이름 한글 매핑
  const filterTabName = useMemo(() => {
    switch (currentTab) {
      case 'hygiene':
        return '식품위생학';
      case 'nutrition':
        return '영양학';
      case 'wrong':
        return '오답 집중 복습';
      case 'all':
      default:
        return '전체 보기';
    }
  }, [currentTab]);

  // 5. 탭 변경 또는 카드 수 변경 시 인덱스 유효성 보정
  useEffect(() => {
    if (currentIndex >= filteredCards.length) {
      setCurrentIndex(Math.max(0, filteredCards.length - 1));
    }
    setIsFlipped(false);
  }, [filteredCards.length, currentTab]);

  // 6. 각 탭별 개수 및 학습 통계 계산
  const counts = useMemo(() => {
    return {
      all: cards.length,
      hygiene: cards.filter((c) => c.category === '식품위생학').length,
      nutrition: cards.filter((c) => c.category === '영양학').length,
      wrong: cards.filter((c) => c.status === 'wrong').length,
    };
  }, [cards]);

  const stats: StudyStats = useMemo(() => {
    const total = cards.length;
    const memorized = cards.filter((c) => c.status === 'memorized').length;
    const wrong = cards.filter((c) => c.status === 'wrong').length;
    const unseen = cards.filter((c) => c.status === 'unseen').length;
    const progressPercent = total === 0 ? 0 : Math.round((memorized / total) * 100);

    return { total, memorized, wrong, unseen, progressPercent };
  }, [cards]);

  // 7. 카드 플립 & 이전/다음 네비게이션
  const handleFlip = useCallback(() => {
    if (filteredCards.length > 0) {
      setIsFlipped((prev) => !prev);
    }
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  }, [filteredCards.length]);

  const handleNext = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  }, [filteredCards.length]);

  // 8. 학습 상태 변경 핸들러
  // 완벽 암기 완료 처리
  const handleMarkMemorized = useCallback((id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'memorized' } : c))
    );
    showToast('✨ 완벽 암기 완료로 등록되었습니다!');
  }, [showToast]);

  // 헷갈려요 (오답 추가) 처리
  const handleMarkWrong = useCallback((id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'wrong' } : c))
    );
    showToast('📝 [오답 집중 복습] 목록에 등록되었습니다.');
  }, [showToast]);

  // 9. 나만의 카드 추가 & 삭제
  const handleAddCard = useCallback((newCardData: {
    category: '식품위생학' | '영양학';
    question: string;
    answer: string;
    tip: string;
  }) => {
    const newCard: Flashcard = {
      id: `user-${Date.now()}`,
      category: newCardData.category,
      question: newCardData.question,
      answer: newCardData.answer,
      tip: newCardData.tip,
      status: 'unseen',
    };

    setCards((prev) => [newCard, ...prev]);
    setCurrentIndex(0);
    setIsFlipped(false);
    showToast('🎉 새 플래시카드가 성공적으로 추가되었습니다!');
  }, [showToast]);

  const handleDeleteCard = useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    showToast('🗑️ 카드가 삭제되었습니다.');
  }, [showToast]);

  // 10. 순서 섞기 (Shuffle) 기능 - Fisher-Yates 알고리즘
  const handleShuffle = useCallback(() => {
    if (cards.length <= 1) {
      showToast('⚠️ 섞을 카드가 부족합니다.');
      return;
    }
    setCards((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setCurrentIndex(0);
    setIsFlipped(false);
    showToast('🔀 카드가 무작위로 섞였습니다!');
  }, [cards.length, showToast]);

  // 11. 학습 기록 초기화
  const handleResetProgress = useCallback(() => {
    if (window.confirm('모든 카드의 학습 상태(암기/오답)를 미학습 상태로 초기화할까요?\n(사용자가 추가한 카드는 삭제되지 않습니다)')) {
      setCards((prev) => prev.map((c) => ({ ...c, status: 'unseen' })));
      setIsFlipped(false);
      showToast('🔄 모든 학습 기록이 초기화되었습니다.');
    }
  }, [showToast]);

  // 12. 초기 샘플 데이터 복원
  const handleRestoreDefaults = useCallback(() => {
    if (window.confirm('초기 식품위생학/영양학 10개 샘플 데이터로 복원할까요?\n(직접 추가한 카드는 사라집니다)')) {
      setCards(initialCards);
      setCurrentIndex(0);
      setIsFlipped(false);
      showToast('📦 초기 10개 시드 데이터로 복원되었습니다.');
    }
  }, [showToast]);

  // 13. 키보드 단축키 지원 (Space, 화살표 좌우, 1, 2)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 모달이 열려있거나 포커스가 입력 필드일 때는 단축키 비활성화
      if (isAddModalOpen) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === '1' && filteredCards[currentIndex]) {
        e.preventDefault();
        handleMarkWrong(filteredCards[currentIndex].id);
      } else if (e.key === '2' && filteredCards[currentIndex]) {
        e.preventDefault();
        handleMarkMemorized(filteredCards[currentIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isAddModalOpen,
    handleFlip,
    handlePrev,
    handleNext,
    handleMarkWrong,
    handleMarkMemorized,
    filteredCards,
    currentIndex,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* 토스트 알림 메시지 */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs md:text-sm font-medium px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 border border-slate-700/50 transition-all animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 메인 콘텐츠 영역 */}
      <div className="max-w-3xl mx-auto w-full">
        {/* 상단 프로그레스 바 대시보드 */}
        <ProgressBar
          stats={stats}
          onShuffle={handleShuffle}
          onResetProgress={handleResetProgress}
          onRestoreDefaults={handleRestoreDefaults}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* 카테고리 필터 탭 */}
        <FilterTabs
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          counts={counts}
        />

        {/* 3D 플래시카드 퀴즈 뷰 */}
        <FlashcardView
          cards={filteredCards}
          currentIndex={currentIndex}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onPrev={handlePrev}
          onNext={handleNext}
          onMarkMemorized={handleMarkMemorized}
          onMarkWrong={handleMarkWrong}
          onDeleteCard={handleDeleteCard}
          filterTabName={filterTabName}
        />
      </div>

      {/* 새 카드 추가 모달 */}
      <AddCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCard={handleAddCard}
      />

      {/* 하단 키보드 단축키 안내 툴팁 바 */}
      <footer className="mt-8 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 py-2 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-500 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <Keyboard className="w-3.5 h-3.5 text-emerald-600" />
            <span>단축키 가이드:</span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-700">Space</kbd>
            카드 뒤집기
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-700">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-700">→</kbd>
            이전/다음 카드
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-700">1</kbd>
            헷갈려요
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-700">2</kbd>
            완벽 암기
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          데이터는 브라우저 내부(localStorage)에 안전하게 저장되므로 새로고침해도 학습 내용이 유지됩니다.
        </p>
      </footer>
    </div>
  );
};

export default App;
