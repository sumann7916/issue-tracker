import { useField } from "remix-validated-form";

type InputProps = {
  name: string;
  label: string;
  type?: string;
};

export const FormInput = ({ name, label, type = "text" }: InputProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        {...getInputProps({ id: name })}
        placeholder={`Enter ${name}`}
        type={type}
        className={`${
          error ? "border-red-500" : "border-gray-300"
        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </div>
  );
};
