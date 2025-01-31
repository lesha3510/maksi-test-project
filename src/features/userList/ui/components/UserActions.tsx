import { User, deleteUsers } from '@/entities/user/model/userSlice';
import { Button, Dropdown, MenuProps, Modal, Typography } from 'antd';

import { EllipsisOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store';
import { useState } from 'react';
import EditUserModal from './EditUserModal/EditUserModal';

const UserActions = ({ user }: { user: User }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteUsers([user.id]));
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleOpenEditeModal = () => setIsEditModalOpen(true);
  const handleCloseEditeModal = () => setIsEditModalOpen(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={handleOpenEditeModal}>Редактировать</span>,
    },
    {
      key: '2',
      label: <span onClick={handleOpenDeleteModal}>Удалить</span>,
    },
  ];

  return (
    <>
      <Dropdown trigger={['click']} menu={{ items }}>
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
      <Modal
        title="Подтверждение удаления"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={handleCloseDeleteModal}
        okText="Да"
        cancelText="Нет"
      >
        <Typography>
          Вы уверены, что хотите удалить этого пользователя?
        </Typography>
      </Modal>
      <EditUserModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditeModal}
      />
    </>
  );
};

export default UserActions;
