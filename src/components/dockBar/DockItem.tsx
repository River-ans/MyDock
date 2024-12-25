'use client';
import React, { Dispatch, SetStateAction } from 'react';
import NextImage from 'next/image';
import Xmark from '@/assets/icons/x-mark.svg';
import type { Favorite } from '@/types';
import { Tooltip } from '../shared/Tooltip';

interface DockItemProps {
  index: number;
  hoveredIndex: number | null;
  onHoverChange: Dispatch<SetStateAction<number | null>>;
  button: Favorite & { isAddButton?: boolean };
  showDeleteButtons: boolean;
  onDelete: (i: number) => void;
  // 드래그 관련
  draggingIndex: number | null;
  dragOverIndex: number | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
}

export function DockItem({
  index,
  hoveredIndex,
  onHoverChange,
  button,
  showDeleteButtons,
  onDelete,
  draggingIndex,
  dragOverIndex,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDrop,
  onDragEnd,
}: DockItemProps) {
  const { url, favicon, name } = button;
  const isHovered = hoveredIndex === index;

  // 인접 hover 시 크기
  const isAdjacent =
    hoveredIndex !== null &&
    (index === hoveredIndex - 1 || index === hoveredIndex + 1);

  const width = isHovered ? '46px' : isAdjacent ? '43px' : '40px';
  const height = isHovered ? '46px' : isAdjacent ? '43px' : '40px';

  // 드래그 중인 요소
  const isCurrentlyDragging =
    draggingIndex !== null && index - 1 === draggingIndex;
  // 드래그 오버된 요소
  const isDragOverThis = dragOverIndex !== null && dragOverIndex === index - 1;

  // 첫 번째 아이템이면 왼쪽, 뒤에서 앞으로 오면 왼쪽, 나머지 오른쪽
  const actualIndex = index - 1;
  let barPositionClass = '';
  if (isDragOverThis) {
    if (actualIndex === 0) {
      barPositionClass = 'left-[-2px]';
    } else if (draggingIndex !== null && draggingIndex > actualIndex) {
      barPositionClass = 'left-[-2px]';
    } else {
      barPositionClass = 'right-[-2px]';
    }
  }

  return (
    <div
      className='p-1 relative '
      style={{
        width: 'fit-content',
        opacity: isCurrentlyDragging ? 0 : 1, // 드래그 중인 아이템은 숨김
      }}
      draggable={true}
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
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

      <button
        onClick={() => window.open(url, '_blank')}
        onMouseEnter={() => onHoverChange(index)}
        onMouseLeave={() => onHoverChange(null)}
        className='flex flex-col items-center justify-center bg-primary-300 rounded-xl transition-all duration-300 p-1'
        style={{ width, height }}
      >
        <NextImage
          src={favicon}
          alt={name}
          width={40}
          height={40}
          className='rounded-lg select-none pointer-events-none'
          draggable={false}
        />
      </button>

      <Tooltip text={name} isVisible={isHovered} />

      {showDeleteButtons && (
        <button
          onClick={() => onDelete(actualIndex)}
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
