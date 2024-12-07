'use client';

import React, { useState, useEffect } from 'react';
import { SearchForm } from '../components/shared/SearchForm';
import { useSearchEngineStore } from '../stores/tabStore';

export default function Home() {
  const { activeSearchEngine } = useSearchEngineStore();
  const [showSearchForm, setShowSearchForm] = useState(false); // 기본값: 안 보임

  const handleSearch = (query: string) => {
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
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

      // Mac: Command + K, Windows: Control + K
      const isToggleKey = isMac
        ? e.metaKey && e.key === 'k' // Command + K
        : e.ctrlKey && e.key === 'k'; // Control + K

      if (isToggleKey) {
        e.preventDefault(); // 기본 동작 방지
        setShowSearchForm((prev) => !prev); // 표시/숨기기 토글
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      {showSearchForm && (
        <div
          className='transition-all duration-300 ease-in-out'
          style={{
            transform: showSearchForm ? 'scale(1)' : 'scale(0)',
            opacity: showSearchForm ? 1 : 0,
            transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          }}
        >
          <SearchForm onSubmit={handleSearch} />
        </div>
      )}
    </div>
  );
}
