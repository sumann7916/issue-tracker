import { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { IssueStatusTypeList } from "~/issue/types/issue.types";
import { FormSelect } from "./FormSelect";
import { SubmitButton } from "./SubmitButton";
import { updateIssueClientValidator } from "~/issue/validators/issue.validator";

type EditIssueFormProps = {
  isAssignee: boolean;
  isReporter: boolean;
  userList: string[];
};
export const EditIssueForm: FC<EditIssueFormProps> = ({
  isReporter,
  isAssignee,
  userList,
}) => {
  return (
    <ValidatedForm validator={updateIssueClientValidator} method="post">
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4">
          {isAssignee && (
            <FormSelect
              name="status"
              label="Status"
              options={IssueStatusTypeList}
            />
          )}
          {isReporter && (
            <FormSelect name="assignee" label="Assignee" options={userList} />
          )}
          <SubmitButton />
        </div>
      </div>
    </ValidatedForm>
  );
};

export default EditIssueForm;
