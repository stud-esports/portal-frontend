import { Alert, Button, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux';
import { fetchSignin } from '../../../store/reducers/auth/ActionCreators';
import { FormFieldData } from '../../../types/antd.components.types';
import styles from './styles.module.scss';

type SignInFieldData = FormFieldData & {
  name: Array<'email' | 'password'>;
};

const { Title, Text } = Typography;

export const SignInPage: FC = () => {
  const [form] = Form.useForm();
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useTypedDispatch();
  const { errorLogin, isTryingToLogin } = useTypedSelector(
    (state) => state.authReducer,
  );
  const [fields, setFields] = useState<SignInFieldData[]>([
    {
      name: ['email'],
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
  ]);

  const onSubmit = async () => {
    await form.validateFields();
    setSubmitButtonLoading(true);
    dispatch(
      fetchSignin({
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
      }),
    );
  };

  useEffect(() => {
    setSubmitButtonLoading(isTryingToLogin);
    if (errorLogin === 'Rejected') {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [errorLogin, isTryingToLogin]);

  return (
    <div className={styles['form-container']}>
      <Title level={2} className={styles['form-container__title']}>
        Вход в аккаунт
      </Title>
      <div className={styles['form-container__alert-container']}>
        {showAlert && (
          <div className={styles['alert']}>
            <Text className={styles['alert__text']}>
              Неверная почта или пароль
            </Text>
          </div>
        )}
      </div>
      <Form
        layout={'vertical'}
        form={form}
        fields={fields}
        className={styles['form']}
        onFieldsChange={(_, allFields) =>
          setFields(allFields as SignInFieldData[])
        }>
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
          ]}>
          <Input placeholder="Почта" />
        </Form.Item>
        <Form.Item
          name="password"
          wrapperCol={{ sm: 24 }}
          className={styles['form__item']}
          rules={[{ required: true, message: 'Введите пароль' }]}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item wrapperCol={{ sm: 24 }} className={styles['form__item']}>
          <Button
            type="primary"
            block
            loading={submitButtonLoading}
            onClick={() => onSubmit()}>
            Войти
          </Button>
        </Form.Item>
      </Form>
      <Link href="/auth/sign-up">
        <a className={styles['form-container__link']}>Нет аккаунта?</a>
      </Link>
    </div>
  );
};
