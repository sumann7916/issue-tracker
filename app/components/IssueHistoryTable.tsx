import { IssueHistory } from "@prisma/client";
import IssueHistoryRow from "./IssueHistoryRow";

type IssueHistoryProps = {
  histories: IssueHistory[];
};
const IssueHistoryTable: React.FC<IssueHistoryProps> = ({ histories }) => {
  return (
    <div>
      <h1 className="mt-6 text-xl font-semibold mb-4">Issue History</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Modification Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <IssueHistoryRow key={history.id} history={history} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueHistoryTable;
