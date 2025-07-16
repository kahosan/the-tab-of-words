import { useAtomValue } from 'jotai';
import { romajiAtom } from '../../hooks/use-settings';

import type { Word } from '../../types';

export default function Furigana({ word }: { word: Word }) {
  const { furigana, romaji } = word;
  const showRomaji = useAtomValue(romajiAtom);

  return (
    <div>
      {!furigana && !showRomaji && '　'}

      {furigana && <span>{furigana}</span>}

      {showRomaji && (
        <>
          {furigana && <span className="select-none"> ・ </span>}
          <span>{romaji}</span>
        </>
      )}
    </div>
  );
}
