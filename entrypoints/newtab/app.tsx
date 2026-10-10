import { useView } from './hooks/use-view';
import { useFetchWords } from './hooks/use-vocab';

import Header from './components/header';

import Home from './components/home';
import Settings from './components/settings';
import FadeContainer from './components/container/fade';

export default function App() {
  const [view] = useView();
  const { data, error } = useFetchWords();

  const loading = !data && !error;

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
      </FadeContainer>
      <FadeContainer show={view === 'settings'} key={view}>
        <Settings />
      </FadeContainer>
    </>
  );
}
