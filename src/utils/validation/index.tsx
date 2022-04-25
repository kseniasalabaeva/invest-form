import * as yup from "yup"

export const schema = yup.object().shape({
    sumInv: yup.number()
      .typeError('Обязательное поле')
      .min(100, 'Минимальная сумма инвестиции $ 100'),
    mult: yup.number()
      .typeError('Обязательное поле')
      .max(40, 'Неверное значение мультипликатора')
      .min(1, 'Неверное значение мультипликатора')
      .required(),
  });