import { useEffect, useRef } from "react";
import { Modal } from "./Modal";
import AddUserForm from "./AddUserForm";

export default function AddUserModal() {
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
  return (
    <Modal>
      <AddUserForm />
    </Modal>
  );
}
