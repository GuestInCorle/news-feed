import {LinkingOptions} from '@react-navigation/native';

export default {
  prefixes: ['news-feed://'],
  config: {
    screens: {
      initialRouteName: 'ArticleList',
      ArticleList: {
        path: '/',
        exact: true,
      },
      Article: {
        path: '/article/:id',
        exact: false,
        parse: {
          id: (id: string) => parseInt(id, 10),
        },
        stringify: {
          id: (id: number) => String(id),
        },
      },
    },
  },
} as LinkingOptions;
