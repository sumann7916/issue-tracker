import { useFormContext, useIsSubmitting } from "remix-validated-form";

export const SubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-700"
      } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};
