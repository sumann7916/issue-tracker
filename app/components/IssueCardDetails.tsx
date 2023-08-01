import { useNavigate, useSearchParams } from "@remix-run/react";
import React from "react";
import { IssueWithReporterAndAssignee } from "~/issue/types/issue.types";
import { IssueDeleteModal } from "./IssueDeleteModal";

const IssueCardDetails: React.FC<{
  issue: IssueWithReporterAndAssignee;
  user_id: string;
}> = ({ issue, user_id }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        {searchParams.get("delete_issue") && <IssueDeleteModal />}

        <h2 className="text-xl font-semibold">{issue.summary}</h2>
        <div className="flex space-x-2">
          <button
            className="text-blue-500 font-semibold"
            onClick={() => {
              navigate("edit");
            }}
          >
            Edit
          </button>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              navigate("?delete_issue=true");
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{issue.description}</p>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="mr-2 text-gray-500 font-semibold">Status:</div>
          <div className="text-blue-500">{issue.status}</div>
        </div>
        <div className="flex items-center">
          <div className="mr-2 text-gray-500 font-semibold">Reporter:</div>
          <div className="text-blue-500">{issue.reporter}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 text-gray-500 font-semibold">Assignee:</div>
          <div className="text-blue-500">{issue.assignee}</div>
        </div>
        <div className="flex items-center">
          <div className="mr-2 text-gray-500 font-semibold">Created At:</div>
          <div className="text-blue-500">
            {new Date(issue.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCardDetails;
