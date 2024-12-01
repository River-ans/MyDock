'use client';

import { SearchTabs } from '../components/shared/SearchNav';
import { useState } from 'react';
import { useSearchEngineStore } from './stores/tabStore';

export default function Home() {
  const { activeSearchEngine } = useSearchEngineStore(); // 선택된 검색 엔진
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (!searchQuery.trim()) return;

    // 검색 엔진 URL 구성
    const searchUrls: { [key: string]: string } = {
      google: `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`,
      naver: `https://search.naver.com/search.naver?query=${encodeURIComponent(
        searchQuery
      )}`,
      baidu: `https://www.baidu.com/s?wd=${encodeURIComponent(searchQuery)}`,
    };

    // 선택된 검색 엔진으로 이동
    const url = searchUrls[activeSearchEngine];
    if (url) {
      window.open(url, '_blank'); // 새 탭에서 열기
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <form
        onSubmit={handleSearch}
        className='flex flex-col gap-2 bg-gray-100 p-2 rounded-3xl border border-gray-300'
      >
        <SearchTabs />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='bg-transparent focus:outline-none focus:ring-0 px-2'
          placeholder='Search something...'
        />
      </form>
    </div>
  );
}
