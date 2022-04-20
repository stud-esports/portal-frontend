interface NavigationLink {
  path: string;
  text: string;
}

export const NavigationLinks: NavigationLink[] = [
  {
    path: '/',
    text: 'Новости',
  },
  {
    path: '/games',
    text: 'Игры',
  },
  {
    path: '/teams',
    text: 'Команды',
  },
  {
    path: '/forum',
    text: 'Форум',
  },
  {
    path: '/about-us',
    text: 'О нас',
  },
];
