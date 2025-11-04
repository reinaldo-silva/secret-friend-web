interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: Readonly<IInputProps>) {
  return (
    <label className="flex flex-col">
      {label && <span className="mb-1">{label}</span>}
      <input
        {...props}
        aria-label={label}
        className="input p-2 rounded border border-zinc-300 focus:border-purple-500 outline-none transition duration-200"
      />
    </label>
  );
}
