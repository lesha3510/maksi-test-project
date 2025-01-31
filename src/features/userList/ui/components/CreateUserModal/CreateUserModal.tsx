import { Input, Modal, Form, Button, message, InputRef } from 'antd';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from './CreateUserModal.utils';
import { useEffect, useRef } from 'react';
import css from './styles.module.scss';
import { placeholderText } from './CreateUserModal.const';
import { addUser, NewUser } from '@/entities/user/model/userSlice';
import { useDispatch } from 'react-redux';
import IMask from 'imask';
import { ICreateUserModal } from './CreateUserModal.types';

const CreateUserModal = ({ isOpen, onClose }: ICreateUserModal) => {
  const phoneRef = useRef<InputRef>(null);

  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(getValidationSchema()),
    shouldFocusError: true,
  });

  const {
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
    control,
  } = methods;

  const handleSave = async (data: NewUser) => {
    try {
      const newUser = {
        id: Date.now(),
        ...data,
      };

      dispatch(addUser(newUser));
      message.success('Пользователь успешно добавлен!');

      onClose();
      reset();
      clearErrors();
    } catch (error) {
      message.error('Ошибка при добавлении пользователя!');
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  useEffect(() => {
    if (phoneRef.current && phoneRef.current.input) {
      IMask(phoneRef.current.input, {
        mask: '+{7} (000) 000-00-00',
      });
    }
  }, [isOpen]);

  return (
    <Modal
      title="Добавить пользователя"
      open={isOpen}
      onCancel={() => {
        reset();
        clearErrors();
        onClose();
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            reset();
            clearErrors();
            onClose();
          }}
        >
          Отмена
        </Button>,
        <Button key="add" type="primary" onClick={handleSubmit(handleSave)}>
          Добавить
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
                  ref={phoneRef}
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

export default CreateUserModal;
