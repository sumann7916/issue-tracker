import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "@prisma/internals/dist/logger";
import { useSubmit } from "@remix-run/react";
import {
  FieldErrors,
  RegisterOptions,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { z } from "zod";

export const generateFormFromZod: functionType = (
  schema: z.ZodObject<any>,
  fields: FieldsType[]
) => {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    console.log("called");
    submit(data, { method: "POST", encType: "application/json" });
  };
  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 md:flex md:justify-between">
        {fields.map((field) => generateTextFormInput(field, errors, register))}
      </div>
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

type functionType = (schema: z.ZodObject<any>, fields: FieldsType[]) => any;

export type FieldsType = {
  fieldKey: string;
  fieldLabel: string;
  fieldInputType: fieldInputType;
  fieldPlaceHolder?: string;
  fieldDescription?: string;
};

export type fieldInputType = "text" | "password" | "number" | "textArea";

const generateTextFormInput = (
  //Need to work more for covering more input types
  inputInfo: FieldsType,
  errors: FieldErrors,
  register: UseFormRegister<any>
) => {
  return (
    <div key={inputInfo.fieldKey.toString()}>
      <label
        className="block mb-2 text-sm font-bold text-gray-700"
        htmlFor={inputInfo.fieldKey}
      >
        {inputInfo.fieldLabel}
      </label>
      <input
        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
          errors[inputInfo.fieldKey] && "border-red-500"
        } rounded appearance-none focus:outline-none focus:shadow-outline`}
        type={inputInfo.fieldInputType}
        placeholder={inputInfo.fieldPlaceHolder}
        {...register(inputInfo.fieldKey)}
      />
      {errors[inputInfo.fieldKey] && (
        <p className="text-xs italic text-red-500 mt-2">//TODO fix later</p>
      )}
    </div>
  );
};
