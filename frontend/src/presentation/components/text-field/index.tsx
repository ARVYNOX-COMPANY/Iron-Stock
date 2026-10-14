import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const TextField = ({
  id,
  label,
  error,
  className = "",
  ...props
}: TextFieldProps) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label htmlFor={id} className="text-sm font-medium text-primary">
      {label}
    </label>
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`rounded-[10px] border px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-100"
          : "border-gray-300 focus:border-button-primary focus:ring-blue-100"
      }`}
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="text-xs text-red-600">
        {error}
      </p>
    )}
  </div>
);

export default TextField;
