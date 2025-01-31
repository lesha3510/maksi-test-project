'use client';

import { useEffect, useState, useCallback, UIEvent } from 'react';
import { Table, Button, Space, Tag, message, Input, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUsers,
  fetchUsers,
  setFilteredUsers,
  User,
} from '@/entities/user/model/userSlice';
import { RootState, AppDispatch } from '@/app/providers/store';
import axios from 'axios';
import { debounce } from 'lodash';

import css from './styles.module.scss';
import CreateUserModal from './components/CreateUserModal/CreateUserModal';
import { columns } from './UserTable.const';

export const UserTable = () => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const { users, filteredUsers, loading } = useSelector(
    (state: RootState) => state.users
  );

  // Для выбора строк
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Для модального окна
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Для подгрузки данных
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Для фильтрации
  const [filters, setFilters] = useState({ name: '', email: '', phone: '' });

  // Обработчики модалки
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  // Обработчики Toolbar
  const handleRowSelectionChange = (selectedRowKeys: React.Key[]) =>
    setSelectedRowKeys(selectedRowKeys);
  const handleTagClose = () => setSelectedRowKeys([]);

  // API
  const loadMoreData = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      if (response.data.length <= 10) {
        setHasMore(false);
      }
      message.info('Симуляция lazyLoading');
    } catch (error) {
      message.error('Ошибка при загрузке данных');
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };
  const debouncedLoadMoreData = debounce(loadMoreData, 300);
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight <= 10) {
      debouncedLoadMoreData();
    }
  };

  // Обработчики фильтрации
  const handleFilterChange = (value: string, key: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleResetFilters = () =>
    setFilters({ name: '', email: '', phone: '' });
  const applyFilters = useCallback(
    (
      users: User[],
      filters: { name: string; email: string; phone: string }
    ) => {
      return users.filter((user) =>
        Object.entries(filters).every(([key, value]) => {
          const userValue = user[key as keyof User];
          return (
            typeof userValue === 'string' &&
            userValue.toLowerCase().includes(value.toLowerCase())
          );
        })
      );
    },
    []
  );

  // Обраотчик удаления пользователя
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUsers(selectedRowKeys as number[]));
      setSelectedRowKeys([]);
      message.success('Пользователи успешно удалены');
    } catch (error) {
      message.error('Ошибка при удалении пользователей');
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilteredUsers(applyFilters(users, filters)));
  }, [filters, users, dispatch, applyFilters]);

  return (
    <div className={css.wrapper}>
      <Space className={css.tools}>
        <Space className={css.filters}>
          <Input
            placeholder="Фильтровать по name"
            value={filters.name}
            onChange={(e) => handleFilterChange(e.target.value, 'name')}
          />
          <Input
            placeholder="Фильтровать по email"
            value={filters.email}
            onChange={(e) => handleFilterChange(e.target.value, 'email')}
          />
          <Input
            placeholder="Фильтровать по phone"
            value={filters.phone}
            onChange={(e) => handleFilterChange(e.target.value, 'phone')}
          />
          <Button onClick={handleResetFilters}>Сбросить фильтры</Button>
        </Space>
        <Space className={css.actions}>
          {selectedRowKeys.length > 0 ? (
            <>
              <Popconfirm
                classNames={{
                  root: 'small',
                }}
                title="Вы уверены, что хотите удалить выбранных пользователей?"
                onConfirm={handleDeleteUser}
                okText="Да"
                cancelText="Нет"
              >
                <Button type="primary" danger>
                  Удалить
                </Button>
              </Popconfirm>
              <Tag color="blue" closable onClose={handleTagClose}>
                {selectedRowKeys.length}{' '}
                {selectedRowKeys.length === 1
                  ? 'строка выбрана'
                  : 'строк выбрано'}
              </Tag>
            </>
          ) : (
            <Button type="primary" onClick={handleOpenCreateModal}>
              Добавить
            </Button>
          )}
        </Space>
      </Space>
      <div className={css.tableWrapper}>
        <Table
          rowKey="id"
          className={css.table}
          columns={columns}
          dataSource={filteredUsers}
          loading={loading || loadingMore}
          rowSelection={{
            selectedRowKeys,
            onChange: handleRowSelectionChange,
          }}
          onScroll={handleScroll}
          scroll={{ y: 400 }}
          pagination={false}
        />
        <CreateUserModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
        />
      </div>
    </div>
  );
};
