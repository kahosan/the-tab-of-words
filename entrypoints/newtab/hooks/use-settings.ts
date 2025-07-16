import { focusAtom } from 'jotai-optics';
import { atomWithStorage } from 'jotai/utils';

import type { Levels, Level, Settings } from '../types';

export const KEY = 'tab-of-words';

export const DEFAULT_LEVELS: Levels = ([1, 2, 3, 4, 5] as Level[]).reduce<Levels>(
  (pre, level) => [...pre, { level, enabled: true }],
  []
);

const DEFAULT_SETTINGS: Settings = {
  version: '0.0.1',
  mode: 'ichigoichie',
  romaji: false,
  levels: DEFAULT_LEVELS
};

export const settingsAtom = atomWithStorage<Settings>(
  `${KEY}-settings`,
  DEFAULT_SETTINGS
);

export const modeAtom = focusAtom(settingsAtom, optic => optic.prop('mode'));
export const levelsAtom = focusAtom(settingsAtom, optic => optic.prop('levels'));
export const romajiAtom = focusAtom(settingsAtom, optic => optic.prop('romaji'));
