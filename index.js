import 'react-native-gesture-handler';
import {registerRootComponent} from 'expo';

import App from './src/App';
import {
  scheduleNotificationAsync,
  setNotificationHandler,
} from 'expo-notifications';
import database from './src/database';
import {Image, Platform} from 'react-native';
import {requestPermissionsAsync} from 'expo-notifications';

if (Platform.OS === 'android' || Platform.OS === 'ios') {
  // FIXME Request permission before scheduling alert
  requestPermissionsAsync({
    ios: {
      allowAlert: true,
    },
  });

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const index = Math.floor(Math.random() * database.articles.length);
  const article = database.articles[index];
  // noinspection JSIgnoredPromiseFromCall
  scheduleNotificationAsync({
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

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
