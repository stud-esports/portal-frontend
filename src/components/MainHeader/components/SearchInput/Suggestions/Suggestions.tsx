import { Menu } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';

import { AppearFromTop } from '../../../../../animations';
import {
  SuggestionCategories,
  SuggestionCategoriesType,
  SuggestionCategoryNames,
} from '../../../../../constants/SuggestionCategories';
import { MenuCLickHandler } from '../../../../../types/antd.components.types';
import { Counter } from './components/Counter';
import { Results } from './components/Results';
import styles from './styles.module.scss';

interface Props {
  className?: string;
  suggestionText: string;
  showSuggestions: boolean;
}

export const Suggestions: FC<Props> = (props) => {
  const { suggestionText, className, showSuggestions } = props;

  const [selectedCategory, setSelectedCategory] =
    useState<SuggestionCategoriesType>(SuggestionCategories.ALL);

  const handleClick: MenuCLickHandler = (e) => {
    setSelectedCategory(e.key as SuggestionCategoriesType);
  };

  const onExitHandler = () => {
    if (!suggestionText) {
      setSelectedCategory(SuggestionCategories.ALL);
    }
  };

  return (
    <div className={styles['suggestions-wrapper']}>
      <AppearFromTop
        show={!!suggestionText && showSuggestions}
        onExited={onExitHandler}>
        <div className={classNames(styles['suggestions-container'], className)}>
          <Menu
            onClick={handleClick}
            selectedKeys={[selectedCategory]}
            mode="horizontal"
            className={styles['suggestions-container__menu']}>
            {Object.keys(SuggestionCategoryNames).map((key) => (
              <Menu.Item key={key}>
                {
                  SuggestionCategoryNames[key as SuggestionCategoriesType].name
                    .default
                }
                <Counter
                  suggestionsCount={0}
                  className={
                    key === selectedCategory
                      ? styles['suggestions-container__counter_active']
                      : styles['suggestions-container__counter']
                  }
                />
              </Menu.Item>
            ))}
          </Menu>
          <Results />
        </div>
      </AppearFromTop>
    </div>
  );
};
