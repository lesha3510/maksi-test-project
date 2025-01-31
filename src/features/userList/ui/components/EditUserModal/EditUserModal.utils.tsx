import * as yup from 'yup';

/** Получить схему валидации для формы добавления Пользователя
 *
 * @returns схему валидации
 */
export const getValidationSchema = () => {
  const messageError = 'Заполните поле!!!';
  return yup
    .object({
      name: yup.string().required(messageError),
      userName: yup.string().required(messageError),
      email: yup
        .string()
        .email('Введите корректный email!!!!!!')
        .required(messageError),
      phone: yup.string().required(messageError),
      zipCode: yup.string().nullable(),
    })
    .required();
};
