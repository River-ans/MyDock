import { create } from 'zustand';

interface Favorite {
  name: string;
  url: string;
}

interface FavoritesState {
  favorites: Favorite[];
  showForm: boolean;
  setShowForm: (value: boolean) => void;
  addFavorite: (favorite: Favorite) => void;
  loadFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  showForm: false,
  setShowForm: (value) => set({ showForm: value }),
  addFavorite: (favorite) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, favorite];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // 로컬스토리지 업데이트
      return { favorites: updatedFavorites };
    });
  },
  loadFavorites: () => {
    const storedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    set({ favorites: storedFavorites });
  },
}));
