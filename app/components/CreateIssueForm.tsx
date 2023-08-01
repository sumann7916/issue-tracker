import { ValidatedForm } from "remix-validated-form";
import { createIssueClientValidator } from "~/issue/validators/issue.validator";
import { FormInput } from "./FormInput";
import { SubmitButton } from "./SubmitButton";
import { FormSelect } from "./FormSelect";

export const CreateIssueForm = ({ userList }: { userList: string[] }) => {
  return (
    <ValidatedForm validator={createIssueClientValidator} method="post">
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4">
          <FormInput name="summary" label="Summary" />
          <FormInput name="description" label="Description" />
          <FormSelect label="Assignee" name="assignee" options={userList} />
          <SubmitButton />
        </div>
      </div>
    </ValidatedForm>
  );
};

export default CreateIssueForm;
