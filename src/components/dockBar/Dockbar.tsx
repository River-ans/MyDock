'use client';
import { useState, useEffect, useMemo } from 'react';
import { AddButton } from './AddButton';
import { DockItem } from './DockItem';
import type { Favorite } from '@/types';
import NextImage from 'next/image';

export function DockBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  // 드래그 상태
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // 커스텀 고스트
  const [draggingItem, setDraggingItem] = useState<Favorite | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // 미리 빈 이미지 만들어두기
  const transparentDragImage = useMemo(() => {
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAA' +
        'AAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
      return img;
    }
    return null;
  }, []);

  // 로컬스토리지 로드
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // 로컬스토리지 저장
  const saveFavoritesToLocalStorage = (newFavorites: Favorite[]) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // 즐겨찾기 추가
  const handleAddFavorite = () => {
    const urlInput = prompt('추가할 사이트 URL을 입력하세요:');
    if (!urlInput) return;

    const normalizeUrl = (url: string) => {
      try {
        return new URL(url).href;
      } catch {
        return new URL(`https://${url}`).href;
      }
    };

    try {
      const normalizedUrl = normalizeUrl(urlInput);
      const parsedUrl = new URL(normalizedUrl);
      const name = prompt('사이트 이름을 입력하세요:') || parsedUrl.hostname;
      const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${parsedUrl.hostname}`;

      const newFavorite = { name, url: parsedUrl.href, favicon };
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
    } catch {
      alert('올바른 URL을 입력해주세요.');
    }
  };

  // 즐겨찾기 삭제
  const handleDeleteFavorite = (index: number) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  // 우클릭 (삭제 버튼 표시 토글)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDeleteButtons(!showDeleteButtons);
  };

  // 드래그 시작
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    // 기본 고스트 제거
    if (transparentDragImage) {
      e.dataTransfer.setDragImage(transparentDragImage, 0, 0);
    }
    // index가 0 → '추가' 버튼 → 드래그 불가
    if (index === 0) {
      e.preventDefault();
      return;
    }
    const actualIndex = index - 1;
    setDraggingIndex(actualIndex);
    setDraggingItem(favorites[actualIndex]);
  };

  // 드래그가 항목 위로 올라왔을 때
  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (index === 0) return; // '추가' 버튼
    if (draggingIndex === null) return;

    const actualIndex = index - 1;
    setDragOverIndex(actualIndex);
  };

  // 드래그 중 항목 위에 있을 때
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setDraggingIndex(null);
    setDragOverIndex(null);
    setDraggingItem(null);
  };

  // 드롭
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (index === 0) return;
    if (draggingIndex === null) return;

    const actualDropIndex = index - 1;
    // draggingIndex와 dropIndex가 같으면 아무 동작 안함
    if (draggingIndex === actualDropIndex) {
      setDraggingIndex(null);
      setDragOverIndex(null);
      setDraggingItem(null);
      return;
    }

    const updatedFavorites = [...favorites];
    const [removed] = updatedFavorites.splice(draggingIndex, 1);
    updatedFavorites.splice(actualDropIndex, 0, removed);

    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);

    setDraggingIndex(null);
    setDragOverIndex(null);
    setDraggingItem(null);
  };

  return (
    <>
      <div
        className='relative fixed w-fit h-14 flex items-end backdrop-blur-md bg-primary-800/40 rounded-2xl
                   border border-primary-200/40 shadow-sm shadow-primary-800/40
                   bottom-[8%] left-1/2 -translate-x-1/2 px-2 pb-1'
        onContextMenu={handleContextMenu}
      >
        {[
          // 첫번째 요소: AddButton (가짜 데이터)
          { name: '추가', url: '#', favicon: '', isAddButton: true },
          // 실제 즐겨찾기 목록
          ...favorites.map((fav) => ({ ...fav, isAddButton: false })),
        ].map((button, index) => {
          if (button.isAddButton) {
            return (
              <AddButton
                key={index}
                index={index}
                hoveredIndex={hoveredIndex}
                onHoverChange={setHoveredIndex}
                onAddFavorite={handleAddFavorite}
              />
            );
          } else {
            // DockItem 렌더링
            return (
              <DockItem
                key={index}
                index={index}
                hoveredIndex={hoveredIndex}
                onHoverChange={setHoveredIndex}
                button={button}
                showDeleteButtons={showDeleteButtons}
                onDelete={handleDeleteFavorite}
                // 드래그 관련 props
                draggingIndex={draggingIndex}
                dragOverIndex={dragOverIndex}
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
              />
            );
          }
        })}
      </div>

      {/* 커스텀 드래그 미리보기(ghost) */}
      {draggingItem && (
        <div
          className='pointer-events-none fixed z-50'
          style={{
            left: dragPos.x,
            top: dragPos.y,
            transform: 'translate(-50%, -80%)',
            transition: 'transform 0.2s ease-in-out',
          }}
        >
          <div
            className='bg-primary-300 rounded-xl p-1 shadow-lg flex flex-col items-center justify-center'
            style={{ width: '45px', height: '45px' }}
          >
            <NextImage
              src={draggingItem.favicon}
              alt={draggingItem.name}
              width={45}
              height={45}
              className='rounded-lg select-none pointer-events-none'
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
