import { User, deleteUsers } from "@/entities/user/model/userSlice";
import { Avatar, Button, Dropdown, MenuProps, Modal, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/providers/store";
import { useState } from "react";
import EditUserModal from "./components/EditUserModal/EditUserModal";

const UserActions = ({ user }: { user: User }) => {
	const dispatch = useDispatch<AppDispatch>();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const handleDelete = () => {
		dispatch(deleteUsers([user.id]));
		setIsDeleteModalOpen(false);
	};

	// Обработчики модалки
	const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
	const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

	const handleOpenEditeModal = () => setIsEditModalOpen(true);
	const handleCloseEditeModal = () => setIsEditModalOpen(false);

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: <span onClick={handleOpenEditeModal}>Редактировать</span>,
		},
		{
			key: "2",
			label: <span onClick={handleOpenDeleteModal}>Удалить</span>,
		},
	];

	return (
		<>
			<Dropdown trigger={["click"]} menu={{ items }}>
				<Button icon={<EllipsisOutlined />} />
			</Dropdown>
			<Modal title="Подтверждение удаления" open={isDeleteModalOpen} onOk={handleDelete} onCancel={handleCloseDeleteModal} okText="Да" cancelText="Нет">
				<Typography>Вы уверены, что хотите удалить этого пользователя?</Typography>
			</Modal>
			<EditUserModal user={user} isOpen={isEditModalOpen} onClose={handleCloseEditeModal} />
		</>
	);
};

export const columns: ColumnsType<User> = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		sorter: (a: User, b: User) => a.id - b.id,
		width: 80,
		ellipsis: true,
		align: "center",
	},
	{
		title: "Avatar",
		dataIndex: "name",
		key: "avatar",
		render: (name: string) => <Avatar style={{ backgroundColor: "#87d068" }}>{name.charAt(0)}</Avatar>,
		width: 80,
		align: "center",
	},
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		sorter: (a: User, b: User) => a.name.localeCompare(b.name),
	},
	{
		title: "Username",
		dataIndex: "userName",
		key: "username",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Phone",
		dataIndex: "phone",
		key: "phone",
	},
	{
		title: "Zipcode",
		dataIndex: "zipCode",
		key: "zipcode",
		sorter: (a: User, b: User) => {
			return parseInt(a.zipCode, 10) - parseInt(b.zipCode, 10);
		},
	},
	{
		title: <SettingOutlined />,
		align: "center",
		width: 80,
		render: (_, record: User) => <UserActions user={record} />,
	},
];
