import {
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setNotificationHandler,
} from 'expo-notifications';
import database from './database';
import {Image, Platform} from 'react-native';
import {registerRootComponent} from 'expo';
import App from './App';

export default async () => {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in the Expo client or in a native build,
  // the environment is set up appropriately
  registerRootComponent(App);

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const settings = await requestPermissionsAsync({
      ios: {
        allowAlert: true,
      },
    });

    if (Platform.OS !== 'ios' || settings.ios?.allowsAlert !== false) {
      const index = Math.floor(Math.random() * database.articles.length);
      const article = database.articles[index];
      // noinspection JSIgnoredPromiseFromCall
      await scheduleNotificationAsync({
        identifier: String(article.id),
        content: {
          title: article.title,
          body: 'Нажмите, чтобы перейти к новости',
          data: {
            url: `news-feed://article/${article.id}`,
          },
          attachments: __DEV__
            ? []
            : [{url: Image.resolveAssetSource(article.image).uri}],
        },
        trigger: {
          seconds: 10,
        },
      });
    }
  }
};
