'use client';
import { useState, useEffect } from 'react';
import AppPlus from '@/assets/icons/appPlus.svg';
import Xmark from '@/assets/icons/x-mark.svg';
import { Tooltip } from '../shared/Tooltip';
import Image from 'next/image';

interface Favorite {
  name: string; // 사이트 이름
  url: string; // 즐겨찾기 URL
  favicon: string; // 파비콘 URL
}

export function DockBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // 현재 호버된 버튼 인덱스
  const [favorites, setFavorites] = useState<Favorite[]>([]); // 즐겨찾기 데이터
  const [showDeleteButtons, setShowDeleteButtons] = useState(false); // 삭제 버튼 표시 여부

  // 로컬스토리지에서 즐겨찾기 로드
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites)); // 로컬스토리지 데이터를 상태에 반영
    }
  }, []);

  // 로컬스토리지에 즐겨찾기 저장
  const saveFavoritesToLocalStorage = (favorites: Favorite[]) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleAddFavorite = () => {
    const urlInput = prompt('추가할 사이트 URL을 입력하세요:');
    if (!urlInput) return;

    try {
      const normalizedUrl = normalizeUrl(urlInput); // URL 정규화
      const parsedUrl = new URL(normalizedUrl);
      const name = prompt('사이트 이름을 입력하세요:') || parsedUrl.hostname; // 사용자 입력 또는 기본값
      const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${parsedUrl.hostname}`;

      const newFavorite = { name, url: parsedUrl.href, favicon };
      const updatedFavorites = [...favorites, newFavorite];

      setFavorites(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
    } catch {
      alert('올바른 URL을 입력해주세요.');
    }
  };

  // URL 정규화 함수
  const normalizeUrl = (url: string) => {
    try {
      return new URL(url).href;
    } catch {
      return new URL(`https://${url}`).href;
    }
  };
  // 즐겨찾기 삭제
  const handleDeleteFavorite = (index: number) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  // 우클릭 이벤트
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 컨텍스트 메뉴 막기
    setShowDeleteButtons(!showDeleteButtons); // 삭제 버튼 표시 토글
  };

  return (
    <div
      className='relative fixed w-fit h-14 flex items-end backdrop-blur-md bg-primary-800/40 rounded-2xl
      border border-primary-200/40 shadow-sm shadow-primary-800/40
      bottom-[8%] left-1/2 -translate-x-1/2 px-2 pb-1'
      onContextMenu={handleContextMenu} // 우클릭으로 삭제 버튼 표시 토글
    >
      {[
        { name: '추가', url: '#', favicon: '', isAddButton: true },
        ...favorites.map((favorite) => ({ ...favorite, isAddButton: false })),
      ].map((button, index) => {
        const isHovered = hoveredIndex === index;
        const isAdjacent =
          hoveredIndex !== null &&
          (index === hoveredIndex - 1 || index === hoveredIndex + 1);

        const width = isHovered ? '46px' : isAdjacent ? '43px' : '40px';
        const height = isHovered ? '46px' : isAdjacent ? '43px' : '40px';

        if (button.isAddButton) {
          return (
            <div key={index} className='p-1 relative'>
              <button
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={handleAddFavorite}
                className='flex items-center justify-center bg-primary-300 rounded-xl transition-all duration-300 p-2'
                style={{ width, height }}
              >
                <AppPlus className='text-primary-700' />
              </button>
            </div>
          );
        } else {
          const { url, favicon, name } = button;
          return (
            <div key={index} className='p-1 relative'>
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className='flex flex-col items-center justify-center bg-primary-300 rounded-xl transition-all duration-300 p-1'
                style={{ width, height }}
              >
                <Image
                  width={40}
                  height={40}
                  src={favicon}
                  alt={name}
                  className='rounded-lg'
                />
              </a>
              {/* 툴팁 표시 */}
              <Tooltip text={name} isVisible={isHovered} />
              {/* 삭제 버튼 표시 */}
              {showDeleteButtons && (
                <button
                  onClick={() => handleDeleteFavorite(index - 1)} // 인덱스 조정
                  className='absolute top-[-1px] left-[-1px] bg-primary-200 text-primary-500 text-xs rounded-full shadow-md z-50 w-4 h-4 flex items-center justify-center'
                >
                  <Xmark className='w-3 h-3' />
                </button>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
