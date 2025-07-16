import { atom, useAtom } from 'jotai';

export type Views = 'home' | 'settings';
export const viewAtom = atom<Views>('home');

export function useView() {
  return useAtom(viewAtom);
}
