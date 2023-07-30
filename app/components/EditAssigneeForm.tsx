import { Form } from "@remix-run/react";
import React, { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { EditIssueActionType } from "~/issue/types/issue.types";

export default function EditAssigneeForm() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load("/resource/user");
    }
  }, [fetcher]);

  return (
    <Form method="post">
      <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-700 font-semibold">Assignee:</label>
        {fetcher.data && (
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="assignee_id"
            name="assignee_id"
          >
            {fetcher.data.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        )}
        <button
          type="submit"
          name="action"
          value={EditIssueActionType.UPDATE_ASSIGNEE}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          OK
        </button>
      </div>
    </Form>
  );
}
