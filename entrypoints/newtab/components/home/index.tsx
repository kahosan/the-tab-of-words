import { useRandomWord } from '../../hooks/use-data';
import { MotionEffect } from '../animate-ui/effects/motion-effect';
import Audio from '../audio';

import Furigana from '../furigana';
import WordActions from './actions';

export default function Home() {
  const { randomWord, next } = useRandomWord();

  if (!randomWord) {
    return (
      <code className="text-base absolute left-2/3 top-1/3 w-[80vw] translate-x-[-50%] translate-y-[-60%]">
        :)
        <br />
        You met all the words
        <br />
        Change the Level or Mode to see more words
      </code>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 w-[80vw] translate-x-[-50%] translate-y-[-60%] text-center text-base md:text-xl">
      <MotionEffect fade key={randomWord.word}>
        <Furigana word={randomWord} />
        <h1 className="my-8 font-serif font-bold text-[calc(24px+5vw)] leading-none">
          {randomWord.word}
        </h1>
        <p>{randomWord.meaning}</p>
      </MotionEffect>
      <div className="mt-12">
        <WordActions word={randomWord} next={next} />
      </div>
      <Audio content={randomWord.furigana} />
    </div>
  );
}
