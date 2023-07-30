import { FC, useEffect, useRef } from "react";
import { Modal } from "./Modal";
import EditAssigneeForm from "./EditAssigneeForm";
import EditIssueForm from "./EditIssueForm";
import EditStatusForm from "./EditStatusForm";

interface EditIssueModalProps {
  editStatus: boolean;
}
export const EditIssueModal: FC<EditIssueModalProps> = ({ editStatus }) => {
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
    <Modal>{editStatus ? <EditStatusForm /> : <EditAssigneeForm />}</Modal>
  );
};
