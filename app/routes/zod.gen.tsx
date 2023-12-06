import React from "react";
import { z } from "zod";
import { FieldsType, generateFormFromZod } from "~/components/ZodForm";
import { ZodFormGenerator } from "~/lib/form-generator";

const validationSchema = z.object({
  firstName: z.string().min(10, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  email: z.string().min(1, { message: "Email .bodyis required" }).email({
    message: "Must be a valid email",
  }),
});

const fields: FieldsType[] = [
  {
    fieldKey: "firstName",
    fieldInputType: "text",
    fieldDescription: "This is your First Name",
    fieldPlaceHolder: "First Name",
    fieldLabel: "First Name",
  },
];
const GenerateForm = () => {
  const validationSchema = z.object({
    firstName: z.string().min(1, { message: "Firstname is required" }),
  });
  return ZodFormGenerator({
    schema: validationSchema,
    fields: { firstName: {} },
    method: "post",
  });
};

export default GenerateForm;
