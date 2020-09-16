import React, {FC} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import ArticleListScreen from './ArticleListScreen';
import ArticleScreen from './ArticleScreen';
import {LinkingOptions} from '@react-navigation/native/lib/typescript/src/types';

export type RootStackParamList = {
  ArticleList: undefined;
  Article: {id: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const linking = {
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

const App: FC = () => (
  <>
    <StatusBar style="auto" />
    <NavigationContainer linking={linking}>
      <Stack.Navigator mode="modal" initialRouteName="ArticleList">
        <Stack.Screen
          name="ArticleList"
          options={{title: 'Новости'}}
          component={ArticleListScreen}
        />
        <Stack.Screen
          name="Article"
          options={({navigation}) => ({
            title: 'Новость',
            headerShown: Platform.OS !== 'web',
            cardStyle: styles.card,
            headerLeft: (props) => (
              // Yes, there is no useCallback here. It's normal.
              <HeaderBackButton
                {...props}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  } else {
                    navigation.replace('ArticleList');
                  }
                }}
              />
            ),
          })}
          component={ArticleScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default App;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
  },
});
