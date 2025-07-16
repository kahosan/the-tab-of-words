import { atom, useAtom } from 'jotai';

export const playAtom = atom(false);

export const useAudio = () => useAtom(playAtom);
