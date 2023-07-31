import UserList from "./UserList";
import { useNavigate, useSearchParams } from "@remix-run/react";
import AddUserModal from "./AddUserModal";
import { UserDetail } from "~/users/types/UserDetail";

const AdminDashboard = ({ userList }: { userList: UserDetail[] }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 text-center">
      <UserList userList={userList} />
      <button
        className="bg-blue-500 mt-3  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => navigate("/admindashboard/add-user")}
      >
        Add User
      </button>
    </div>
  );
};

export default AdminDashboard;
