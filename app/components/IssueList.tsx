import React from "react";
import { IssueWithReporterAndAssignee } from "~/issue/types/issue.types";
import IssueComponent from "./Issue";

type IssueListProps = {
  issueList: IssueWithReporterAndAssignee[];
};

const IssueList: React.FC<IssueListProps> = ({ issueList }) => {
  return (
    <div>
      <h2 className="text-2xl ml-4 mt-4 font-bold mb-4">Issue List</h2>
      <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reporter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Render each issue using the IssueComponent */}
            {issueList.map((issue) => (
              <IssueComponent key={issue.id} issue={issue} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueList;
