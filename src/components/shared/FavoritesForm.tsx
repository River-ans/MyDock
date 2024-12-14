'use client';

import React, { useState, useEffect } from 'react';
import { useFavoritesStore } from '@/stores/useFavoritesStore';

interface Favorite {
  name: string;
  url: string;
}

export function FavoritesForm() {
  const { showForm, setShowForm, addFavorite } = useFavoritesStore();
  const [favoriteData, setFavoriteData] = useState<Favorite>({
    name: '',
    url: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (showForm) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [showForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFavoriteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!favoriteData.url.startsWith('www.')) {
      alert('링크는 "www."로 시작해야 합니다.');
      return;
    }

    addFavorite(favoriteData); // Zustand 상태 업데이트 및 로컬스토리지 동기화
    setFavoriteData({ name: '', url: '' });
    setShowForm(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-primary-800/30 transition-all duration-500 ${
        isAnimating
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-primary-100 p-6 rounded-3xl w-96 transform transition-all duration-300 ${
          isAnimating
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-0 pointer-events-none'
        }`}
      >
        <h2 className='text-xl font-semibold mb-4'>즐겨찾기 추가</h2>
        <form onSubmit={handleFormSubmit} className='flex flex-col space-y-4'>
          <input
            type='text'
            name='name'
            placeholder='사이트 이름'
            value={favoriteData.name}
            onChange={handleInputChange}
            className='bg-primary-400/10 border px-4 py-2 rounded-md'
            required
          />
          <input
            type='text'
            name='url'
            placeholder='사이트 링크 (www.로 시작)'
            value={favoriteData.url}
            onChange={handleInputChange}
            className='bg-primary-400/10 border px-4 py-2 rounded-md'
            required
          />
          <div className='ml-auto flex gap-2'>
            <button
              type='submit'
              className='bg-primary-900 text-white text-sm px-4 py-2 rounded-lg'
            >
              추가
            </button>
            <button
              type='button'
              onClick={() => setShowForm(false)}
              className='bg-primary-200 text-primary-800 text-sm px-4 py-2 rounded-lg'
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
