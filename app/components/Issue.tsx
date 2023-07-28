import { useNavigate } from "@remix-run/react";
import React from "react";
import { IssueWithReporterAndAssignee } from "~/issue/types/issue.types";

type IssueProps = {
  issue: IssueWithReporterAndAssignee;
};

const IssueComponent: React.FC<IssueProps> = ({ issue }) => {
  const navigate = useNavigate();
  const handleIssueClick = () => {
    const { id } = issue;
    navigate(`/userdash/issues/${id}`);
  };
  return (
    <tr key={issue.id} onClick={handleIssueClick} style={{ cursor: "pointer" }}>
      <td className="px-6 py-4 whitespace-nowrap">{issue.summary}</td>
      <td className="px-6 py-4 whitespace-nowrap">{issue.status}</td>
      <td className="px-6 py-4 whitespace-nowrap">{issue.reporter}</td>
      <td className="px-6 py-4 whitespace-nowrap">{issue.assignee}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(issue.created_at).toISOString()}
      </td>
    </tr>
  );
};

export default IssueComponent;
