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
        <button className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6 0v2m-4-2v2m0 8a7 7 0 01-3.784-6.248c-.019-.272-.032-.544-.032-.822C7.184 5.667 9.885 3 12 3c2.115 0 4.816 2.667 4.816 5.93 0 .278-.013.55-.032.822A7 7 0 0112 19z"
            />
          </svg>
        </button>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default UserNavbar;
