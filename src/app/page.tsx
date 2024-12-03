'use client';
import { SearchTabs } from '../components/shared/SearchNav';
import { useState } from 'react';
import { useSearchEngineStore } from '../stores/tabStore';
import { SearchIcon } from '@/assets/icons/SearchIcon';

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
      bing: `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`,
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
        <div className='flex items-center relative'>
          <div className='absolute left-2 top text-primary-600'>
            <SearchIcon width={16} height={16} />
          </div>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='bg-transparent focus:outline-none focus:ring-0 px-2 py-1 pl-8'
            placeholder='Search something...'
          />
        </div>
      </form>
    </div>
  );
}
