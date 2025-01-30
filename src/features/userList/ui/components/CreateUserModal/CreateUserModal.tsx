import { Modal } from "antd";
import type { ICreateUserModal } from "./CreateUserModal.types";

const CreateUserModal = ({ isOpen, onClose }: ICreateUserModal) => {
	return (
		<Modal
			title="Добавить пользователя"
			open={isOpen}
			onCancel={onClose}
		>
			
		</Modal>
	);
};

export default CreateUserModal;
