import 'moment/locale/ru';

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Steps,
  Typography,
} from 'antd';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import { validate as emailValidate } from 'email-validator';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux';
import { useWindowSize } from '../../../hooks/windowSize';
import { UserCreationData } from '../../../services/auth/responses.type';
import { CheckService } from '../../../services/check';
import { fetchSignup } from '../../../store/reducers/auth/ActionCreators';
import { FormFieldData } from '../../../types/antd.components.types';
import styles from './styles.module.scss';
import { SignUpFields } from './types';

const { Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

type SignUpFieldData = FormFieldData & {
  name: Array<keyof SignUpFields | 'password2' | 'phone_prefix'>;
};

const prefixSelector = (
  <Form.Item name="phone_prefix" noStyle initialValue={'+7'}>
    <Text>+7</Text>
  </Form.Item>
);

export const SignUpPage: FC = () => {
  const [form] = Form.useForm();
  const [width] = useWindowSize();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const dispatch = useTypedDispatch();
  const { currentUser } = useTypedSelector((state) => state.userReducer);
  const { universities } = useTypedSelector(
    (state) => state.universitiesReducer,
  );

  useEffect(() => {
    if (currentUser) {
      setSubmitButtonLoading(false);
    }
  }, [currentUser]);

  const [fields, setFields] = useState<SignUpFieldData[]>([
    {
      name: ['login'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['first_name'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['last_name'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['gender'],
      value: 'male',
    },
    {
      name: ['email'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['phone'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['birth_date'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['patronymic'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['about_yourself'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['student_card'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['password'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['university_id'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    {
      name: ['password2'],
      value: '',
      errors: [],
      touched: false,
      validating: false,
    },
    { name: ['phone_prefix'], value: '+7' },
  ]);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const getCurrentStepFieldNames = (currentStepNumber = 0) => {
    switch (currentStepNumber) {
      case 0: {
        return ['login', 'email', 'phone', 'password', 'password2'];
      }
      case 1: {
        return ['first_name', 'last_name', 'gender', 'birth_date'];
      }
      default: {
        return [];
      }
    }
  };

  const checkEmail = async (email: string): Promise<string | null> => {
    try {
      const res = await CheckService.checkEmail(email);
      if (res.data.result) {
        return 'Эта почта уже используется';
      }
      return null;
    } catch (e) {
      return 'Ошибка проверки. Попробуйте ещё раз ввести почту';
    }
  };

  const checkPhone = async (phone: string): Promise<string | null> => {
    try {
      const res = await CheckService.checkPhone(`+7${phone}`);
      if (res.data.result) {
        return 'Этот номер уже используется';
      }
      return null;
    } catch (e) {
      return 'Ошибка проверки. Попробуйте ещё раз ввести номер';
    }
  };

  const checkLogin = async (login: string): Promise<string | null> => {
    try {
      const res = await CheckService.checkLogin(login);
      if (res.data.result) {
        return 'Этот логин уже используется';
      }
      return null;
    } catch (e) {
      return 'Ошибка проверки. Попробуйте ещё раз ввести логин';
    }
  };

  const onSubmit = async () => {
    await form.validateFields();
    setSubmitButtonLoading(true);
    const data = {} as UserCreationData;
    fields.forEach((item) => {
      if (
        item.value !== '' &&
        !['password2', 'phone_prefix'].includes(item.name[0])
      ) {
        switch (item.name[0]) {
          case 'phone': {
            data['phone'] = '+7' + item.value;
            break;
          }
          case 'birth_date': {
            data['birth_date'] = item.value.toDate();
            break;
          }
          default: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data[item.name[0]] = item.value;
          }
        }
      }
    });
    dispatch(fetchSignup(data));
  };

  const onNextBtnClick = async (currentStepNumber = 0) => {
    const currentFields = getCurrentStepFieldNames(currentStepNumber);
    try {
      await form.validateFields(currentFields);
      let errors = 0;
      switch (currentStepNumber) {
        case 0: {
          currentFields.forEach((item) => {
            const field = fields.find((data) =>
              data.name.includes(item as any),
            );
            if (field && field.errors && field.errors.length > 0) {
              errors++;
            }
          });
        }
        default: {
          break;
        }
      }
      if (errors === 0) {
        nextStep();
      }
    } catch (e) {}
  };

  const getStepSubTitle = (step = 0) => {
    if (step === currentStep) return 'В процессе';
    if (step < currentStep) {
      return 'Заполнено';
    }
    return '';
  };

  return (
    <div className={styles['form-container']}>
      <Steps
        current={currentStep}
        direction={width && width >= 1024 ? 'horizontal' : 'vertical'}
        labelPlacement={'vertical'}
        className={styles['steps-container']}
        size="small">
        <Step
          title={
            <Text className={styles['step__title']}>Основная информация</Text>
          }
          className={styles['step']}
          description={
            <Text type="secondary" className={styles['step__sub-title']}>
              {getStepSubTitle(0)}
            </Text>
          }
        />
        <Step
          title={
            <Text className={styles['step__title']}>Подробнее о себе</Text>
          }
          className={styles['step']}
          description={
            <Text type="secondary" className={styles['step__sub-title']}>
              {getStepSubTitle(1)}
            </Text>
          }
        />
        <Step
          title={
            <Text className={styles['step__title']}>Данные об образовании</Text>
          }
          className={styles['step']}
          description={
            <Text type="secondary" className={styles['step__sub-title']}>
              {getStepSubTitle(2)}
            </Text>
          }
        />
      </Steps>
      <Form
        layout={'vertical'}
        form={form}
        fields={fields}
        className={styles['form']}
        onFieldsChange={(_, allFields) =>
          setFields(allFields as SignUpFieldData[])
        }>
        <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
          <Form.Item
            name="login"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}
            rules={[
              { required: true, message: 'Введите логин' },
              {
                pattern: /^[A-Za-z0-9_]*$/,
                message: 'Только символы A-Za-z0-9_',
              },
              { min: 6, message: 'Минимальная длина 6' },
              () => ({
                async validator(ruleObj, value) {
                  if (!value || value.length < 6) {
                    return Promise.resolve();
                  }
                  const checkRes = await checkLogin(value);
                  if (checkRes) {
                    return Promise.reject(new Error(checkRes));
                  }
                  return Promise.resolve();
                },
              }),
            ]}>
            <Input placeholder="Логин" />
          </Form.Item>
          <Form.Item
            name="email"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}
            rules={[
              {
                type: 'email',
                message: 'Почта не валидна',
              },
              { required: true, message: 'Введите почту' },
              () => ({
                async validator(ruleObj, value) {
                  if (!value || !emailValidate(value)) {
                    return Promise.resolve();
                  }
                  const checkRes = await checkEmail(value);
                  if (checkRes) {
                    return Promise.reject(new Error(checkRes));
                  }
                  return Promise.resolve();
                },
              }),
            ]}>
            <Input placeholder="Почта" />
          </Form.Item>
          <Form.Item
            name="phone"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}
            rules={[
              { required: true, message: 'Введите номер телефона' },
              {
                pattern: /^[0-9]*$/,
                message: 'Только цифры',
              },
              { len: 10, message: 'Пример номера: +7 9998887766' },
              () => ({
                async validator(ruleObj, value) {
                  if (!value || value.length !== 10) {
                    return Promise.resolve();
                  }
                  const checkRes = await checkPhone(value);
                  if (checkRes) {
                    return Promise.reject(new Error(checkRes));
                  }
                  return Promise.resolve();
                },
              }),
            ]}>
            <Input
              addonBefore={prefixSelector}
              placeholder="9998887766"
              maxLength={10}
            />
          </Form.Item>
          <Form.Item
            name="password"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 8, message: 'Минимальная длина 8 символов' },
            ]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item
            name="password2"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}
            rules={[
              { required: true, message: 'Повторите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}>
            <Input.Password placeholder="Повторите пароль" />
          </Form.Item>
          <Form.Item wrapperCol={{ sm: 24 }} className={styles['form__item']}>
            <Button type="primary" block onClick={() => onNextBtnClick(0)}>
              Зарегистрироваться
            </Button>
          </Form.Item>
          <Link href="/auth/sign-in">
            <a className={styles['form__link']}>Уже есть аккаунт?</a>
          </Link>
        </div>
        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <Form.Item
            name="last_name"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}
            rules={[{ required: true, message: 'Введите фамилию' }]}>
            <Input placeholder="Фамилия" />
          </Form.Item>
          <Form.Item
            name="first_name"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}
            rules={[{ required: true, message: 'Введите имя' }]}>
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="patronymic"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}>
            <Input placeholder="Отчество" />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Form.Item
              name="birth_date"
              className={styles['form__item']}
              style={{ width: '50%' }}
              rules={[{ required: true, message: 'Введите дату' }]}>
              <DatePicker
                style={{ width: '100%' }}
                locale={locale}
                dropdownClassName={styles['custom-date-picker']}
                placeholder="Дата рождения"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              className={styles['form__item']}
              style={{ width: '40%' }}>
              <Select placeholder="Пол">
                <Option value="male">муж.</Option>
                <Option value="female">жен.</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            name="about_yourself"
            wrapperCol={{ sm: 24 }}
            style={{ marginBottom: '35px' }}>
            <Input.TextArea
              showCount
              placeholder="Немного о себе"
              maxLength={255}
            />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Form.Item
              style={{ width: '45%' }}
              className={styles['form__item']}>
              <Button type="default" block onClick={() => prevStep()}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item
              style={{ width: '45%' }}
              className={styles['form__item']}>
              <Button type="primary" block onClick={() => onNextBtnClick(1)}>
                Далее
              </Button>
            </Form.Item>
          </div>
        </div>
        <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
          <Form.Item
            wrapperCol={{ sm: 24 }}
            name="university_id"
            className={styles['form__item']}>
            <Select placeholder="ВУЗ" allowClear>
              {universities.map((item) => (
                <Option value={item._id} key={item._id}>
                  {item.short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="student_card"
            wrapperCol={{ sm: 24 }}
            className={styles['form__item']}
            rules={[
              {
                pattern: /^[0-9А-Яа-яA-Za-z]*$/,
                message: 'Только символы 0-9,А-Я,а-я,A-Z,a-z',
              },
              { min: 7, message: 'Пример номера: БС218129' },
            ]}>
            <Input placeholder="Номер студенческого билета" minLength={7} />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Form.Item
              style={{ width: '45%' }}
              className={styles['form__item']}>
              <Button type="default" block onClick={() => prevStep()}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item
              style={{ width: '45%' }}
              className={styles['form__item']}>
              <Button
                type="primary"
                block
                loading={submitButtonLoading}
                onClick={() => onSubmit()}>
                Сохранить
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};
