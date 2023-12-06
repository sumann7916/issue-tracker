import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitOptions, useSubmit } from "@remix-run/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ZodObject, z } from "zod";

type ZodFormGeneratorType<T extends ZodObject<any>> = {
  schema: T;
  fields: Record<keyof T["shape"], SchemaField>;
};

type SchemaField = {
  label?: string;
  placeholder?: string;
  description?: string;
  inputType?: string;
  defaultValue?: string;
  //component to render after specific field input
  component?: React.Component;
};

interface ZodFormGeneratorProps<T extends ZodObject<any>> {
  schema: T;
  fields: Record<keyof T["shape"], SchemaField> & {
    submitButton?: SchemaField;
  };
  method: SubmitOptions["method"];
}

export const ZodFormGenerator = <T extends ZodObject<any>>({
  schema,
  fields,
  method,
}: ZodFormGeneratorProps<T>) => {
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
    submit(data, { method: "post", encType: "application/json" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Your form fields and components go here */}
    </form>
  );
};
const validationSchema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required" }),
});

const generatedForm = ZodFormGenerator({
  schema: validationSchema,
  fields: { firstName: {} },
  method: "post",
});
