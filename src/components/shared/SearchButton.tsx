'use client';

import SearchIcon from '@/assets/icons/search.svg';
import { useSearchBoxStore } from '@/stores/useSearchBoxStore';

export function SearchButton() {
  const { toggleSearchBoxVisibility } = useSearchBoxStore();

  return (
    <button
      className='p-1 px-2 flex gap-1 items-center bg-primary-500/80 
      text-primary-200/50 text-sm rounded-full
      border border-primary-200/50 shadow-xl hover:scale-[104%]
      fixed top-[10%] left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out '
      onClick={toggleSearchBoxVisibility}
    >
      <SearchIcon className='w-3 h-3 text-primary-300/80' />
      <span>Search</span>
    </button>
  );
}
