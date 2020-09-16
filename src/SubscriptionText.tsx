import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text, TextProps} from 'react-native';
import {
  getAsync,
  USER_FACING_NOTIFICATIONS,
  PermissionResponse,
  askAsync,
} from 'expo-permissions';
import database from './database';
import {scheduleNotificationAsync} from 'expo-notifications';

/**
 * Warning! For simplicity this component sends a notification
 */
export default forwardRef<Text, TextProps>((props, ref) => {
  const [result, setResult] = useState<PermissionResponse | null>(null);
  useEffect(() => {
    getAsync(USER_FACING_NOTIFICATIONS)
      .then(setResult)
      .catch(() => setResult(null));
  }, []);
  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const index = Math.floor(Math.random() * database.articles.length);
      const article = database.articles[index];
      // TODO Schedule a notification after obtaining permission and rendering app.
      //   Scheduling should be located at the root component in an effect listening to available permissions.
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
  }, []);
  const ask = useCallback(() => {
    if (result && !result.granted && result.canAskAgain) {
      askAsync(USER_FACING_NOTIFICATIONS)
        .then(setResult)
        .catch(() => setResult(null));
    }
  }, [result]);
  return (
    <Text onPress={ask} ref={ref} {...props} style={[styles.root, props.style]}>
      {result
        ? result.granted
          ? 'Вы подписаны'
          : result.canAskAgain
          ? 'Подписаться'
          : 'Заблокировано'
        : 'Загрузка'}
    </Text>
  );
});

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
    color: 'black',
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
