interface FormControlProps {
  label: string | React.ReactNode
  vertical?: boolean
  children: React.ReactNode
}

export default function FormControl({
  label,
  vertical,
  children
}: FormControlProps) {
  return (
    <div
      className={`${
        vertical ? 'flex-col-reverse items-start' : 'items-center'
      } mb-4 flex select-none last:mb-0 w-max`}
    >
      <div className="mb-auto leading-none">{children}</div>
      <div className="ml-2">{label}</div>
    </div>
  );
}
