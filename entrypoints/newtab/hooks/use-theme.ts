import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { KEY } from './use-settings';

export type Theme = 'sunset' | 'sunrise' | 'moon';

const themeAtom = atomWithStorage<Theme>(`${KEY}-theme`, 'sunrise');

export const useTheme = () => useAtom(themeAtom);
