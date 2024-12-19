'use client';

import { useEffect, useRef, useState } from 'react';
import {
  useSearchBoxStore,
  useSearchEngineStore,
} from '@/stores/useSearchBoxStore';
import { SearchEngineSelector } from './SearchEngineSelector';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isSearchBoxVisible } = useSearchBoxStore();
  const { selectedEngine } = useSearchEngineStore();

  useEffect(() => {
    if (isSearchBoxVisible && inputRef.current) {
      inputRef.current.focus(); // 검색 박스가 표시될 때 자동 포커스
    }
  }, [isSearchBoxVisible]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(
        `${selectedEngine.url}${encodeURIComponent(query)}`,
        '_blank'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-96 h-12 flex items-center bg-primary-800/70 rounded-xl
      border border-primary-200/50 shadow-xl shadow-primary-800/40
      fixed top-[15%]'
    >
      <SearchEngineSelector inputRef={inputRef} />
      <input
        ref={inputRef}
        type='text'
        placeholder='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='bg-transparent text-primary-100 font-bold placeholder:text-primary-200/80 placeholder:text-lg placeholder:font-bold focus:outline-none flex-1'
      />
    </form>
  );
}
