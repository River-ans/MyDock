'use client';
import { useEffect, useRef, useState } from 'react';
import SearchIcon from '@/assets/icons/search.svg';
import { useSearchBoxStore } from '@/stores/useSearchBoxStore';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // input 참조
  const { isSearchBoxVisible } = useSearchBoxStore(); // 전역 상태 구독

  useEffect(() => {
    if (isSearchBoxVisible && inputRef.current) {
      inputRef.current.focus(); // 검색 박스가 표시될 때 자동 포커스
    }
  }, [isSearchBoxVisible]); // 상태 변경 시마다 실행

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작 막기
    if (query.trim()) {
      // 구글 검색을 새 창에서 열기
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        '_blank'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit} // form의 onSubmit 처리
      className='w-96 h-12 flex items-center bg-primary-800/70 p-1 rounded-xl
      border border-primary-200/50 shadow-xl shadow-primary-800/40
      fixed top-[15%]
      '
    >
      <div className='px-2'>
        <SearchIcon width={18} height={18} className='text-primary-200/80' />
      </div>
      <input
        ref={inputRef}
        type='text'
        placeholder='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)} // 입력 값 업데이트
        className='bg-transparent text-primary-100 font-bold
          placeholder:text-primary-200/80 placeholder:text-lg
          placeholder:font-bold focus:outline-none'
      />
    </form>
  );
}
