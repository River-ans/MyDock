import { create } from 'zustand';

interface SearchFormState {
  showSearchForm: boolean;
  setShowSearchForm: (isOpen: boolean) => void;
  toggleSearchForm: () => void;
}

export const useSearchFormStore = create<SearchFormState>((set) => ({
  showSearchForm: false,
  setShowSearchForm: (isOpen) => set({ showSearchForm: isOpen }),
  toggleSearchForm: () =>
    set((state) => ({ showSearchForm: !state.showSearchForm })),
}));
