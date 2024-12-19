'use client';

import React, { useState } from 'react';
import { useSearchEngineStore } from '@/stores/useSearchBoxStore';

interface SearchEngineSelectorProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export const SearchEngineSelector: React.FC<SearchEngineSelectorProps> = ({
  inputRef,
}) => {
  const { searchEngines, selectedEngine, setSelectedEngine } =
    useSearchEngineStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (engine: typeof selectedEngine) => {
    setSelectedEngine(engine);
    setIsOpen(false); // 선택 후 드롭다운 닫기
    if (inputRef.current) {
      inputRef.current.focus(); // Input에 포커스
    }
  };

  return (
    <div className='relative'>
      {/* 현재 선택된 엔진 표시 */}
      <button
        className='flex items-center bg-transparent text-primary-100 font-bold outline-none cursor-pointer px-3 hover:opacity-50'
        onClick={() => setIsOpen(!isOpen)}
      >
        <selectedEngine.icon className='w-4 h-4 rounded-sm' />
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <div className='absolute top-10 left-0 bg-primary-900/70 rounded-lg shadow-lg z-50 overflow-hidden'>
          {searchEngines.map((engine) => (
            <button
              key={engine.name}
              onClick={() => handleSelect(engine)}
              className='flex items-center w-full px-3 py-3 hover:bg-primary-700 text-primary-100 cursor-pointer'
            >
              <engine.icon className='w-4 h-4 rounded-sm' />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
