'use client';

import React, { useState } from 'react';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { SearchTabs } from './SearchNav';

interface SearchFormProps {
  onSubmit: (query: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    onSubmit(searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='flex flex-col gap-2 bg-gray-100 p-2 rounded-3xl border border-gray-300'
    >
      <SearchTabs />
      <div className='flex items-center relative'>
        <div className='absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-600'>
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
  );
};
