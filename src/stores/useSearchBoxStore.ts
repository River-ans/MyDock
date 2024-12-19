import { create } from 'zustand';
import GoogleIcon from '@/assets/icons/google.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import BingIcon from '@/assets/icons/bing.svg';

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

interface SearchEngine {
  name: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>; // 아이콘 필드 추가
}

interface SearchEngineStore {
  searchEngines: SearchEngine[];
  selectedEngine: SearchEngine;
  setSelectedEngine: (engine: SearchEngine) => void;
}

export const useSearchEngineStore = create<SearchEngineStore>((set) => ({
  searchEngines: [
    {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      icon: GoogleIcon,
    },
    {
      name: 'Naver',
      url: 'https://search.naver.com/search.naver?query=',
      icon: NaverIcon,
    },
    { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: BingIcon },
  ],
  selectedEngine: {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: GoogleIcon,
  },
  setSelectedEngine: (engine) => set({ selectedEngine: engine }),
}));
