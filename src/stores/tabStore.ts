import { create } from 'zustand';

// Zustand 스토어
interface SearchEngineStore {
  activeSearchEngine: string; // 현재 선택된 검색 엔진
  setActiveSearchEngine: (engine: string) => void;
}

export const useSearchEngineStore = create<SearchEngineStore>((set) => ({
  activeSearchEngine: 'google', // 기본 검색 엔진은 Google
  setActiveSearchEngine: (engine) => set({ activeSearchEngine: engine }),
}));
