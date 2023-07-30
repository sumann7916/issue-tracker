import { useNavigate } from "@remix-run/react";

const UserNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button
          className="mr-4"
          onClick={() => {
            navigate("/userdash");
          }}
        >
          Add Issue
        </button>
        <button
          className="mr-4"
          onClick={() => {
            navigate("/userdash/issues/assigned");
          }}
        >
          Assigned Issues
        </button>

        <button
          className="mr-4"
          onClick={() => {
            navigate("/userdash/issues/reported");
          }}
        >
          Reported Issues
        </button>
      </div>
      <div className="flex items-center">
        <button>Logout</button>
      </div>
    </div>
  );
};

export default UserNavbar;
