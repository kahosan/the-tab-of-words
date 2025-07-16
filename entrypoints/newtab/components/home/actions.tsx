import { SpeakerWaveIcon, MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import LevelBadge from '../badge/level';
import { IconButton } from '../buttons/icon';

import { getDictionaryUrl } from '../../hooks/use-vocab';

import type { Word } from '../../types';
import { useSetAtom } from 'jotai';
import { playAtom } from '../../hooks/use-audio';

interface WordActionsProps {
  word: Word
  del?: boolean
  next: () => void
}

export default function WordActions({ word, next }: WordActionsProps) {
  // const { addLearned, removeLearned } = useData()
  const setPlay = useSetAtom(playAtom);
  const dictUrl = getDictionaryUrl(word.word);

  return (
    <div className="flex items-center justify-center gap-6">
      <LevelBadge level={word.level} />
      {/* {!del && <IconButton size={size} icon={CheckIcon} onClick={learn} />} */}
      <IconButton icon={SpeakerWaveIcon} onClick={() => { setPlay(p => !p); }} />
      <IconButton as="a" icon={MagnifyingGlassIcon} href={dictUrl} target="_blank" />
      <IconButton icon={ArrowRightIcon} onClick={next} />
      {/* {del && (
        <IconButton
          size={size}
          icon={XIcon}
          onClick={() => removeLearned(word.uuid)}
        />
      )} */}
    </div>
  );
}
