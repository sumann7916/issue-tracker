import { IssueWithReporterAndAssignee } from "~/issue/types/issue.types";

const IssueCardDetails: React.FC<{ issue: IssueWithReporterAndAssignee }> = ({
  issue,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{issue.summary}</h2>
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
            {new Date(issue.created_at).toISOString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCardDetails;
