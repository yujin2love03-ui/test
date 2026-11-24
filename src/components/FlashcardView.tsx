import React, { useState } from 'react';
import { Flashcard } from '../types/flashcard';
import {
  ChevronLeft,
  ChevronRight,
  Rotate3D,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Trash2,
  Sparkles,
  Inbox,
  ShieldCheck,
  Award
} from 'lucide-react';

interface FlashcardViewProps {
  cards: Flashcard[];
  currentIndex: number;
  isFlipped: boolean;
  onFlip: () => void;
  onPrev: () => void;
  onNext: () => void;
  onMarkMemorized: (id: string) => void;
  onMarkWrong: (id: string) => void;
  onDeleteCard: (id: string) => void;
  filterTabName: string;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  cards,
  currentIndex,
  isFlipped,
  onFlip,
  onPrev,
  onNext,
  onMarkMemorized,
  onMarkWrong,
  onDeleteCard,
  filterTabName,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // 카드가 없을 때 빈 상태(Empty State) 렌더링
  if (cards.length === 0) {
    const isWrongFilter = filterTabName === '오답 집중 복습';
    return (
      <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 md:p-14 text-center my-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          {isWrongFilter ? (
            <Award className="w-8 h-8 text-emerald-500 animate-bounce" />
          ) : (
            <Inbox className="w-8 h-8" />
          )}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
          {isWrongFilter
            ? '🎉 오답 카드가 전혀 없습니다!'
            : `현재 [${filterTabName}]에 표시할 카드가 없습니다.`}
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          {isWrongFilter
            ? '등록된 모든 문제를 완벽하게 암기하셨거나 아직 오답으로 체크한 카드가 없습니다. 다른 카테고리를 학습해보세요!'
            : '우측 상단의 "새 카드 추가" 버튼을 눌러 나만의 핵심 암기 노트를 만들어보세요.'}
        </p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  // 카테고리별 테마 스타일 설정
  const isHygiene = currentCard.category === '식품위생학';
  const categoryBadgeClass = isHygiene
    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
    : 'ind-badge bg-indigo-100 text-indigo-800 border-indigo-200';

  // 상태 배지 텍스트 및 컬러
  const getStatusBadge = () => {
    switch (currentCard.status) {
      case 'memorized':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
            <CheckCircle2 className="w-3.5 h-3.5" />
            완벽 암기됨
          </span>
        );
      case 'wrong':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500 text-white">
            <AlertCircle className="w-3.5 h-3.5" />
            오답 복습 필요
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-600">
            미학습
          </span>
        );
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (deleteConfirmId === id) {
      onDeleteCard(id);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3500); // 3.5초 후 자동 취소
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* 상단 컨트롤 바 (순번 & 개별 삭제 버튼) */}
      <div className="flex items-center justify-between w-full px-2 mb-3 text-xs md:text-sm text-slate-500">
        <div className="flex items-center gap-2 font-medium">
          <span className="text-slate-800 font-bold text-base md:text-lg">
            {currentIndex + 1}
          </span>
          <span className="text-slate-400">/</span>
          <span>{cards.length}</span>
          <span className="text-xs bg-slate-200/80 px-2 py-0.5 rounded-full text-slate-600 ml-1">
            {filterTabName}
          </span>
        </div>

        {/* 삭제 버튼 */}
        <button
          onClick={(e) => handleDeleteClick(e, currentCard.id)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            deleteConfirmId === currentCard.id
              ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse'
              : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
          }`}
          title="이 카드 삭제"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{deleteConfirmId === currentCard.id ? '정말 삭제할까요?' : '삭제'}</span>
        </button>
      </div>

      {/* 3D 카드 플립 컨테이너 */}
      <div
        className="w-full h-[380px] md:h-[420px] perspective-1000 cursor-pointer select-none"
        onClick={onFlip}
      >
        <div
          className={`relative w-full h-full duration-500 transform-style-3d transition-transform ease-out ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ===================== [카드 앞면: 질문] ===================== */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl p-7 md:p-9 shadow-lg shadow-slate-200/70 border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:border-emerald-200/50 transition-all">
            {/* 앞면 상단 메타 정보 */}
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${categoryBadgeClass}`}
              >
                {currentCard.category}
              </span>
              <div>{getStatusBadge()}</div>
            </div>

            {/* 앞면 본문 (질문) */}
            <div className="my-auto text-center px-2">
              <p className="text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                핵심 개념 퀴즈
              </p>
              <h2 className="text-lg md:text-2xl font-bold text-slate-800 leading-relaxed md:leading-relaxed break-keep">
                {currentCard.question}
              </h2>
            </div>

            {/* 앞면 하단 클릭 유도 힌트 */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <Rotate3D className="w-4 h-4 text-slate-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>카드를 클릭하거나 Space 키를 누르면 정답이 나타납니다</span>
            </div>
          </div>

          {/* ===================== [카드 뒷면: 정답 & 해설] ===================== */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-b from-white to-slate-50/70 rounded-3xl p-7 md:p-9 shadow-lg shadow-slate-200/70 border border-emerald-100 flex flex-col justify-between">
            {/* 뒷면 상단 메타 정보 */}
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${categoryBadgeClass}`}
              >
                {currentCard.category}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 정답 확인
              </span>
            </div>

            {/* 뒷면 본문 (정답 및 핵심 암기 팁) */}
            <div className="my-auto space-y-4 px-1 overflow-y-auto max-h-[250px] pr-1">
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1">정답</p>
                <h3 className="text-lg md:text-2xl font-bold text-emerald-700 leading-snug break-keep">
                  {currentCard.answer}
                </h3>
              </div>

              {/* 암기 팁 박스 */}
              {currentCard.tip && (
                <div className="bg-amber-50/90 rounded-2xl p-4 border border-amber-200/70 text-left">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>핵심 암기 팁 & 시험 포인트</span>
                  </div>
                  <p className="text-xs md:text-sm text-amber-900/90 leading-relaxed break-keep font-medium">
                    {currentCard.tip}
                  </p>
                </div>
              )}
            </div>

            {/* 뒷면 하단 힌트 */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <Rotate3D className="w-4 h-4 text-slate-400" />
              <span>카드를 클릭하면 다시 질문으로 돌아갑니다</span>
            </div>
          </div>
        </div>
      </div>

      {/* 이전 / 다음 이동 및 학습 상태 체크 버튼 그룹 */}
      <div className="w-full mt-6 space-y-3">
        {/* 학습 상태 평가 버튼 (헷갈려요 vs 완벽 암기) */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            onClick={() => onMarkWrong(currentCard.id)}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border transition-all active:scale-95 shadow-sm ${
              currentCard.status === 'wrong'
                ? 'bg-rose-500 text-white border-rose-600 shadow-rose-500/20'
                : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>헷갈려요 (오답 추가)</span>
          </button>

          <button
            onClick={() => onMarkMemorized(currentCard.id)}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border transition-all active:scale-95 shadow-sm ${
              currentCard.status === 'memorized'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-600/30'
                : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>완벽 암기 (완료)</span>
          </button>
        </div>

        {/* 이전 / 다음 카드 네비게이션 */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전 카드</span>
          </button>

          <span className="text-xs text-slate-400 hidden sm:inline">
            좌우 화살표 키로도 넘길 수 있습니다
          </span>

          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all shadow-sm"
          >
            <span>다음 카드</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
