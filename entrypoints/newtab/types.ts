export type Level = 1 | 2 | 3 | 4 | 5;
export type Levels = Array<{ level: Level, enabled: boolean }>;

export interface Word {
  word: string
  meaning: string
  furigana: string
  romaji: string
  level: Level
}

export type Mode = 'ichigoichie' | 'random';

export interface Settings {
  version: string
  mode: Mode
  levels: Levels
  romaji: boolean
}
