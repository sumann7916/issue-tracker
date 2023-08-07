import { useNavigate } from "@remix-run/react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center"></div>
      <div>
        <button
          className="mr-4"
          onClick={() => {
            navigate("/logout");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default AdminNavbar;
