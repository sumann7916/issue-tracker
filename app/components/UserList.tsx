import { UserDetail } from "~/users/types/UserDetail";

const UserList = ({ userList }: { userList: UserDetail[] }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">#</th>
            <th className="text-left px-4 py-2">Full Name</th>
            <th className="text-left px-4 py-2">Username</th>
            <th className="text-left px-4 py-2">User Type</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="text-left px-4 py-2">{index + 1}</td>
              <td className="text-left px-4 py-2">{user.full_name}</td>
              <td className="text-left px-4 py-2">{user.username}</td>
              <td className="text-left px-4 py-2">{user.user_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
