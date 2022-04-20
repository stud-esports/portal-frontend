export const SuggestionCategories = {
  ALL: 'all',
  ARTICLES: 'articles',
  USERS: 'users',
  TEAMS: 'teams',
  TREADS: 'treads',
} as const;

export type SuggestionCategoriesType =
  typeof SuggestionCategories[keyof typeof SuggestionCategories];

export const SuggestionCategoryNames = {
  [SuggestionCategories.ALL]: {
    name: {
      default: 'Все',
      en: 'All',
    },
  },
  [SuggestionCategories.ARTICLES]: {
    name: {
      default: 'Статьи',
      en: 'Articles',
    },
  },
  [SuggestionCategories.USERS]: {
    name: {
      default: 'Пользователи',
      en: 'Users',
    },
  },
  [SuggestionCategories.TEAMS]: {
    name: {
      default: 'Команды',
      en: 'Teams',
    },
  },
  [SuggestionCategories.TREADS]: {
    name: {
      default: 'Треды',
      en: 'Treads',
    },
  },
};
