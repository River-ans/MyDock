'use client';

import React from 'react';

interface BackdropProps {
  isVisible: boolean; // Backdrop 표시 여부
  onClose?: () => void; // Backdrop 클릭 시 실행할 함수
  children?: React.ReactNode; // Backdrop 내부에 렌더링할 요소
  className?: string; // 추가적인 스타일 적용을 위한 props
}

export const Backdrop: React.FC<BackdropProps> = ({
  isVisible,
  onClose,
  children,
  className = '',
}) => {
  if (!isVisible) return null; // 표시되지 않으면 렌더링하지 않음

  return (
    <div
      className={`backDrop ${
        isVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } ${className}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose(); // Backdrop 클릭 시 닫기
        }
      }}
    >
      {children}
    </div>
  );
};
