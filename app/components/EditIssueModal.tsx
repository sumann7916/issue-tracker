import { FC, useEffect, useRef } from "react";
import { FormSelect } from "./FormSelect";
import { IssueStatusTypeList } from "~/issue/types/issue.types";
import { useFetcher } from "react-router-dom";
import { SubmitButton } from "./SubmitButton";
import { ValidatedForm } from "remix-validated-form";
import { signinClientValidator } from "~/auth/validators/signin.validator";

interface EditIssueModalProps {
  isReporter: boolean;
  isAssignee: boolean;
}
export const EditIssueModal: FC<EditIssueModalProps> = ({
  isReporter,
  isAssignee,
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load("/resource/user");
    }
  }, [fetcher]);

  useEffect(() => {
    let current = ref.current;
    if (current) {
      current.showModal();
    }
    return () => {
      if (current) current.close();
    };
  }, []);

  return (
    <ValidatedForm validator={signinClientValidator}>
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
            <FormSelect
              name="assignee"
              label="Assignee"
              options={fetcher.data}
            />
          )}
          <SubmitButton />
        </div>
      </div>
    </ValidatedForm>
  );
};
