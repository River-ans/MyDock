'use client';

import React from 'react';

interface BackdropProps {
  isVisible: boolean; // Backdrop 표시 여부
  onClose?: () => void; // Backdrop 클릭 시 실행할 함수
  children?: React.ReactNode; // Backdrop 내부에 렌더링할 요소
}

export const Backdrop: React.FC<BackdropProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  return (
    <div
      className={`backDrop
        ${
          isVisible
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
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
