'use client';

import React, { useEffect } from 'react';
import { useFavoritesStore } from '@/stores/useFavoritesStore';

export function FavoritesList() {
  const { favorites, loadFavorites } = useFavoritesStore();

  useEffect(() => {
    loadFavorites(); // 로컬스토리지에서 초기 데이터 로드
  }, [loadFavorites]);

  if (favorites.length === 0) {
    return <p className='text-gray-500'></p>;
  }

  return (
    <>
      {favorites.map((favorite, index) => (
        <div
          key={index}
          className='flex justify-center items-center w-10 h-10 bg-primary-500/20 text-primary-400 rounded-xl transition duration-300 hover:bg-primary-400/20 hover:scale-125	overflow-hidden p-1'
        >
          <a
            href={`https://${favorite.url}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline'
          >
            <img
              src={`https://www.google.com/s2/favicons?sz=64&domain_url=${favorite.url}`}
              alt={`${favorite.name} 파비콘`}
              className='rounded-lg'
            />
          </a>
        </div>
      ))}
    </>
  );
}
