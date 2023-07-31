import { FC, useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { Form, useNavigate } from "@remix-run/react";

export const IssueDeleteModal = () => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let current = ref.current;
    if (current) {
      current.showModal();
    }
    return () => {
      if (current) current.close();
    };
  }, []);
  const navigate = useNavigate();
  return (
    <Modal>
      <Form method="post">
        <div className="flex items-center mb-4">
          <label className="mr-2 text-gray-700 font-semibold">
            Are you Sure
          </label>
          <button
            type="submit"
            name="action"
            value="delete"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Yes
          </button>

          <button
            onClick={() => ref.current?.close()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            No
          </button>
        </div>
      </Form>
    </Modal>
  );
};
