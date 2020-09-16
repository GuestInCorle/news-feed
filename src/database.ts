export interface Article {
  id: number;
  title: string;
  description: string;
  image: any;
}

export default {
  articles: [
    {
      id: 0,
      title: 'Начало серии',
      description: 'Быстро всем бежать за чипсами и колой, серия начинается!',
      image: require('../images/01.png'),
    },
    {
      id: 1,
      title: 'Кот-экскаватор',
      description: 'Гольф — лучший способ испортить хорошую прогулку.',
      image: require('../images/02.png'),
    },
    {
      id: 2,
      title: 'Очередная встреча',
      description: 'Мышь знает толк в мейкапе.',
      image: require('../images/03.png'),
    },
    {
      id: 3,
      title: 'Удар из-за спины!',
      description: 'Мышонок спокоен из-за опыта или доверия?',
      image: require('../images/04.png'),
    },
    {
      id: 4,
      title: 'Рикошет',
      description:
        'А Вы тоже судорожно чистите зубы, когда они начинают болеть?',
      image: require('../images/05.png'),
    },
  ] as Article[],
} as const;
