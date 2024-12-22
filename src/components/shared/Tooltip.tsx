'use client';
import React from 'react';

interface TooltipProps {
  text: string; // 툴팁에 표시할 텍스트
  isVisible: boolean; // 툴팁 표시 여부
  position?: 'top' | 'bottom' | 'left' | 'right'; // 툴팁 위치
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  isVisible,
  position = 'top',
}) => {
  if (!isVisible) return null;

  const positionClasses = {
    top: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div
      className={`absolute z-50 px-2 py-1 bg-primary-900/70 text-white text-xs rounded-md shadow-md transition-opacity duration-200 opacity-100 ${positionClasses[position]}
      whitespace-nowrap
      `}
    >
      {text}
    </div>
  );
};
