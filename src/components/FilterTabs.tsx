import React from 'react';
import { FilterTab } from '../types/flashcard';
import { Layers, ShieldAlert, Apple, AlertTriangle } from 'lucide-react';

interface FilterTabsProps {
  currentTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  counts: {
    all: number;
    hygiene: number;
    nutrition: number;
    wrong: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  currentTab,
  onTabChange,
  counts,
}) => {
  const tabs = [
    {
      id: 'all' as FilterTab,
      label: '전체 보기',
      icon: Layers,
      count: counts.all,
      badgeColor: 'bg-slate-100 text-slate-700',
      activeColor: 'bg-slate-800 text-white shadow-sm',
    },
    {
      id: 'hygiene' as FilterTab,
      label: '식품위생학',
      icon: ShieldAlert,
      count: counts.hygiene,
      badgeColor: 'bg-emerald-100 text-emerald-800',
      activeColor: 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30',
    },
    {
      id: 'nutrition' as FilterTab,
      label: '영양학',
      icon: Apple,
      count: counts.nutrition,
      badgeColor: 'bg-indigo-100 text-indigo-800',
      activeColor: 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30',
    },
    {
      id: 'wrong' as FilterTab,
      label: '오답 집중 복습',
      icon: AlertTriangle,
      count: counts.wrong,
      badgeColor: 'bg-rose-100 text-rose-700 font-bold',
      activeColor: 'bg-rose-600 text-white shadow-sm shadow-rose-600/30',
    },
  ];

  return (
    <div className="flex items-center gap-1.5 md:gap-2 p-1.5 bg-slate-200/70 rounded-xl mb-6 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 ${
              isActive
                ? tab.activeColor
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs transition-colors ${
                isActive
                  ? 'bg-white/20 text-white'
                  : tab.badgeColor
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
