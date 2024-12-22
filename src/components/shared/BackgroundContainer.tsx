'use client';
import React, { useEffect } from 'react';
import { db } from '@/lib/db';
import { useBgStore } from '@/stores/useBgStore';

export function BackgroundContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Zustand에서 bgUrl, fileName, setter 가져오기
  const { bgUrl, setBgUrl, setFileName } = useBgStore();

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

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center transition-colors'
      style={{
        backgroundColor: bgUrl ? 'transparent' : '#fff',
        backgroundImage: bgUrl ? `url(${bgUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
}
