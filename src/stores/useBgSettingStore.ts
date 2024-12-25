'use client';
import { create } from 'zustand';

interface BgSettingState {
  isOpen: boolean;
  openBgSetting: () => void;
  closeBgSetting: () => void;
}

export const useBgSettingStore = create<BgSettingState>((set) => ({
  isOpen: false,
  openBgSetting: () => set({ isOpen: true }),
  closeBgSetting: () => set({ isOpen: false }),
}));
