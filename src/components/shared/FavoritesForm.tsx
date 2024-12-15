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

    // URL 유효성 검사 및 http:// 또는 https:// 추가
    let url = favoriteData.url.trim();
    if (!/^https?:\/\//.test(url)) {
      url = `https://${url}`; // 기본적으로 https:// 추가
    }

    try {
      new URL(url); // URL 유효성 검사
    } catch {
      alert('올바른 URL을 입력해주세요.');
      return;
    }

    addFavorite({ ...favoriteData, url }); // Zustand 상태 업데이트 및 로컬스토리지 동기화
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
        className={`w-64 flex flex-col gap-2 bg-primary-500/80 p-3 rounded-3xl border 
            border-gray-300 border border-primary-100/50 shadow-xl duration-500 ease-in-out ${
              isAnimating
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-0 pointer-events-none'
            }`}
      >
        <h2 className='text-primary-300 font-bold text-md font-semibold'>
          즐겨찾기 추가
        </h2>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-2'>
          <input
            type='text'
            name='name'
            placeholder='사이트 이름'
            value={favoriteData.name}
            onChange={handleInputChange}
            className='bg-primary-100/10 text-primary-200 border border-primary-100/20 px-2 py-1 rounded-lg placeholder:text-sm placeholder:text-primary-100/50'
            required
          />
          <input
            type='text'
            name='url'
            placeholder='사이트 링크'
            value={favoriteData.url}
            onChange={handleInputChange}
            className='bg-primary-100/10 text-primary-200 border border-primary-100/20 px-2 py-1 rounded-lg placeholder:text-sm placeholder:text-primary-100/50'
            required
          />
          <div className='ml-auto flex gap-2'>
            <button
              type='submit'
              className='bg-primary-900/40 text-white text-sm px-3 rounded-lg duration-300 hover:opacity-80'
            >
              추가
            </button>
            <button
              type='button'
              onClick={() => setShowForm(false)}
              className='bg-primary-200/20 text-primary-200 text-sm px-3 py-1 rounded-lg duration-300 hover:opacity-80'
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
