import React, { useState } from 'react';
import { X, PlusCircle, AlertCircle } from 'lucide-react';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: {
    category: '식품위생학' | '영양학';
    question: string;
    answer: string;
    tip: string;
  }) => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onAddCard,
}) => {
  const [category, setCategory] = useState<'식품위생학' | '영양학'>('식품위생학');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tip, setTip] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError('질문(문제)을 입력해주세요.');
      return;
    }
    if (!answer.trim()) {
      setError('정답을 입력해주세요.');
      return;
    }

    onAddCard({
      category,
      question: question.trim(),
      answer: answer.trim(),
      tip: tip.trim(),
    });

    // 폼 초기화 및 닫기
    setQuestion('');
    setAnswer('');
    setTip('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base md:text-lg font-bold text-slate-800">
              나만의 플래시카드 추가
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 폼 본문 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 과목 선택 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              과목 선택 <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCategory('식품위생학')}
                className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold border transition-all ${
                  category === '식품위생학'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                식품위생학
              </button>
              <button
                type="button"
                onClick={() => setCategory('영양학')}
                className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold border transition-all ${
                  category === '영양학'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                영양학
              </button>
            </div>
          </div>

          {/* 질문 입력 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              질문 (핵심 키워드 또는 문제) <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (error) setError('');
              }}
              rows={3}
              placeholder="예: 어패류 생식 시 발생하며 호염성 특징을 가진 식중독균은?"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 placeholder:text-slate-400"
            />
          </div>

          {/* 정답 입력 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              정답 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (error) setError('');
              }}
              placeholder="예: 장염비브리오균 (Vibrio parahaemolyticus)"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 placeholder:text-slate-400"
            />
          </div>

          {/* 암기 팁 입력 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              핵심 해설 및 암기 팁 <span className="text-slate-400 font-normal">(선택)</span>
            </label>
            <textarea
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              rows={2}
              placeholder="예: 담수 세척에 약하므로 수돗물 세척 필수! 60℃ 15분 가열 사멸"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 placeholder:text-slate-400"
            />
          </div>

          {/* 모달 하단 버튼 */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs md:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs md:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-md shadow-emerald-600/30 transition-all"
            >
              카드 저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
