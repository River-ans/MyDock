// @/stores/tabStore.ts
import { create } from 'zustand';

export type SearchEngine = 'google' | 'naver' | 'bing';

interface TabStoreState {
  activeSearchEngine: SearchEngine;
  setActiveSearchEngine: (engine: SearchEngine) => void;
}

export const useSearchEngineStore = create<TabStoreState>((set) => ({
  activeSearchEngine: 'google',
  setActiveSearchEngine: (engine) => set({ activeSearchEngine: engine }),
}));
