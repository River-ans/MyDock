'use client';

import React, { useEffect, useState } from 'react';
import { useSearchEngineStore } from '@/stores/useSearchBoxStore';

interface SearchEngineSelectorProps {
  inputRef: React.RefObject<HTMLInputElement>;
  isSearchBoxVisible: boolean;
}

export const SearchEngineSelector: React.FC<SearchEngineSelectorProps> = ({
  inputRef,
  isSearchBoxVisible,
}) => {
  const { searchEngines, selectedEngine, setSelectedEngine } =
    useSearchEngineStore();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // 현재 선택된 인덱스

  // 드롭다운 열릴 때 선택된 엔진의 인덱스 설정
  useEffect(() => {
    if (isOpen) {
      const selectedIndex = searchEngines.findIndex(
        (engine) => engine.name === selectedEngine.name
      );
      setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : 0);
    }
  }, [isOpen, searchEngines, selectedEngine]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isSearchBoxVisible && e.key === 'Tab') {
        e.preventDefault(); // 기본 Tab 동작 방지
        setIsOpen((prev) => !prev); // Tab 키로 드롭다운 토글
      } else if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < searchEngines.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : searchEngines.length - 1
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleSelect(searchEngines[highlightedIndex]);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          if (inputRef.current) {
            inputRef.current.focus(); // 입력 필드로 포커스 이동
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isSearchBoxVisible, isOpen, highlightedIndex, searchEngines, inputRef]);

  const handleSelect = (engine: typeof selectedEngine) => {
    setSelectedEngine(engine);
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className='relative'>
      {/* 현재 선택된 엔진 표시 */}
      <button
        type='button'
        className='flex items-center bg-transparent text-primary-100 font-bold outline-none cursor-pointer px-3 hover:opacity-50'
        onClick={() => setIsOpen(!isOpen)}
      >
        <selectedEngine.icon className='w-4 h-4 rounded-sm' />
      </button>

      {/* 드롭다운 */}
      <div
        className={`absolute top-10 left-0 bg-primary-700/90 rounded-lg shadow-lg shadow-primary-800/40 z-50 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? 'max-h-40 opacity-100 pointer-events-auto visible'
            : 'max-h-0 opacity-0 pointer-events-none invisible'
        }`}
      >
        {searchEngines.map((engine, index) => (
          <button
            type='button'
            key={engine.name}
            onClick={() => handleSelect(engine)}
            className={`flex items-center w-full px-3 py-3 hover:bg-primary-700 text-primary-100 cursor-pointer ${
              highlightedIndex === index ? 'bg-primary-700' : ''
            }`}
          >
            <engine.icon className='w-4 h-4 rounded-sm' />
          </button>
        ))}
      </div>
    </div>
  );
};
