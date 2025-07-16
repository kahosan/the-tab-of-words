import { useView } from '../../hooks/use-view';

import { IconButton } from '../buttons/icon';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

export default function Header() {
  const [view, setView] = useView();
  return (
    <nav className="fixed right-[10vw] top-12 flex space-x-5 md:right-16">
      {view !== 'home' && (
        <IconButton icon={ArrowLeftIcon} onClick={() => setView('home')} />
      )}
      <IconButton
        active={view === 'settings'}
        icon={Cog8ToothIcon}
        className=""
        onClick={() => setView('settings')}
      />
    </nav>
  );
}
