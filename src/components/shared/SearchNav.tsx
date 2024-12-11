'use client';

import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { useSearchEngineStore, SearchEngine } from '@/stores/tabStore';

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
      className={`relative flex items-center px-4 py-1 cursor-pointer rounded-2xl transition-all duration-300 z-10 ${
        isActive ? 'text-white' : 'text-primary-800'
      }`}
    >
      <span>{label}</span>
    </div>
  );
}

interface SearchTabsProps {
  recalculateHighlightRef: React.MutableRefObject<(() => void) | null>;
}

export function SearchTabs({ recalculateHighlightRef }: SearchTabsProps) {
  const { activeSearchEngine, setActiveSearchEngine } = useSearchEngineStore();
  const [highlightStyle, setHighlightStyle] = useState<{
    height: number;
    width: number;
    top: number;
    left: number;
  }>({ height: 0, width: 0, top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<SearchEngine, HTMLDivElement | null>>({
    google: null,
    naver: null,
    bing: null,
  });

  const tabs: { label: string; engine: SearchEngine }[] = [
    { label: 'Google', engine: 'google' },
    { label: 'Naver', engine: 'naver' },
    { label: 'Bing', engine: 'bing' },
  ];

  const calculateHighlightStyle = useCallback((engine: SearchEngine) => {
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
  }, []);

  const handleTabClick = (engine: SearchEngine) => {
    setActiveSearchEngine(engine);
  };

  // activeSearchEngine가 변할 때마다 하이라이트 재계산
  useLayoutEffect(() => {
    calculateHighlightStyle(activeSearchEngine);
  }, [activeSearchEngine, calculateHighlightStyle]);

  // recalculateHighlightRef에 재계산 함수 등록
  // SearchForm에서 transitionEnd 후 이 함수를 호출하여 하이라이트 재계산
  React.useEffect(() => {
    recalculateHighlightRef.current = () => {
      calculateHighlightStyle(activeSearchEngine);
    };
  }, [recalculateHighlightRef, activeSearchEngine, calculateHighlightStyle]);

  return (
    <div
      className='flex items-center rounded-full relative'
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      {tabs.map((tab) => (
        <div
          key={tab.engine}
          ref={(el) => {
            tabRefs.current[tab.engine] = el;
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
          transform: `translateX(${highlightStyle.left}px)`,
        }}
      ></div>
    </div>
  );
}
