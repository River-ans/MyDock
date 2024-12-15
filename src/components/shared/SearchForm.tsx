'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SearchTabs } from './SearchNav';
import { useSearchEngineStore } from '@/stores/tabStore';

export const SearchForm: React.FC = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const { activeSearchEngine } = useSearchEngineStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const recalculateHighlightRef = useRef<(() => void) | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (query) {
      const url = getSearchUrl(activeSearchEngine, query);
      if (url) window.open(url, '_blank');
    }
  };

  const getSearchUrl = (engine: string, query: string): string | null => {
    const searchUrls: Record<string, string> = {
      google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      naver: `https://search.naver.com/search.naver?query=${encodeURIComponent(
        query
      )}`,
      bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    };
    return searchUrls[engine] || null;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    const isToggleKey = isMac
      ? e.metaKey && e.key === 'k'
      : e.altKey && e.shiftKey && e.key === 'k';

    if (isToggleKey) {
      e.preventDefault();
      setShowSearchForm((prev) => {
        const next = !prev;
        if (next) {
          setTimeout(() => inputRef.current?.focus(), 0);
        }
        return next;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // transition이 끝난 뒤 하이라이트 위치 재계산 호출
  const handleTransitionEnd = useCallback(() => {
    if (showSearchForm && recalculateHighlightRef.current) {
      // 폼이 완전히 표시된 뒤 하이라이트 재계산
      recalculateHighlightRef.current();
    }
  }, [showSearchForm]);

  return (
    <div
      className={`h-full w-full bg-black/10 backdrop-blur-sm absolute flex items-center justify-center
    transition-all duration-500 ease-in-out transform z-20
        ${
          showSearchForm
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }
    `}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`
    top-[100px]
    left-[50px]
    z-[999]
    transition-all
    duration-500
    ease-in-out
    transform
    ${
      showSearchForm
        ? 'opacity-100 scale-100 pointer-events-auto'
        : 'opacity-0 scale-0 pointer-events-none'
    }
  `}
      >
        <form
          onSubmit={handleSearch}
          className='flex flex-col gap-2 bg-gray-100 p-2 rounded-3xl border border-gray-300'
        >
          <SearchTabs recalculateHighlightRef={recalculateHighlightRef} />
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
      </div>
    </div>
  );
};
