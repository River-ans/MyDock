'use client';
import React, { useEffect } from 'react';
import { db } from '@/lib/db';
import { useBgStore } from '@/stores/useBgStore';
import { useContextMenuStore } from '@/stores/useContextMenu';

export function BackgroundContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Zustand에서 bgUrl, fileName, setter 가져오기
  const { bgUrl, setBgUrl, setFileName } = useBgStore();
  const { openMenu, closeMenu } = useContextMenuStore();

  useEffect(() => {
    (async () => {
      // IndexedDB에서 이미 저장된 값 가져오기
      const stored = await db.images.get('bgImage');
      if (stored) {
        // 전역 상태에 세팅
        setBgUrl(stored.base64);
        setFileName(stored.fileName || '');
      }
    })();
  }, [setBgUrl, setFileName]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // x, y 좌표
    const { clientX, clientY } = e;
    openMenu(clientX, clientY);
  };

  // 예: 컨테이너 영역을 좌클릭하면 메뉴 닫기
  const handleClick = () => {
    closeMenu();
  };

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center transition-colors'
      style={{
        backgroundColor: bgUrl ? 'transparent' : '#fff',
        backgroundImage: bgUrl ? `url(${bgUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
