import { Input, Modal, Form, Button, message } from 'antd';
import type { IEditUserModal } from './EditUserModal.types';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from './EditUserModal.utils';
import { useEffect, useState } from 'react';

import css from './styles.module.scss';
import { placeholderText } from './EditUserModal.const';
import { EditUser, editUser } from '@/entities/user/model/userSlice';
import { useDispatch } from 'react-redux';

const EditUserModal = ({ user, isOpen, onClose }: IEditUserModal) => {
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(getValidationSchema()),
    shouldFocusError: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    control,
  } = methods;

  useEffect(() => {
    if (isOpen && user) {
      const defaultValues: EditUser = {
        name: user?.name,
        userName: user?.userName,
        email: user?.email,
        phone: user?.phone,
        zipCode: user?.zipCode,
      };

      Object.entries(defaultValues).forEach(([field, actualValue]) => {
        setValue(field as keyof EditUser, actualValue);
      });
    }
  }, [user, isOpen, setValue]);

  const handleSave = async (data: EditUser) => {
    try {
      setIsLoading(true); // Блокируем кнопку на время обработки

      const updatedUser = {
        id: user.id, // Используем ID существующего пользователя
        name: data.name,
        email: data.email,
        phone: data.phone,
        userName: data.userName,
        zipCode: data.zipCode,
      };

      dispatch(editUser(updatedUser));
      message.success('Пользователь успешно отредактирован!');

      onClose();
      reset();
    } catch (error) {
      message.error(
        'Ошибка при редактировании пользователя! ' +
          (error instanceof Error ? error.message : '')
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Редактирование пользователя"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button
          key="add"
          type="primary"
          loading={isLoading}
          onClick={handleSubmit(handleSave)}
          disabled={isLoading}
        >
          Отредактировать
        </Button>,
      ]}
    >
      <FormProvider {...methods}>
        <Form layout="vertical" className={css.form}>
          <Form.Item
            label="Имя"
            validateStatus={errors.name ? 'error' : ''}
            required
            help={errors.name?.message}
          >
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholderText}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Имя пользователя"
            validateStatus={errors.userName ? 'error' : ''}
            required
            help={errors.userName?.message}
          >
            <Controller
              control={control}
              name="userName"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholderText}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            required
            help={errors.email?.message}
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholderText}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Телефон"
            validateStatus={errors.phone ? 'error' : ''}
            required
            help={errors.phone?.message}
          >
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholderText}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Почтовый индекс"
            validateStatus={errors.zipCode ? 'error' : ''}
            help={errors.zipCode?.message}
          >
            <Controller
              control={control}
              name="zipCode"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholderText}
                />
              )}
            />
          </Form.Item>
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default EditUserModal;
