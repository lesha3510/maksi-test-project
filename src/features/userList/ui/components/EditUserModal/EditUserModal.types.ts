import { User } from "@/entities/user/model/userSlice";

export interface IEditUserModal {
	user: User;
	isOpen: boolean;
	onClose: () => void;
}
