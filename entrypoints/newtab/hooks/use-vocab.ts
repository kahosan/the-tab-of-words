import { useSetAtom } from 'jotai';
import { wordsAtom } from './use-data';
import { useEffect } from 'foxact/use-abortable-effect';
import useSWRImmutable from 'swr/immutable';

import fetcher from '../lib/fetcher';
import type { Word } from '../types';

const API_ENDPOINT = 'https://jlpt-vocab-api.vercel.app/api';

export function useFetchRandomWord() {
  const { data, error } = useSWRImmutable<Word>(
    `${API_ENDPOINT}/words/random`,
    fetcher
  );
  return { data, error };
}

export function getDictionaryUrl(content: string) {
  const jisho = 'https://jisho.org/search/';

  return `${jisho}${content}`;
}

export function getAudioUrl(content: string) {
  // const naver = 'https://ja.dict.naver.com/api/nvoice?speaker=yuri&service=dictionary&speech_fmt=mp3&text='
  const youdao = 'https://dict.youdao.com/dictvoice?le=jap&audio=';

  return `${youdao}${content}`;
}

export function useFetchWords() {
  const api = `${API_ENDPOINT}/words/all`;
  const setWords = useSetAtom(wordsAtom);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<Word[] | null>(null);

  useEffect(
    signal => {
      const getData = async () => {
        const cache = await caches.open('tab-of-words');
        let res = await cache.match(api);

        if (!res) {
          const fetched = await fetch(api, { signal });
          if (!fetched.ok) throw new Error(`Request failed: ${fetched.status}`);
          await cache.put(api, fetched.clone());
          res = fetched;
        }

        const words: Word[] = await res.json();
        if (signal.aborted) return;

        setData(words);
        setWords(words);
      };

      getData().catch(e => {
        if (signal.aborted) return;
        setError(e);
      });
    },
    [api, setWords]
  );

  return { data, error };
}
