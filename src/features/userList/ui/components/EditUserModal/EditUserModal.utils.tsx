import * as yup from "yup";

/** Получить схему валидации для формы добавления Пользователя
 *
 * @returns схему валидации
 */
export const getValidationSchema = () => {
	const messageError = "Заполните поле!!!";
	return yup
		.object({
			name: yup.string().required(messageError).nullable(),
			userName: yup.string().required(messageError).nullable(),
			email: yup.string().email().required(messageError).nullable(),
			phone: yup.string().required(messageError).nullable(),
			zipcode: yup.string().nullable(),
		})
		.required();
};
