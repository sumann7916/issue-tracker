import { ValidatedForm } from "remix-validated-form";
import { userTypeList } from "~/users/types/user-type";
import { addUserClientValidator } from "~/users/validators/add-user.validator";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { SubmitButton } from "./SubmitButton";

export default function AddUserForm() {
  return (
    <ValidatedForm validator={addUserClientValidator} method="post">
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4">
          <FormInput name="username" label="username" />
          <FormInput name="full_name" label="Full Name" />
          <FormInput name="password" label="password" type="password" />
          <FormInput
            name="confirm_password"
            label="Confirm Password"
            type="password"
          />
          <FormSelect
            label="User Type"
            name="user_type"
            options={userTypeList}
          />
          <SubmitButton />
        </div>
      </div>
    </ValidatedForm>
  );
}
