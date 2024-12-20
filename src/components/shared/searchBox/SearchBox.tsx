'use client';
import { useEffect } from 'react';
import { Backdrop } from '../BackDrop';
import { SearchInput } from './SearchInput';
import { useSearchBoxStore } from '@/stores/useSearchBoxStore';

export function SearchBox() {
  const { isSearchBoxVisible, toggleSearchBoxVisibility } = useSearchBoxStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Mac: Cmd+K, Windows: Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // 브라우저 기본 동작 방지
        toggleSearchBoxVisibility(); // 상태 토글
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // 클린업
    };
  }, [toggleSearchBoxVisibility]);

  const handleClose = () => {
    if (isSearchBoxVisible) {
      toggleSearchBoxVisibility(); // 검색 박스 닫기
    }
  };

  return (
    <Backdrop isVisible={isSearchBoxVisible} onClose={handleClose}>
      <SearchInput />
    </Backdrop>
  );
}
