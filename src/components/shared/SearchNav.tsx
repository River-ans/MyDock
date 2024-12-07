'use client';
import { useSearchEngineStore } from '@/stores/tabStore';
import React, { useRef, useState, useEffect } from 'react';

interface SearchTabsItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function SearchTabsItem({
  label,
  isActive,
  onClick,
}: SearchTabsItemProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center px-4 py-1 cursor-pointer rounded-2xl transition-all duration-500 z-10 ${
        isActive ? 'text-white' : 'bg-transparent text-primary-800'
      }`}
    >
      <span>{label}</span>
    </div>
  );
}

export function SearchTabs() {
  const { activeSearchEngine, setActiveSearchEngine } = useSearchEngineStore();
  const [highlightStyle, setHighlightStyle] = useState({
    height: 0,
    width: 0,
    top: 0,
    left: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const calculateHighlightStyle = (engine: string) => {
    if (containerRef.current && tabRefs.current[engine]) {
      const target = tabRefs.current[engine];
      const { width, height, top, left } = target!.getBoundingClientRect();
      const containerOffset = containerRef.current.getBoundingClientRect();

      setHighlightStyle({
        width,
        height,
        top: top - containerOffset.top,
        left: left - containerOffset.left,
      });
    }
  };

  useEffect(() => {
    calculateHighlightStyle(activeSearchEngine);
  }, [activeSearchEngine]);

  const handleTabClick = (engine: string) => {
    setActiveSearchEngine(engine);
    calculateHighlightStyle(engine);
  };

  const tabs = [
    { label: 'Google', engine: 'google' },
    { label: 'Naver', engine: 'naver' },
    { label: 'Bing', engine: 'bing' },
  ];

  return (
    <div className='flex items-center rounded-full relative' ref={containerRef}>
      {tabs.map((tab) => (
        <div
          key={tab.engine}
          ref={(el) => {
            tabRefs.current[tab.engine] = el; // 저장만 하고 반환값 없음
          }}
          onClick={() => handleTabClick(tab.engine)}
        >
          <SearchTabsItem
            label={tab.label}
            isActive={activeSearchEngine === tab.engine}
            onClick={() => handleTabClick(tab.engine)}
          />
        </div>
      ))}
      <div
        className='bg-primary-800 rounded-2xl absolute transition-all duration-500 z-0'
        style={{
          width: `${highlightStyle.width}px`,
          height: `${highlightStyle.height}px`,
          transform: `translateX(${highlightStyle.left}px)`, // 수평 이동
        }}
      ></div>
    </div>
  );
}
