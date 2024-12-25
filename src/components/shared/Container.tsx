'use client';
import React, { useState, useEffect } from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const [pos, setPos] = useState(() => {
    if (typeof window !== 'undefined') {
      const containerWidth = 300;
      const containerHeight = 100;

      // 브라우저 창 크기를 기준으로 초기 위치 계산
      const centerX = (window.innerWidth - containerWidth) / 2;
      const centerY = (window.innerHeight - containerHeight) / 2;

      return { x: centerX, y: centerY };
    }
    return { x: 0, y: 0 }; // 서버사이드 렌더링 대비
  });

  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPos({
        x: e.clientX - rel.x,
        y: e.clientY - rel.y,
      });
    };

    const handleMouseUp = () => {
      if (dragging) setDragging(false);
    };

    // 전역 이벤트 리스너 추가
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, rel]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    setDragging(true);
    setRel({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        top: pos.y,
        left: pos.x,
      }}
      className='
        w-[300px]
        bg-primary-800/70 rounded-lg flex backdrop-blur-xl
        border border-primary-200/50 shadow-xl shadow-primary-800/40
        overflow-hidden p-2 select-none
      '
    >
      {children}
    </div>
  );
}
