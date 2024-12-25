'use client';
import React from 'react';
import { useContextMenuStore } from '@/stores/useContextMenu';
import { useBgSettingStore } from '@/stores/useBgSettingStore';

export function ContextMenu() {
  const { isOpen, position, closeMenu } = useContextMenuStore();
  const { openBgSetting } = useBgSettingStore();

  if (!isOpen) return null;

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    zIndex: 9999,
  };

  // 외부 클릭으로 닫기 위해 onClickCapture 등 사용하거나,
  // menu 항목 클릭 시 closeMenu() 호출 가능
  return (
    <div
      style={menuStyle}
      onClick={(e) => {
        e.stopPropagation(); // 메뉴 안을 클릭해도 닫히지 않도록
      }}
      className='w-40 bg-primary-800/70 rounded-lg flex flex-col
    backdrop-blur-xlborder border-primary-200/50 shadow-xl 
    shadow-primary-800/40 overflow-hidden p-1 text-primary-200 text-sm'
    >
      {/* 간단한 예시 항목들 */}
      <div
        className='cursor-pointer hover:bg-blue-500 px-2 rounded active:opacity-80'
        onClick={() => {
          closeMenu();
          openBgSetting();
        }}
      >
        배경화면 변경...
      </div>
    </div>
  );
}
