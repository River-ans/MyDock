'use client';

import React from 'react';
import { PlusIcon } from '@/assets/icons/PlusIcon';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { FavoritesList } from './FavoritesList';

export function Favorites() {
  const setShowForm = useFavoritesStore((state) => state.setShowForm);

  const handleAddClick = (): void => {
    setShowForm(true); // 전역 상태로 폼 표시
  };

  return (
    <div className='w-fit flex  items-center justify-center gap-2 bg-primary-900/10 backdrop-blur-sm  w-fit p-3  rounded-3xl border-[0.5px] border-primary-100 outline outline-primary-300'>
      <button
        onClick={handleAddClick}
        className='flex justify-center items-center w-10 h-10 bg-primary-500/20 text-primary-400 rounded-xl transition duration-300 hover:bg-primary-400/10 hover:scale-110'
      >
        <PlusIcon width={24} height={24} />
      </button>
      <FavoritesList />
    </div>
  );
}
