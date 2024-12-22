'use client';
import { useState, useEffect } from 'react';
import AppPlus from '@/assets/icons/appPlus.svg';
import Xmark from '@/assets/icons/x-mark.svg';
import { Tooltip } from '../shared/Tooltip';
import NextImage from 'next/image';

interface Favorite {
  name: string; // 사이트 이름
  url: string; // 즐겨찾기 URL
  favicon: string; // 파비콘 URL
}

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

  // URL 정규화
  const normalizeUrl = (url: string) => {
    try {
      return new URL(url).href;
    } catch {
      return new URL(`https://${url}`).href;
    }
  };

  // 즐겨찾기 추가
  const handleAddFavorite = () => {
    const urlInput = prompt('추가할 사이트 URL을 입력하세요:');
    if (!urlInput) return;

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

  // 우클릭 (삭제 버튼 토글)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDeleteButtons(!showDeleteButtons);
  };

  // 드래그 시작
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    // index가 0 → '추가' 버튼 → 드래그 불가
    if (index === 0) {
      e.preventDefault();
      return;
    }
    const actualIndex = index - 1;
    setDraggingIndex(actualIndex);
    setDraggingItem(favorites[actualIndex]);

    // 기본 고스트 제거
    const img = new Image();
    img.src = '';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  // 드래그가 항목 위로 올라왔을 때
  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (index === 0) return; // '추가' 버튼
    if (draggingIndex === null) return;

    // 실제 favorites 배열 인덱스
    const actualIndex = index - 1;
    setDragOverIndex(actualIndex);
  };

  // 드래그 중 항목 위에 있을 때
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // 마우스 위치 추적
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
          { name: '추가', url: '#', favicon: '', isAddButton: true },
          ...favorites.map((fav) => ({ ...fav, isAddButton: false })),
        ].map((button, index) => {
          const { url, favicon, name } = button;
          const isHovered = hoveredIndex === index;
          const isAdjacent =
            hoveredIndex !== null &&
            (index === hoveredIndex - 1 || index === hoveredIndex + 1);

          const width = isHovered ? '46px' : isAdjacent ? '43px' : '40px';
          const height = isHovered ? '46px' : isAdjacent ? '43px' : '40px';

          const isCurrentlyDragging =
            draggingIndex !== null && index - 1 === draggingIndex;
          const isDragOverThis =
            dragOverIndex !== null && dragOverIndex === index - 1;

          if (button.isAddButton) {
            // '추가' 버튼
            return (
              <div
                key={index}
                className='p-1 relative transition-all duration-300'
              >
                <button
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={handleAddFavorite}
                  className='flex items-center justify-center bg-primary-300 rounded-xl 
                             transition-all duration-300 p-2'
                  style={{ width, height }}
                  draggable={false}
                >
                  <AppPlus className='text-primary-700 w-full h-full' />
                </button>
              </div>
            );
          } else {
            const actualIndex = index - 1;

            // **여기서 '첫 번째 아이템이면 왼쪽, 나머지는 기본 오른쪽'** + **인덱스 비교 로직**
            // 1) actualIndex === 0 => 항상 왼쪽
            // 2) draggingIndex > actualIndex => "더 뒤의 요소를 앞으로 가져온다" => 왼쪽
            // 3) 나머지 => 오른쪽
            let barPositionClass = '';
            if (isDragOverThis) {
              if (actualIndex === 0) {
                // 첫 번째 아이템
                barPositionClass = 'left-[-2px]';
              } else if (
                draggingIndex !== null &&
                draggingIndex > actualIndex
              ) {
                // 인덱스가 더 큰 아이템(뒤쪽에 있던 것)을 앞으로 옮기는 상황
                barPositionClass = 'left-[-2px]';
              } else {
                barPositionClass = 'right-[-2px]';
              }
            }

            return (
              <div
                key={index}
                className='p-1 relative transition-all duration-300'
                style={{
                  width: 'fit-content',
                  // 드래그 중인 아이템은 원래 자리에서 숨김
                  opacity: isCurrentlyDragging ? 0 : 1,
                }}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                {/* 드래그 오버 표시 바 */}
                {isDragOverThis && (
                  <div
                    className={`
                      absolute
                      top-1/2
                      -translate-y-1/2
                      w-[3px]
                      h-[30px]
                      bg-gradient-to-b
                      from-primary-100
                      to-primary-200
                      rounded-xl
                      shadow-md
                      animate-pulse
                      transition-transform
                      duration-200
                      ease-out
                      scale-110
                      ${barPositionClass}
                    `}
                  />
                )}

                <a
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className='flex flex-col items-center justify-center bg-primary-300 rounded-xl
                             transition-all duration-300 p-1'
                  style={{ width, height }}
                >
                  <NextImage
                    src={favicon}
                    alt={name}
                    width={40}
                    height={40}
                    className='rounded-lg select-none pointer-events-none'
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </a>
                <Tooltip text={name} isVisible={isHovered} />
                {showDeleteButtons && (
                  <button
                    onClick={() => handleDeleteFavorite(actualIndex)}
                    className='absolute top-[-1px] left-[-1px] bg-primary-200 text-primary-500 
                               text-xs rounded-full shadow-md z-50 w-4 h-4 flex items-center 
                               justify-center'
                  >
                    <Xmark className='w-3 h-3' />
                  </button>
                )}
              </div>
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
            className='bg-primary-300 rounded-xl p-2 shadow-lg flex flex-col items-center justify-center'
            style={{ width: '45px', height: '45px' }}
          >
            <NextImage
              src={draggingItem.favicon}
              alt={draggingItem.name}
              width={40}
              height={40}
              className='rounded-lg select-none pointer-events-none'
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
    </>
  );
}
