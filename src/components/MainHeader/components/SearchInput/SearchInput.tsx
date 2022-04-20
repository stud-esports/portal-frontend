import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classNames from 'classnames';
import { FC, FocusEvent, FormEvent, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { Suggestions } from './Suggestions';

interface Props {
  className?: string;
  handleBackground: (showBackground: boolean) => void;
}

export const SearchInput: FC<Props> = ({ className, handleBackground }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isInFocus, setIsInFocus] = useState(false);

  const onSearch = (event: FormEvent<HTMLInputElement>) => {
    const searchText = event.currentTarget.value.trim().toLowerCase();
    setSearchValue(searchText);
    if (!isInFocus) {
      setIsInFocus(true);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setIsInFocus(false);
      }
    }, 0);
  };

  const onEscapePress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsInFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onEscapePress);

    return () => {
      document.removeEventListener('keydown', onEscapePress);
    };
  }, []);

  useEffect(() => {
    handleBackground(!!searchValue && isInFocus);
  }, [searchValue, isInFocus]);

  return (
    <div
      className={classNames(styles['input-container'], className)}
      onFocus={() => {
        if (isInFocus || !searchValue) setIsInFocus(true);
      }}
      onBlur={handleBlur}
      tabIndex={1}>
      <Input
        placeholder="Введите текст"
        size="large"
        onChange={onSearch}
        value={searchValue}
        className={styles['input-container__input']}
        suffix={
          searchValue ? (
            <CloseCircleOutlined
              onClick={(e) => {
                e.stopPropagation();
                setSearchValue('');
              }}
            />
          ) : (
            <SearchOutlined />
          )
        }
      />
      <Suggestions suggestionText={searchValue} showSuggestions={isInFocus} />
    </div>
  );
};
