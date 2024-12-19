import { create } from 'zustand';

interface SearchBoxState {
  isSearchBoxVisible: boolean; // 상태 이름 변경
  toggleSearchBoxVisibility: () => void; // 상태 토글
  setSearchBoxVisibility: (visible: boolean) => void; // 상태 직접 설정
}

export const useSearchBoxStore = create<SearchBoxState>((set) => ({
  isSearchBoxVisible: false,
  toggleSearchBoxVisibility: () =>
    set((state) => ({ isSearchBoxVisible: !state.isSearchBoxVisible })),
  setSearchBoxVisibility: (visible) => set({ isSearchBoxVisible: visible }),
}));
