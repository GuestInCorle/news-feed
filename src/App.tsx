import React, {FC} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import ArticleListScreen from './ArticleListScreen';
import ArticleScreen from './ArticleScreen';
import SubscriptionText from './SubscriptionText';
import useNotification from './useNotification';
import linking from './linking';
import navigationRef from './navigationRef';

export type RootStackParamList = {
  ArticleList: undefined;
  Article: {id: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const App: FC = () => {
  const onReady = useNotification();
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={onReady}>
        <Stack.Navigator mode="modal" initialRouteName="ArticleList">
          <Stack.Screen
            name="ArticleList"
            options={{
              title: 'Новости',
              headerRight: (props) => (
                <SubscriptionText
                  style={{
                    color: props.tintColor,
                    textDecorationColor: props.tintColor,
                  }}
                />
              ),
              headerRightContainerStyle: styles.right,
            }}
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
};

export default App;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
  },
  right: {
    marginRight: 4,
  },
});
