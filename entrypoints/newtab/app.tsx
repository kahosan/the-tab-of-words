import { useSetAtom } from 'jotai';
import { useView } from './hooks/use-view';
import { wordsAtom } from './hooks/use-data';
import { useFetchWords } from './hooks/use-vocab';

import Header from './components/header';

import Home from './components/home';
import Settings from './components/settings';
import FadeContainer from './components/container/fade';

export default function App() {
  const [view] = useView();
  const setWords = useSetAtom(wordsAtom);

  const { data, error } = useFetchWords();

  const loading = !data && !error;

  useEffect(() => {
    if (data) setWords(data);
  }, [data, setWords]);

  return (
    <>
      <FadeContainer show={loading}>
        <code className="absolute-center">Initializing...</code>
      </FadeContainer>
      <FadeContainer show={!!error}>
        <code className="text-base absolute-center">
          :(
          <br />
          Something wrong happened
          <br />
          Try to fresh the page
        </code>
      </FadeContainer>
      <FadeContainer show={!!data}>
        <Header />
        <FadeContainer show={view === 'home'}>
          <Home />
        </FadeContainer>
        <FadeContainer show={view === 'settings'} key={view}>
          <Settings />
        </FadeContainer>
      </FadeContainer>
    </>
  );
}
