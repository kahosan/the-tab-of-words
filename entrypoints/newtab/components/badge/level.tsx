import type { Level } from '../../types';

interface LevelBadgeProps {
  level: Level
}

export default function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <div className="py-[5px] px-[10px] text-[14px] w-10 select-none rounded-[3px] text-center font-medium leading-none text-[var(--level-fg)] bg-[var(--level-bg)]">
      N{level}
    </div>
  );
}
