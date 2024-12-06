'use client';

import React from 'react';
import { SearchForm } from '../components/shared/SearchForm';
import { useSearchEngineStore } from '../stores/tabStore';

export default function Home() {
  const { activeSearchEngine } = useSearchEngineStore();

  const handleSearch = (query: string) => {
    // 검색 엔진 URL 구성
    const searchUrls: { [key: string]: string } = {
      google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      naver: `https://search.naver.com/search.naver?query=${encodeURIComponent(
        query
      )}`,
      bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    };

    // 선택된 검색 엔진으로 이동
    const url = searchUrls[activeSearchEngine];
    if (url) {
      window.open(url, '_blank'); // 새 탭에서 열기
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <SearchForm onSubmit={handleSearch} />
    </div>
  );
}
