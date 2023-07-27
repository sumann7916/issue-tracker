import { UserDetail } from "~/types/UserDetail";
import UserList from "./UserList";
import { useSearchParams } from "@remix-run/react";
import AddUserModal from "./AddUserModal";

const AdminDashboard = ({ userList }: { userList: UserDetail[] }) => {
  const [searchParams] = useSearchParams();
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <UserList userList={userList} />
      {searchParams.get("add_user") && <AddUserModal />}
    </div>
  );
};

export default AdminDashboard;
