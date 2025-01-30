import { UserTable } from "@/features/userList/ui/UserTable";
import Title from "antd/es/typography/Title";

import css from "./styles.module.scss";

export const UsersPage = () => {
	return (
		<div className={css.wrapper}>
			<Title className={css.title} level={1}>
				Список пользователей
			</Title>
			<UserTable />
		</div>
	);
};

export default UsersPage;
