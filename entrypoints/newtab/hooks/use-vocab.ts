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
  const [data, setData] = useState<Word[] | null>(null);
  const [error, setError] = useState();
  const cacheRef = useRef<Cache | null>(null);

  useEffect(() => {
    const getData = async () => {
      cacheRef.current = await caches.open('tab-of-words');
      let res: Response | undefined;
      res = await cacheRef.current.match(api);
      if (res) {
        setData(await res.json());
        return;
      }

      await cacheRef.current.add(api);
      res = await cacheRef.current.match(api);
      if (res) setData(await res.json());
    };
    getData().catch(e => setError(e));
  }, [api]);

  return { data, error };
}
