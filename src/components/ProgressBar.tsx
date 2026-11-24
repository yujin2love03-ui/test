import React from 'react';
import { StudyStats } from '../types/flashcard';
import { Shuffle, RotateCcw, Database, Plus, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface ProgressBarProps {
  stats: StudyStats;
  onShuffle: () => void;
  onResetProgress: () => void;
  onRestoreDefaults: () => void;
  onOpenAddModal: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  stats,
  onShuffle,
  onResetProgress,
  onRestoreDefaults,
  onOpenAddModal,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 md:p-6 mb-6 transition-all duration-300">
      {/* 헤더 & 대시보드 액션 버튼 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🥗</span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              식품영양학 암기 마스터
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            식품위생학 · 영양학 국가고시 및 전공 시험 대비 3D 플래시카드
          </p>
        </div>

        {/* 유틸리티 액션 버튼 그룹 */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onShuffle}
            title="카드 순서 무작위 섞기"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>순서 섞기</span>
          </button>

          <button
            onClick={onResetProgress}
            title="모든 카드의 학습 상태를 미학습으로 초기화"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 active:scale-95 rounded-lg border border-amber-200/60 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>학습 기록 초기화</span>
          </button>

          <button
            onClick={onRestoreDefaults}
            title="기본 샘플 10개 문제로 전체 복원"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 active:scale-95 rounded-lg border border-slate-200 transition-all"
          >
            <Database className="w-3.5 h-3.5" />
            <span>샘플 복원</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-lg shadow-sm shadow-emerald-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>새 카드 추가</span>
          </button>
        </div>
      </div>

      {/* 학습 진행률 프로그레스 바 영역 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs md:text-sm font-medium">
          <span className="text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            전체 암기 달성률
          </span>
          <span className="text-emerald-600 font-bold text-base md:text-lg">
            {stats.progressPercent}%
            <span className="text-xs text-slate-400 font-normal ml-1">
              ({stats.memorized}/{stats.total}개)
            </span>
          </span>
        </div>

        {/* 진행률 바 배경 & 게이지 */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${stats.progressPercent}%` }}
          />
        </div>
      </div>

      {/* 실시간 학습 상태 요약 칩 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
          <span className="text-slate-500">전체 카드</span>
          <span className="font-bold text-slate-800">{stats.total}개</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            완벽 암기
          </span>
          <span className="font-bold">{stats.memorized}개</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-rose-50 text-rose-800">
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            오답 복습
          </span>
          <span className="font-bold">{stats.wrong}개</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 text-slate-600">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            미학습
          </span>
          <span className="font-bold">{stats.unseen}개</span>
        </div>
      </div>
    </div>
  );
};
