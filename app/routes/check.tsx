import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmit } from "@remix-run/react";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { generateFormFromZod } from "~/components/ZodForm";

export async function action({ request }: ActionArgs) {
  console.log(request.json());
  return null;
}

export async function loader({ request }: LoaderArgs) {
  return null;
}

const validationSchema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  email: z.string().min(1, { message: "Email .bodyis required" }).email({
    message: "Must be a valid email",
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const Form = () => {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    submit(data, { method: "post", encType: "application/json" });
  };

  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
  
      <div className="mb-4">
        <div>
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.firstName && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="firstName"
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.firstName?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div>
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.lastName && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.lastName?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div>
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.email && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register Account
        </button>
      </div>
      <hr className="mb-6 border-t" />
      <div className="text-center">
        <a
          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          href="#test"
        >
          Forgot Password?
        </a>
      </div>
      <div className="text-center">
        <a
          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          href="./index.html"
        >
          Already have an account? Login!
        </a>
      </div>
    </form>
  );
};

export default Form;
