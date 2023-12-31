import { IssueHistory } from "@prisma/client";
import React from "react";

type IssueHistoryRowProps = {
  history: IssueHistory;
};

const IssueHistoryRow: React.FC<IssueHistoryRowProps> = ({ history }) => {
  return (
    <tr key={history.id}>
      <td className="px-6 py-4 whitespace-nowrap font-semibold">
        {history.modification_type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{history.change_details}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(history.created_at).toLocaleString()}
      </td>
    </tr>
  );
};

export default IssueHistoryRow;
