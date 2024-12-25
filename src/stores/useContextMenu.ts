'use client';
import { create } from 'zustand';

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
  openMenu: (x: number, y: number) => void;
  closeMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  isOpen: false,
  position: { x: 0, y: 0 },

  openMenu: (x, y) =>
    set({
      isOpen: true,
      position: { x, y },
    }),

  closeMenu: () =>
    set({
      isOpen: false,
    }),
}));
