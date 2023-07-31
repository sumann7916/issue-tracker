import { Form } from "@remix-run/react";
import {
  EditIssueActionType,
  IssueStatusTypeList,
} from "~/issue/types/issue.types";

export default function EditStatusForm() {
  return (
    <Form method="post">
      <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-700 font-semibold">Status:</label>
        <select
          className="border rounded-md py-2 px-3 text-gray-700"
          id="status"
          name="status"
        >
          {IssueStatusTypeList.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        name="action"
        value={EditIssueActionType.UPDATE_STATUS}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        OK
      </button>
    </Form>
  );
}
