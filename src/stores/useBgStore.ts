// /stores/useBgStore.ts
'use client';
import { create } from 'zustand';

interface BgState {
  bgUrl: string;
  fileName: string;
  setBgUrl: (url: string) => void;
  setFileName: (name: string) => void;
}

export const useBgStore = create<BgState>((set) => ({
  bgUrl: '',
  fileName: '',
  setBgUrl: (url: string) => set({ bgUrl: url }),
  setFileName: (name: string) => set({ fileName: name }),
}));
