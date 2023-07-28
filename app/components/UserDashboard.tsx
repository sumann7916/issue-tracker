import { UserIdAndUsername } from "~/users/types/UserDetail";
import CreateIssueForm from "./CreateIssueForm";
import UserNavbar from "./UserNavbar";

const UserDashboard = ({ userList }: { userList: UserIdAndUsername[] }) => {
  return (
    <>
      <UserNavbar />
      <CreateIssueForm userList={userList} />
    </>
  );
};

export default UserDashboard;
