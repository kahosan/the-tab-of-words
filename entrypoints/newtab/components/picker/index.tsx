import { CheckIcon } from '@heroicons/react/24/solid';

interface PickerProps {
  label: string
  picked: boolean
  disabled: boolean
  onClick: (picked: boolean) => void
}

export default function Picker({
  disabled,
  label,
  picked,
  onClick
}: PickerProps) {
  return (
    <button
      type="button"
      className={`${
        picked ? 'bg-[var(--picked-bg)]' : 'bg-[var(--picked-n-bg)]'
      } ${disabled ? 'cursor-not-allowed' : ''}
      flex select-none items-center rounded-full py-1 pl-2 pr-3 text-sm font-medium leading-none transition-colors text-white`}
      onClick={() => !disabled && onClick(!picked)}
    >
      <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full border-stone-200 bg-white">
        <CheckIcon className={`${picked ? 'text-black' : 'text-white'} h-3 w-3`} />
      </div>
      {label}
    </button>
  );
}
