'use client';
import React, { Dispatch, SetStateAction } from 'react';
import AppPlus from '@/assets/icons/appPlus.svg';

interface AddButtonProps {
  index: number;
  hoveredIndex: number | null;
  onHoverChange: Dispatch<SetStateAction<number | null>>;
  onAddFavorite: () => void;
}

export function AddButton({
  index,
  hoveredIndex,
  onHoverChange,
  onAddFavorite,
}: AddButtonProps) {
  const isHovered = hoveredIndex === index;

  // 인접 요소 hover 시 크기 변화
  const isAdjacent =
    hoveredIndex !== null &&
    (index === hoveredIndex - 1 || index === hoveredIndex + 1);

  const width = isHovered ? '46px' : isAdjacent ? '43px' : '40px';
  const height = isHovered ? '46px' : isAdjacent ? '43px' : '40px';

  return (
    <div className='p-1 relative transition-all duration-300'>
      <button
        onMouseEnter={() => onHoverChange(index)}
        onMouseLeave={() => onHoverChange(null)}
        onClick={onAddFavorite}
        className='flex items-center justify-center bg-primary-300 rounded-xl 
                   transition-all duration-300 p-2'
        style={{ width, height }}
        draggable={false}
      >
        <AppPlus className='text-primary-700 w-full h-full' />
      </button>
    </div>
  );
}
