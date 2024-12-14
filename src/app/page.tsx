'use client';

import React from 'react';
import { SearchForm } from '@/components/shared/SearchForm';
import { Favorites } from '@/components/shared/Favorites';
import { FavoritesForm } from '@/components/shared/FavoritesForm';

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <SearchForm />
      <Favorites />
      <FavoritesForm />
    </div>
  );
}
