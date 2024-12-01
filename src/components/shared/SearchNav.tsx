'use client';
import { useSearchEngineStore } from '@/app/stores/tabStore';
import React from 'react';
// import { FaGoogle, FaNaver, FaBaidu } from "react-icons/fa";

interface SearchTabsItemProps {
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function SearchTabsItem({
  label,
  icon,
  isActive,
  onClick,
}: SearchTabsItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-4 py-1 cursor-pointer rounded-2xl transition-all duration-300 ${
        isActive
          ? 'bg-primary-500 text-white'
          : 'bg-transparent text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

export function SearchTabs() {
  const { activeSearchEngine, setActiveSearchEngine } = useSearchEngineStore();

  return (
    <div className='flex rounded-full'>
      {/* Google Tab */}
      <SearchTabsItem
        label='Google'
        // icon={<FaGoogle />}
        isActive={activeSearchEngine === 'google'}
        onClick={() => setActiveSearchEngine('google')}
      />

      {/* Naver Tab */}
      <SearchTabsItem
        label='Naver'
        // icon={<FaNaver />}
        isActive={activeSearchEngine === 'naver'}
        onClick={() => setActiveSearchEngine('naver')}
      />

      {/* Baidu Tab */}
      <SearchTabsItem
        label='Baidu'
        // icon={<FaBaidu />}
        isActive={activeSearchEngine === 'baidu'}
        onClick={() => setActiveSearchEngine('baidu')}
      />
    </div>
  );
}
