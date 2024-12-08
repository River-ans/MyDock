'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SearchTabs } from './SearchNav';
import { useSearchEngineStore } from '@/stores/tabStore';

export const SearchForm: React.FC = () => {
  const [showSearchForm, setShowSearchForm] = useState(false); // SearchForm 표시 상태
  const { activeSearchEngine } = useSearchEngineStore();
  const inputRef = useRef<HTMLInputElement>(null); // input 포커스 참조

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (query) {
      const searchUrls: { [key: string]: string } = {
        google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        naver: `https://search.naver.com/search.naver?query=${encodeURIComponent(
          query
        )}`,
        bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
      };

      const url = searchUrls[activeSearchEngine];
      if (url) {
        window.open(url, '_blank'); // 새 탭에서 열기
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      const isToggleKey = isMac
        ? e.metaKey && e.key === 'k' // Command + K
        : e.ctrlKey && e.key === 'k'; // Control + K

      if (isToggleKey) {
        e.preventDefault(); // 기본 동작 방지
        setShowSearchForm((prev) => !prev); // 표시/숨기기 토글
        if (!showSearchForm) {
          setTimeout(() => inputRef.current?.focus(), 0); // 포커스
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSearchForm]);

  return (
    <>
      {showSearchForm && (
        <form
          onSubmit={handleSearch}
          className='flex flex-col gap-2 bg-gray-100 p-2 rounded-3xl border border-gray-300 transition-all duration-300'
          style={{
            transform: showSearchForm ? 'scale(1)' : 'scale(0)',
            opacity: showSearchForm ? 1 : 0,
          }}
        >
          <SearchTabs />
          <div className='flex items-center relative'>
            <div className='absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-600'>
              🔍
            </div>
            <input
              type='text'
              ref={inputRef}
              className='bg-transparent focus:outline-none focus:ring-0 px-2 py-1 pl-8'
              placeholder='Search something...'
            />
          </div>
        </form>
      )}
    </>
  );
};
