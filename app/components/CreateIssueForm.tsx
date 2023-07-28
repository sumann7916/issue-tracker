import { Form } from "@remix-run/react";
import { UserIdAndUsername } from "~/users/types/UserDetail";

export const CreateIssueForm = ({
  userList,
}: {
  userList: UserIdAndUsername[];
}) => {
  return (
    <Form method="post">
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="summary"
            >
              Summary
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="summary"
              name="summary"
              placeholder="Enter Issue Summary"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              placeholder="Enter Issue Description"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="assignee_id"
            >
              Assignee
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="assignee_id"
              name="assignee_id"
            >
              {userList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Issue
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateIssueForm;
