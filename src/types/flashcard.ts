/**
 * 플래시카드 기본 데이터 타입 정의
 */
export interface Flashcard {
  id: string;
  category: '식품위생학' | '영양학';
  question: string;
  answer: string;
  tip: string;
  status: 'unseen' | 'memorized' | 'wrong';
}

/**
 * 필터 모드 타입
 * - 'all': 전체 보기
 * - 'hygiene': 식품위생학
 * - 'nutrition': 영양학
 * - 'wrong': 오답 집중 복습
 */
export type FilterTab = 'all' | 'hygiene' | 'nutrition' | 'wrong';

/**
 * 학습 진행 통계 데이터 타입
 */
export interface StudyStats {
  total: number;
  memorized: number;
  wrong: number;
  unseen: number;
  progressPercent: number;
}
