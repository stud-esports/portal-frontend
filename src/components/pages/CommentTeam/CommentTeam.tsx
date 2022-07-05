import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { LoadingSpinner } from '../../LoadingSpinner';
import styles from './styles.module.scss';

const { Text } = Typography;

export const CommentTeamPage: FC = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    message.info('Заявка отправлена');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setTimeout(() => setShowLoader(false), 500);
  }, []);

  if (showLoader) {
    return <LoadingSpinner title={'Загрузка команды'} />;
  }

  return (
    <div className={styles['home']}>
      <div style={{ width: '100%' }}>
        <img
          src="/mocks/team-1.png"
          alt=""
          style={{ width: '80%', display: 'block', margin: '0 auto' }}
        />
        <img
          onClick={() => showModal()}
          src="/mocks/team-2.png"
          alt=""
          style={{ width: '80%', display: 'block', margin: '0 auto' }}
        />
      </div>
      <Modal
        title="Откликнуться?"
        visible={isModalVisible}
        onOk={handleOk}
        okText="Отправить заявку"
        cancelText="Отмена"
        onCancel={handleCancel}></Modal>
    </div>
  );
};
