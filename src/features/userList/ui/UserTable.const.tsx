import { User } from "@/entities/user/model/userSlice";
import { Avatar, Button, Dropdown, Menu, MenuProps } from "antd";
import { ColumnsType } from "antd/es/table";

import { EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

const handleEdit = (user: any) => {};
const handleDelete = (user: any) => {};

const items: MenuProps["items"] = [
	{
		key: "1",
		label: (
			<span onClick={() => handleEdit()}>
        Редактировать
      </span>
		),
	},
	{
		key: "2",
		label: (
			<span onClick={() => handleDelete()}>
        Удалить
      </span>
		),
	},
];

export const columns: ColumnsType<User> = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		sorter: (a: User, b: User) => a.id - b.id,
	},
	{
		title: "Avatar",
		dataIndex: "name",
		key: "avatar",
		render: (name: string) => <Avatar style={{ backgroundColor: "#87d068" }}>{name.charAt(0)}</Avatar>,
	},
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		sorter: (a: User, b: User) => a.name.localeCompare(b.name),
	},
	{
		title: "Username",
		dataIndex: "username",
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
		dataIndex: "zipcode",
		key: "zipcode",
		sorter: (a: User, b: User) => a.zipcode - b.zipcode,
	},
	{
		title: <SettingOutlined />,
		align: "center",
		render: (text: string, record: User) => (
			<Dropdown
				trigger={["click"]}
				menu={{ items }}
			>
				<div>
					<Button icon={<EllipsisOutlined />} />
				</div>
			</Dropdown>
		),
	},
];
