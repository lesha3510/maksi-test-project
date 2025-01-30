"use client";

import { useEffect, useState } from "react";
import { Table, Button, Space, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/entities/user/model/userSlice";
import { RootState, AppDispatch } from "@/app/providers/store";
import axios from "axios";
import { debounce } from "lodash";

import css from "./styles.module.scss";
import CreateUserModal from "./components/CreateUserModal/CreateUserModal";
import { columns } from "./UserTable.const";

export const UserTable = () => {
	// Redux
	const dispatch = useDispatch<AppDispatch>();
	const { users, loading } = useSelector((state: RootState) => state.users);

	// Для выбора строк
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	// Для модального окна
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	// Для подгрузки данных
	const [hasMore, setHasMore] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [page, setPage] = useState(1);

	// Обработчики модалки
	const handleOpenCreateModal = () => {
		setIsCreateModalOpen(true);
	};
	const handleCloseCreateModal = () => {
		setIsCreateModalOpen(false);
	};

	// Обработчики Toobar
	const handleRowSelectionChange = (selectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(selectedRowKeys);
	};
	const handleTagClose = () => {
		setSelectedRowKeys([]);
	};

	// API
	const loadMoreData = async () => {
		if (!hasMore || loadingMore) return;

		console.log("Loading more data...");

		setLoadingMore(true);

		try {
			const response = await axios.get("https://jsonplaceholder.typicode.com/users");
			if (response.data.length <= 10) {
				setHasMore(false);
			}
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			message.error("Ошибка при загрузке данных");
		} finally {
			setLoadingMore(false);
		}
	};


	const debouncedLoadMoreData = debounce(() => {
		loadMoreData();
	}, 300);

	const handleScroll = (e) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target;

		if (scrollHeight - scrollTop - clientHeight <= 10) {
			debouncedLoadMoreData();
		}
	};

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<div className={css.wrapper}>
			<Space className={css.tools}>
				{selectedRowKeys.length > 0 ? (
					<Button type="primary" danger onClick={handleOpenCreateModal}>
						Удалить
					</Button>
				) : (
					<Button type="primary" onClick={handleOpenCreateModal}>
						Добавить
					</Button>
				)}
				{selectedRowKeys.length > 0 && (
					<Tag color={selectedRowKeys.length > 0 ? "blue" : "default"} closable onClose={handleTagClose}>
						{selectedRowKeys.length} {selectedRowKeys.length === 1 ? "строка выбрана" : "строк выбрано"}
					</Tag>
				)}
			</Space>

			<Table
				rowKey="id"
				className={css.table}
				columns={columns}
				dataSource={users}
				loading={loading || loadingMore}
				rowSelection={{
					selectedRowKeys,
					onChange: (newSelectedRowKeys: any[]) => setSelectedRowKeys(newSelectedRowKeys),
				}}
				onScroll={handleScroll}
				scroll={{ y: 400 }}
				pagination={false}
			/>

			<CreateUserModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
		</div>
	);
};
