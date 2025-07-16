import { useAtom } from 'jotai';

import {
  levelsAtom,
  modeAtom,
  romajiAtom
} from '../../hooks/use-settings';
import { useTheme } from '../../hooks/use-theme.ts';
import type { Theme } from '../../hooks/use-theme.ts';
import { metAtom, useData } from '../../hooks/use-data.ts';

import Radio from '../radio';
import Picker from '../picker';
import Checkbox from '../checkbox';
import Container from '../container';
import FormControl from '../form-control';

import type { Mode } from '../../types.ts';

function FormSection({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-y-6 py-12 md:grid-cols-[140px_1fr]">
      <h2 className="justify-self-start text-xl font-semibold leading-6">
        {title}
      </h2>
      <div className="flex flex-col justify-center">{children}</div>
    </section>
  );
}

function ModeSwitcher() {
  const [metWords, setMetWords] = useAtom(metAtom);
  const [mode, setMode] = useAtom(modeAtom);

  const handleChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newMode = e.target.value as Mode;
      if (newMode === 'ichigoichie' && metWords.length) {
        const confirmed = confirm('Do you want to reset the data of previous Ichigo Ichie?');
        if (confirmed)
          setMetWords([]);
      }
      setMode(newMode);
    }
  };

  const handleReset = () => {
    const confirmed = confirm('Do you want to reset the data of Ichigo Ichie?');
    if (confirmed)
      setMetWords([]);
  };

  return (
    <FormSection title="Mode">
      <FormControl
        label={
          <>
            <span>Ichigo Ichie</span>
            <div className="col-start-2 flex justify-between items-baseline opacity-75">
              <span>
                Words only appear once. (
                <ruby>
                  一<rp>(</rp>
                  <rt>いち</rt>
                  <rp>)</rp>期<rp>(</rp>
                  <rt>ご</rt>
                  <rp>)</rp>一<rp>(</rp>
                  <rt>いち</rt>
                  <rp>)</rp>会<rp>(</rp>
                  <rt>え</rt>
                  <rp>)</rp>
                </ruby>
                )
              </span>
              {mode === 'ichigoichie' && (
                <button
                  type="button"
                  className="cursor-pointer underline ml-2"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </div>
          </>
        }
      >
        <Radio
          name="mode"
          value="ichigoichie"
          target={mode}
          onChange={handleChangeMode}
        />
      </FormControl>
      <FormControl
        label={
          <>
            <div>Random</div>
            <div className="col-start-2 opacity-75">
              Words appear randomly, except for the learned words.
            </div>
          </>
        }
      >
        <Radio
          name="mode"
          value="random"
          target={mode}
          onChange={handleChangeMode}
        />
      </FormControl>
    </FormSection>
  );
}

function Levels() {
  const [levels] = useAtom(levelsAtom);
  const { switchLevel } = useData();
  const countEnabledLevels = levels.filter(({ enabled }) => enabled).length;

  return (
    <FormSection title="Levels">
      <div className="mb-2 flex flex-wrap items-start gap-4">
        {levels.map(level => (
          <Picker
            key={level.level}
            disabled={level.enabled && countEnabledLevels === 1}
            label={`N${level.level}`}
            picked={level.enabled}
            onClick={() => switchLevel(level.level)}
          />
        ))}
      </div>
      <div className="col-start-2 opacity-75">
        Only words of selected levels appear.
      </div>
    </FormSection>
  );
}

function Options() {
  const [romaji, setRomaji] = useAtom(romajiAtom);

  return (
    <FormSection title="Options">
      <FormControl label="Romaji">
        <Checkbox checked={romaji} onChange={setRomaji} />
      </FormControl>
    </FormSection>
  );
}

function Info() {
  const links = [
    // ['Product Page', ''],
    ['Source Code', 'https://github.com/wkei/the-tab-of-words/tree/main'],
    [
      'Data Source',
      'https://github.com/wkei/jlpt-vocab-api/tree/main/data-source'
    ],
    ['Author', 'https://keibungen.com/']
  ];
  return (
    <FormSection title="About">
      <ul className="list-disc">
        {links.map(([label, href]) => (
          <li className="mb-1 last:mb-0" key={href}>
            <a className="link" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </FormSection>
  );
}

export function Theme() {
  const [theme, setTheme] = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const theme = e.target.value as Theme;
      setTheme(theme);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('sunset', 'sunrise', 'moon');
    root.classList.add(theme);
  }, [theme]);

  return (
    <FormSection title="Theme">
      <FormControl label="日">
        <Radio
          name="sunrise"
          value="sunrise"
          target={theme}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl label="夕">
        <Radio
          name="sunset"
          value="sunset"
          target={theme}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl label="月">
        <Radio
          name="moon"
          value="moon"
          target={theme}
          onChange={handleChange}
        />
      </FormControl>
    </FormSection>
  );
}

export default function Settings() {
  return (
    <Container>
      <h1 className="mb-12 text-3xl font-semibold">Settings</h1>
      <div className="divide-y">
        <ModeSwitcher />
        <Levels />
        <Options />
        <Theme />
        <Info />
      </div>
    </Container>
  );
}
